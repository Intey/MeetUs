import React from 'react';
import { shallow } from 'enzyme';
import { TimeRangePicker } from '../../../src/features/meeter/TimeRangePicker';

describe('meeter/TimeRangePicker', () => {
  it('renders node with correct class name', () => {
    const props = {
      meeter: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TimeRangePicker {...props} />
    );

    expect(
      renderedComponent.find('.meeter-time-range-picker').length
    ).toBe(1);
  });
});
