import React from 'react';
import { shallow } from 'enzyme';
import { Calendar } from '../../../src/features/meeter/Calendar';

describe('meeter/Calendar', () => {
  it('renders node with correct class name', () => {
    const props = {
      meeter: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Calendar {...props} />
    );

    expect(
      renderedComponent.find('.meeter-calendar').length
    ).toBe(1);
  });
});
