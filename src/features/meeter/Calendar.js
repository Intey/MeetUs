import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Time } from './time'
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getDaysInCurrentMonth() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()
  return getDaysInMonth(month, year)
}

export class Calendar extends Component {
  static propTypes = {
    currentDay: PropTypes.number.isRequired,
    ranges: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props)
    this.days = getDaysInCurrentMonth()
  }

  onClickDay = (i) => {
    this.props.actions.daySelected(i)
  }

  render() {
    let dayDivs = []

    for (let i = 1; i <= this.days; i++) {
      const range = this.props.ranges[i];
      let timeRangeWidget
      const rangeExist = range !== undefined;
      if (rangeExist) { 
        const {begin:timeBegin=new Time(18), end:timeEnd=new Time(23)} = range;
        timeRangeWidget = `${timeBegin.toString()} - ${timeEnd.toString()}`
      } else {
        timeRangeWidget = null;        
      }
      const classStr = `calendar-day ${this.props.currentDay === i ? 'current': ''} ` +
                       `${rangeExist ? "calendar-day--with-range": ""}`;
      dayDivs.push(<div key={i} 
                        className={classStr}
                        onClick={(e) => this.onClickDay(i)}>
                        <span className="calendar-day__day-number">{i}</span>
                        <span className="calendar-day__time-range">
                          {timeRangeWidget}
                        </span>
                        </div>)
    }
    return (
      <div className="meeter-calendar">
        {dayDivs}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentDay: state.meeter.day,
    ranges: state.meeter.dayRanges,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
