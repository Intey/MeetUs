import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/meeter/DefaultPage';

describe('meeter/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      meeter: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.meeter-default-page').length
    ).toBe(1);
  });
});
