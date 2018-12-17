import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

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
    meeter: PropTypes.object.isRequired,
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
    for (let i = 0; i < this.days; i++) {
      dayDivs.push(<div className="calendar-day" key={i}
        onClick={(e) => this.onClickDay(i)}>{i}</div>)
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
    meeter: state.meeter,
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
