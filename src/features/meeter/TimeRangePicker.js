import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { rect, getMousePos } from './canvas';
import { initTime, deltaTime, Time } from './time';

export class TimeRangePicker extends Component {
  static propTypes = {
    meeter: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
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

    this.state = {
      begin: new Time(9),
      end: new Time(11),
    };
    this.begin = begin;
    this.end = end;
    this.width = 1000;
    this.height = 50;
    this.parts = deltaTime(begin, end).getHours() * 2;
    this.step = new Time(0, 30)
  }

  // returns near guide to given time
  timeGuide = time => {
    return time.getHours();
  };

  // return render function for time bound
  drawRange = (begin, end) => {
    const ctx = this.refs.canvas.getContext('2d');
    const startGuide = this.timeGuide(begin);
    const endGuide = this.timeGuide(end);
    const x1 = this.getGuideX(startGuide);
    const width = this.getGuideX(endGuide) - x1;
    console.log('draw range', x1, width, startGuide, endGuide);
    rect({ ctx: ctx, x: x1, y: 20, width: width, height: 20, color: 'blue' });
  };

  getNearGuideToX = x => {
    // x = i * padStep + 6; i = x/padStep - 6
    const padStep = Math.floor(this.width / this.parts);
    const i = Math.round(x / padStep);
    return i;
  };

  getGuideX = i => {
    const padStep = Math.floor((this.width - 6) / this.parts);
    console.log('getGuideX', padStep);
    return i * padStep + 6;
  };
  renderHourGuide = i => {
    let ctx = this.refs.canvas.getContext('2d');
    const x = this.getGuideX(i);
    let txtOffset = 3;
    if (i > 9) txtOffset = 8;
    rect({ ctx, x: x, y: 16, width: 2, height: this.height - 16, color: 'black' });
    ctx.fillText(i, x - txtOffset, 15);
    return x;
  };

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    rect({ ctx, x: 0, y: 0, width: this.width, height: this.height });
    ctx.font = '14px sans';
    // const dt = deltaTime(this.state.start, this.state.end)
    for (let i = 0; i < this.parts; i++) {
      const x = this.renderHourGuide(i);
    }
    this.drawRange(this.state.begin, this.state.end);
  }

  componentDidMount() {
    this.updateCanvas();
    let canvas = this.refs.canvas;

    // find guide, change time range
    // Search for near to x bound of range. if bound far enought then noise,
    // then move bound to near guide of x
    canvas.addEventListener('mousedown', e => {
      const { x, y } = getMousePos(canvas, e);
      console.log(x, y);
      const guide = this.getNearGuideToX(x);
      const startGuide = this.timeGuide(this.state.begin);
      const endGuide = this.timeGuide(this.state.end);
      const time = new Time(guide);
      console.log(time);
      if (Math.abs(startGuide - guide) < Math.abs(endGuide - guide)) {
        this.setState({ begin: time });
      } else {
        this.setState({ end: time });
      }
    });
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
  return {
    meeter: state.meeter,
  };
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
