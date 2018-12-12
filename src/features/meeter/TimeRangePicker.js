import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { rect, getMousePos, onMouseMove } from './canvas';
import { initTime, deltaTime, Time, timeParts, TimeClock } from './time';

/**
 * begin - selected range start
 * end - selected range end
 */
export class TimeRangePicker extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    begin: PropTypes.instanceOf(Time),
    end: PropTypes.instanceOf(Time),
  };

  constructor(props) {
    super(props);
    let { begin, end } = props;
    if (!begin) {
      begin = initTime(0);
    }
    if (!end) {
      end = initTime(24);
    }

    let startTime = initTime(9);
    let endTime = initTime(18);
    let stepTime = initTime(0, 30);
    this.clock = new TimeClock(startTime, endTime, stepTime);

    this.state = {
      begin: startTime,
      end: endTime,
    };
    this.width = 1000;
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
    console.log('draw range', begin.toString(), end.toString(), width, startGuide, endGuide);
    rect({ ctx: ctx, x: x1, y: 20, width: width, height: 20, color: 'blue' });
  };


  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    rect({ ctx, x: 0, y: 0, width: this.width, height: this.height });
    ctx.font = '14px sans';
    // const dt = deltaTime(this.state.start, this.state.end)
    for (let i = 0; i < this.clock.length; i++) {
      const timeStr = this.clock.getTimeByPart(i).toString();
      const x = this.getGuideX(i);
      this.renderHourGuide(x, timeStr);
    }
    console.log("draw range for", this.state.begin.toString(), this.state.end.toString())
    this.drawRange(this.state.begin, this.state.end);
  }

  componentDidMount() {
    this.updateCanvas();
    let canvas = this.refs.canvas;
    let mouseMoveListener = e => onMouseMove(this.refs.canvas, e);
    // find guide, change time range
    // Search for near to x bound of range. if bound far enought then noise,
    // then move bound to near guide of x
    canvas.addEventListener('mousedown', e => {
      // extract all before setState to canvas.js.
      const { x, y } = getMousePos(canvas, e);
      const guide = this.getNearGuideToX(x);
      const startGuide = this.timeGuide(this.state.begin);
      const endGuide = this.timeGuide(this.state.end);

      const time = this.clock.getTimeByPart(guide);
      if (Math.abs(startGuide - guide) < Math.abs(endGuide - guide)) {
        this.setState({ begin: time });
      } else {
        this.setState({ end: time });
      }
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
function mapStateToProps(state) {
  return {};
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
