import Index from './index';
// https://wetainment.com/testing-indexjs/
describe('Index', () => {
  test('renders correctly', () => {
    expect(JSON.stringify(Object.assign({}, Index, { _reactInternalInstance: 'censored' }))).toMatchSnapshot();
  });
});
