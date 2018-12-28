import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import TimeRagePicker from './TimeRangePicker'
import Calendar from './Calendar'

export class DefaultPage extends Component {
  static propTypes = {
    meeter: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  send = () => {
    let payload = []
    const ranges = this.props.meeter.dayRanges;
    for (let dayNum in ranges) {
      const {begin, end} = ranges[dayNum];
      payload.push({
        date: `2018-12-${dayNum}`,
        timeRange: `${begin.toString()} - ${end.toString()}`
      })
    }

    this.props.actions.send(1, payload);
  }
  render() {
    return (
      <div className="meeter-default-page">
        <Calendar/>
        <TimeRagePicker/>
        <button onClick={this.send}>Готово!</button>
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
)(DefaultPage);
