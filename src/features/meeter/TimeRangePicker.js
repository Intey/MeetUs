import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { rect, getMousePos } from './canvas';
import { initTime, Time, TimeClock } from './time';

/**
 * begin - selected range start
 * end - selected range end
 */
const RangeShape = PropTypes.shape({
  begin: PropTypes.instanceOf(Time).isRequired,
  end: PropTypes.instanceOf(Time).isRequired,
});

export class TimeRangePicker extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    range: RangeShape.isRequired,
  };

  constructor(props) {
    super(props);

    let begin = initTime(6);
    let end = initTime(24);
    let stepTime = initTime(1);
    this.clock = new TimeClock(begin, end, stepTime);
    
    this.width = 50 * this.clock.length;
    this.height = 50;
    this.fontSize = 14;
  }

  // returns near guide to given time
  timeGuide = time => {
    return this.clock.getPartByTime(time);
  };

  getNearGuideToX = x => {
    // x = i * gapSize + 6; i = x/gapSize - 6
    const gapSize = Math.floor(this.width / this.clock.length);
    const i = Math.round(x / gapSize);
    return i;
  };

  getGuideX = i => {
    const gapSize = Math.floor((this.width - 6) / this.clock.length);
    return i * gapSize + 6;
  };

  renderHourGuide = (x, timeString) => {
    let ctx = this.refs.canvas.getContext('2d');
    let txtOffset = 1.3 * this.fontSize;
    rect({ ctx, x: x, y: 16, width: 2, height: this.height - 16, color: 'black' });
    ctx.fillText(timeString, x - txtOffset, this.fontSize);
    return x;
  };

  // render selected time range
  drawRange = (begin, end) => {
    const ctx = this.refs.canvas.getContext('2d');
    const startGuide = this.timeGuide(begin);
    const endGuide = this.timeGuide(end);
    const x1 = this.getGuideX(startGuide);
    const width = this.getGuideX(endGuide) - x1;
    rect({ ctx: ctx, x: x1, y: 20, width: width, height: 20, color: 'blue' });
  };

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    rect({ ctx, x: 0, y: 0, width: this.width, height: this.height });
    ctx.font = '14px sans';
    // const dt = deltaTime(this.props.range.start, this.props.range.end)
    for (let i = 0; i < this.clock.length; i++) {
      const timeStr = this.clock.getTimeByPart(i).toString();
      const x = this.getGuideX(i);
      this.renderHourGuide(x, timeStr);
    }
    console.log('draw   range for', this.props.range.begin.toString(), this.props.range.end.toString());
    this.drawRange(this.props.range.begin, this.props.range.end);
  }

  componentDidMount() {
    this.updateCanvas();
    let canvas = this.refs.canvas;
    // let mouseMoveListener = e => onMouseMove(this.refs.canvas, e);
    // find guide, change time range
    // Search for near to x bound of range. if bound far enought then noise,
    // then move bound to near guide of x
    canvas.addEventListener('mouseup', e => {
      // extract all before setState to canvas.js.
      const { x } = getMousePos(canvas, e);
      const guide = this.getNearGuideToX(x);
      const startGuide = this.timeGuide(this.props.range.begin);
      const endGuide = this.timeGuide(this.props.range.end);
      const time = this.clock.getTimeByPart(guide);
      let {begin, end} = this.props.range;
      
      if (Math.abs(startGuide - guide) < Math.abs(endGuide - guide)) {
        begin = time;
      } else {
        end = time;
      }
      this.props.actions.rangeUpdate({ begin, end });
      
      // canvas.addEventListener('mousemove', mouseMoveListener);
    });
    // canvas.addEventListener('mouseup', e => {
    //   canvas.removeEventListener('mousemove', mouseMoveListener);
    // });
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  render() {
    return (
      <div className="meeter-time-range-picker">
        <canvas ref="canvas" width={this.width} height={this.height} id="cnv" />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps({ meeter: state }) {
  console.log('map', state);
  const { day=1, dayRanges = {} } = state;
  if (dayRanges[day] === undefined) return { range: { begin: new Time(18), end: new Time(23) } };
  else return { range: dayRanges[day] };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimeRangePicker);
