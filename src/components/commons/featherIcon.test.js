import React from 'react';
import TestRenderer from 'react-test-renderer';
import FeatherIcon from './featherIcon';

describe("<FeatherIcon> tests", () => {
  test("Renders component", () => {
    const render = TestRenderer.create(<FeatherIcon iconName="feather"/>);
    expect(render.toJSON()).toMatchSnapshot();
  });
});