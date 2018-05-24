import React, { Component } from 'react';

function SearchCriteria(props) {
  const {showSearchCriteria, searchQuery, searchCategory} = props;

  console.log(`showSearchCriteria: ${showSearchCriteria}, searchQuery: ${searchQuery}, searchCategory: ${searchCategory}`);

  if (showSearchCriteria && (searchQuery || searchCategory)) {
    const content = [];

    if (searchQuery) {
      content.push(
        <span>Search Query: {searchQuery}</span>
      );
    }

    if (searchQuery && searchCategory) {
      content.push(<span>, </span>);
    }

    if (searchCategory) {
      content.push(
        <span>Search Category: {searchCategory}</span>
      );        
    }

    return (
      <div className="notification is-info">
        {content}
      </div>    
    );
  } else {
    return null;
  }
}

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchCategory: ''
    };
  }

  handleSearchQueryChange = (event) => {
    this.setState({searchQuery: event.target.value});
  }

  handleSearchQueryKeyPress = (event) => {
    if (event.charCode === 13) {
      this.search();      
    }
  }

  handleSearchCategoryChange = (event) => {
    this.setState({searchCategory: event.target.value});
  }
  
  search = () => {
    this.props.search(
      this.state.searchQuery,
      this.state.searchCategory
    );
  }

  clearSearch = () => {
    this.setState({
      searchQuery: '',
      searchCategory: ''
    });
    this.props.clearSearch();
  }

  render() {
    const searchCategoryOptions = [
      <option value="" key="">Select a category...</option>
    ];

    this.props.categories.forEach(category => {
      searchCategoryOptions.push(
        <option value={category} key={category}>{category}</option>
      );
    });
    
    return (
      <div>
        <div className="columns">
          <div className="column">
            <input type="text" value={this.state.searchQuery} onChange={this.handleSearchQueryChange} onKeyPress={this.handleSearchQueryKeyPress} className="input is-medium" placeholder="Enter search query..." />
          </div>
          <div className="column is-narrow">
            <div className="select is-medium">
              <select value={this.state.searchCategory} onChange={this.handleSearchCategoryChange}>
                {searchCategoryOptions}
              </select>
            </div>
          </div>
          <div className="column is-narrow">
            <button onClick={this.search} className="button is-primary is-medium">Search</button>&nbsp;
            <button onClick={this.clearSearch} className="button is-warning is-medium">Clear</button>    
          </div>
        </div>

        <SearchCriteria 
          showSearchCriteria={false} 
          searchQuery={this.state.searchQuery} 
          searchCategory={this.state.searchCategory} />  

      </div>
    );
  }
}
