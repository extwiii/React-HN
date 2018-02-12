import React from 'react';
import { shallow } from 'enzyme';

import App from './index';

describe('App', () => {
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = shallow(<App />);
    }
    return mountedApp;
  };

  test.skip('renders correctly', () => {});

  test('renders correctly', () => {
    const divs = app().find('div');
    expect(divs.length).toBeGreaterThan(0);
    expect(divs.length).toBe(3);
    expect(app()).toMatchSnapshot();
  });

  beforeEach(() => {
    mountedApp = undefined;
  });
});
