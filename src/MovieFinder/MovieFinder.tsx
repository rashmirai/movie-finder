import { Component } from 'react';
import { getMovies } from './service';
import { MovieDetail } from './MovieDetail';
// import { Toggle } from '../Toggle/Toggle';
import Autocomplete from 'react-autocomplete';
import { MovieList } from './MovieList';
import { MovieFinderProps, MovieFinderState } from './movie.types';
import { Switch, Route } from 'react-router-dom';
import { debounce } from 'lodash';
import './movieFinder.css';

export class MovieFinder extends Component<MovieFinderProps, MovieFinderState>{

    constructor(props: MovieFinderProps) {
        super(props);
        this.state = {
            movieSearch: '',
            movieList: [],
            isMovieListLoading: false,
            movieSuggestions: [],
            error: "",
            movieSuggestionError: '',
        }
        this.handleMovieSearch = this.handleMovieSearch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchSuggestions = debounce(this.fetchSuggestions, 1000);
    }

    componentDidMount() {
        let url = new URLSearchParams(this.props.location.search);
        let query: string = url.get('q') || '';
        if (query) {
            this.fetchMovieList(query);
        }
        else {
            this.setState({
                movieList: [],
                movieSuggestions: [],
                error: '',
                isMovieListLoading: false,
            });
        }
    }

    componentDidUpdate(prevProps: MovieFinderProps, prevState: MovieFinderState) {
        if (prevProps.location.search !== this.props.location.search) {
            let url = new URLSearchParams(this.props.location.search);
            let query: string = url.get('q') || '';
            if (query) {
                this.fetchMovieList(query);
            }
            else {
                this.setState({
                    movieList: [],
                    movieSuggestions: [],
                    error: '',
                    isMovieListLoading: false,
                });
            }
        }
    }

    fetchMovieList(query: string) {
        this.setState({ isMovieListLoading: true });
        getMovies(query).then((response) => {
            let list = response.data.Search || [];
            this.setState({
                movieList: list,
                movieSuggestions: list,
                movieSearch: query || this.state.movieSearch,
                error: response.data.Error,
                isMovieListLoading: false,
            });
        }).catch((error) => {
            this.setState({ isMovieListLoading: false });
        })
    }

    fetchSuggestions(value: string) {
        getMovies(value).then((response) => {
            let list = response.data.Search || [];
            this.setState({
                movieSuggestions: list,
                movieSuggestionError: response.data.Error,
            });
        }).catch((error) => {

        })
    }

    handleMovieSearch(event: any): void {
        let value = event.target.value;
        this.setState({
            movieSearch: value
        });
        this.fetchSuggestions(value);
    }

    handleSelect(selection: any): void {
        let url = `/${selection}`;
        this.props.history.push(url);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        let url = `/?q=${this.state.movieSearch}`;
        this.props.history.push(url);
    }

    renderHeader() {
        return <header style={{ backgroundColor: "black" }}>
            <div className="header__wrapper">
                <div className="header">
                    <form className="movie-finder__form" onSubmit={this.handleSubmit}>
                        <Autocomplete getItemValue={(item) => { return item.imdbID }}
                            items={this.state.movieSuggestions}
                            value={this.state.movieSearch}
                            onChange={this.handleMovieSearch}
                            onSelect={(val) => { this.handleSelect(val) }}
                            wrapperStyle={{
                                width:"100%"
                            }}
                            renderInput={(props) => {
                                return <input {...props} style={{width:"100%"}}/>
                            }}
                            renderItem={(item, isHighlighted) =>
                                <div key={item.Title}
                                    className="movie-finder__suggestion"
                                    style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                    {item.Title}
                                </div>}
                            renderMenu={(items, value, style) => {
                                return <div style={{
                                    ...style,
                                    position: 'absolute', left: "50%", top: "42px", width: "90%", transform: "translate(-50%)"
                                }}>{items}
                                </div>
                            }}
                        />
                    </form>
                </div>
            </div>
        </header>
    }

    render() {
        return <div className="movie-finder" style={{ backgroundColor: '#323232', color: 'white' }}>
            {this.renderHeader()}
            <Switch>
                <Route exact path="/:movieID" render={(props) => {
                    return <MovieDetail {...props} />
                }} />
                <Route path="/" render={(props) => {
                    return <MovieList {...props}
                        isMovieListLoading={this.state.isMovieListLoading}
                        movieList={this.state.movieList}
                        error={this.state.error} />
                }} />
            </Switch>
        </div>
    }
}