import React from 'react';
import { shallow } from 'enzyme';

import StoryItem from './index';

describe('StoryItem', () => {
  let props;
  let mountedStoryItem;
  const storyItem = () => {
    if (!mountedStoryItem) {
      mountedStoryItem = shallow(<StoryItem {...props} />);
    }
    return mountedStoryItem;
  };

  test('renders props correctly ', () => {
    expect(storyItem().instance().props).toEqual(props);
    expect(storyItem().props().className).toEqual(props.className);
  });

  test('renders correctly if isOpen is falsy', () => {
    expect(storyItem().instance().state.isOpen).toEqual(false);
    expect(storyItem().find('.story_item_comments').length).toEqual(1);
  });

  test('handleOpen function works correctly ', () => {
    expect(storyItem().instance().state.isOpen).toEqual(false);
    storyItem()
      .instance()
      .handleOpen();
    expect(storyItem().instance().state.isOpen).toEqual(true);
  });

  test('handleShrink function works correctly ', () => {
    expect(storyItem().instance().state.isOpen).toEqual(false);
    storyItem()
      .instance()
      .handleOpen();
    expect(storyItem().instance().state.isOpen).toEqual(true);
    storyItem()
      .instance()
      .handleShrink();
    expect(storyItem().instance().state.isOpen).toEqual(false);
  });

  test('renderHTML function works correctly ', () => {
    const renderedHTML = storyItem()
      .instance()
      .renderHTML('First &middot; Second');
    // must check later
    expect(renderedHTML).toEqual(<span dangerouslySetInnerHTML={{ __html: 'First &middot; Second' }} />);
  });

  test('render state correctly', () => {
    expect(storyItem().instance().state).toEqual({ isOpen: false });
  });

  test('renders DOM correctly', () => {
    const divs = storyItem().find('div');
    const h3s = storyItem().find('h3');
    expect(divs.length).toBeGreaterThan(0);
    expect(divs.length).toBe(4);
    expect(h3s.length).toBe(0);
  });

  test('to match snapshot', () => {
    expect(storyItem()).toMatchSnapshot();
  });

  beforeEach(() => {
    props = {
      story: {
        by: 'by',
        title: 'title',
        text: 'text',
        url: 'url',
      },
      className: 'story_item',
      handleGetKidsItems: jest.fn(),
    };
    mountedStoryItem = undefined;
  });
});
