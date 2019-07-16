import React, { Component } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
} from "../../config";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";
import "./Home.css";

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };

  componentDidMount() {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint);
    this.setState({ loading: true });
  }

  searchItems = searchTerm => {
    this.setState({
      loading: true,
      movies: [],
      searchTerm
    });
    let endpoint = "";
    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems(endpoint) {
    const { movies, heroImage, loading, currentPage, totalPages } = this.state;
    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        this.setState({
          movies: [...movies, ...res.results],
          heroImage: heroImage || res.results[0],
          loading: false,
          currentPage: res.page,
          totalPages: res.total_pages
        });
        // console.log(res.results[0]);
      })
      .catch(err => console.log(`Error...!${err}`));
  }

  loadMoreItems() {
    const { searchTerm, currentPage } = this.state;
    this.setState({ loading: true });
    let endpoint = "";
    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage +
        1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage +
        1}`;
    }
  }

  render() {
    const { heroImage, searchTerm, loading, movies } = this.state;

    return (
      <div>
        {heroImage ? (
          <div>
            <HeroImage
              title={heroImage.original_title}
              text={heroImage.overview}
              image={`${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${heroImage.backdrop_path}`}
            />
            <SearchBar searchItems={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? "Search results" : "Popular Movies"}
            loading={loading}
          >
            {movies.map((movie, i) => {
              console.log(movie);
              return (
                <MovieThumb
                  key={i}
                  clickable
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${movie.poster_path}`
                      : "./images/no-image.jpg"
                  }
                  movieId={movie.id}
                  movieTitle={movie.original_title}
                />
              );
            })}
          </FourColGrid>
        </div>
        <MovieThumb />
        <LoadMoreBtn />
        <Spinner />
      </div>
    );
  }
}

export default Home;
