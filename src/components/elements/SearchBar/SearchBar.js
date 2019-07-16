import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    searchTerm: ""
  };

  timeoutId = null;

  handleSearch = event => {
    const { searchItems } = this.props;
    const { searchTerm } = this.state;
    this.setState({
      searchTerm: event.target.value
    });
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      searchItems(searchTerm);
    }, 600);
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <FontAwesome name="search" size="2x" className="rmdb-fa-search" />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search"
            onChange={this.handleSearch}
            value={searchTerm}
          />
        </div>
      </div>
    );
  }
}
export default SearchBar;
