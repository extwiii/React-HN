// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';

import './App.css';

import StoryItem from '../../components/StoryItem';

const HN_TOP_STORIED_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const HN_STORY_URL = 'https://hacker-news.firebaseio.com/v0/item';
const itemArray = [];
let textArray = [];

type KidsItems = {
  by: string,
  id: number,
  kids: ?Array<number>,
  parent: number,
  text: string,
  time: number,
  type: string,
};

type TopStories = {
  by: string,
  descendants: number,
  id: number,
  kids: ?Array<number>,
  kidsItems: ?Array<KidsItems>,
  score: number,
  time: number,
  title: string,
  type: string,
  url: string,
};
type State = {
  activePage: number,
  isCompleted: boolean,
  topStories: Array<TopStories>,
  topStoryIds: Array<number>,
};

class App extends Component<{}, State> {
  state = {
    activePage: 1,
    isCompleted: false,
    topStories: [],
    topStoryIds: [],
  };

  componentDidMount() {
    axios
      .get(HN_TOP_STORIED_URL)
      .then((response) => {
        this.setState({ topStoryIds: response.data });
        this.state.topStoryIds.map((id, index) => this.getList(id, index));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getList = (id: number, index: number): void => {
    axios
      .get(`${HN_STORY_URL}/${id}.json`)
      .then(response => this.getItem(response.data, index))
      .catch((error) => {
        console.log(error);
      });
  };

  getItem = (item: TopStories, itemIndex: number): void => {
    itemArray[itemIndex] = item;
    this.setState({
      topStories: itemArray,
      isCompleted: true,
    });
  };

  getKidsList = (id: number, index: number, parentIndex: number): void => {
    axios
      .get(`${HN_STORY_URL}/${id}.json`)
      .then(response => this.getKidsItem(response.data, index, parentIndex))
      .catch((error) => {
        console.log(error);
      });
  };

  getKidsItem = (item: KidsItems, itemIndex: number, parentIndex: number): void => {
    textArray[itemIndex] = item;
    itemArray[parentIndex] = {
      ...itemArray[parentIndex],
      kidsItems: [...textArray],
    };
    this.setState({
      topStories: itemArray,
    });
  };

  handleGetKidsItems = (itemIndex: number): void => {
    if (itemArray[itemIndex].kids) {
      const itemArrayresults = itemArray[itemIndex].kids.map((id, index) =>
        this.getKidsList(id, index, itemIndex));
      Promise.all(itemArrayresults);
      textArray = [];
    }
  };

  handlePageChange = (pageNumber: number): void => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    const { activePage, topStories, isCompleted } = this.state;
    const indexOfLastStories = activePage * 60;
    const indexOfFirstStories = indexOfLastStories - 60;
    const currentStories = topStories.slice(indexOfFirstStories, indexOfLastStories);
    return (
      <div>
        <header>
          <img src="https://news.ycombinator.com/y18.gif" alt="hackernews logo" />
          <h1>
            <a href="/">Hacker News</a>
          </h1>
        </header>

        {isCompleted ? (
          <div>
            <div className="App">
              {currentStories.map((story, index) => (
                <StoryItem
                  className="story_item"
                  key={story.id}
                  story={story}
                  handleGetKidsItems={() => this.handleGetKidsItems(index + indexOfFirstStories)}
                />
              ))}
            </div>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={60}
              totalItemsCount={topStories.length}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass="pagination_item"
              linkClass="pagination_link"
              activeLinkClass="pagination_link--active"
            />
          </div>
        ) : (
          <div className="spinner">
            <div>
              <img
                // https://ph-files.imgix.net/b1d72c43-5634-4b47-b9d2-9b24c0d47df0?auto=format&auto=compress&codec=mozjpeg&cs=strip&fit=crop&w=50&h=50
                src="http://maffrigby.com/wp-content/uploads/2014/03/gettestr-large-spinner-orange.gif"
                alt="orange hn spinner"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
