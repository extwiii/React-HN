// @flow
import React, { Component } from 'react';
import './StoryItem.css';

type Props = {
  story: {
    by: string,
    score: number,
    title: string,
    url: string,
    kids: ?Array<number>,
    kidsItems: ?Array<{
      by: string,
      id: number,
      kids: ?Array<number>,
      parent: number,
      text: string,
      time: number,
      type: string,
    }>,
  },
  handleGetKidsItems(): void,
  className: string,
};

type State = {
  isOpen: boolean,
};

class StoryItem extends Component<Props, State> {
  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
    this.props.handleGetKidsItems();
  };
  handleShrink = () => {
    this.setState({
      isOpen: false,
    });
  };

  renderHTML = (rawHTML: ?string) =>
    React.createElement('span', { dangerouslySetInnerHTML: { __html: rawHTML } });

  render() {
    const {
      by, score, title, url, kids, kidsItems,
    } = this.props.story;
    const { className } = this.props;
    const { isOpen } = this.state;

    let items;

    if (kids) {
      if (kidsItems && kids.length === kidsItems.length) {
        items = (
          <div className="story_item_comments">
            <div className="story_item_comments_text">
              <ul>
                {kidsItems.map((item) => {
                  if (item) {
                    if (item.text) {
                      return (
                        <li key={item.id}>{this.renderHTML(item.text)}</li> || <li>Undefined</li>
                      );
                    }
                    return (
                      <li key={item.id} style={{ color: 'black' }}>
                        This entry is deleted
                      </li>
                    );
                  }
                  return false;
                })}
              </ul>
            </div>
            <button onClick={this.handleShrink}>Shrink</button>
          </div>
        );
      } else {
        items = (
          <div className="story_item_comments">
            <div className="story_item_comments_image">
              <img
                src="http://maffrigby.com/wp-content/uploads/2014/03/gettestr-large-spinner-orange.gif"
                alt="hacker news rectangle spinner"
              />
            </div>
            <button onClick={this.handleShrink}>Waiting...</button>
          </div>
        );
      }
    } else {
      items = (
        <div className="story_item_comments">
          <div className="story_item_comments_image">
            <h2>No Comment Yet!</h2>
          </div>
          <button onClick={this.handleShrink}>Waiting...</button>
        </div>
      );
    }
    return (
      <div className={isOpen ? `${className} open` : className}>
        <div className="story_item_score">
          <img src="https://news.ycombinator.com/grayarrow2x.gif" alt="upvote gif" />
          <p>{score}</p>
        </div>
        <div className="story_item_title">
          <a href={url} target="_blank">
            <h2>{title}</h2>
          </a>
          <p>
            by <strong>{by}</strong>
          </p>
        </div>
        {isOpen ? (
          items
        ) : (
          <div className="story_item_comments">
            <button onClick={this.handleOpen}>Read More</button>
          </div>
        )}
      </div>
    );
  }
}

export default StoryItem;
