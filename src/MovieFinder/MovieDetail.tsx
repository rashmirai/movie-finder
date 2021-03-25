import { Component } from 'react';
import { getMovieDetails } from './service';
import { MovieDetailProps, MovieDetailState } from './movie.types';

export class MovieDetail extends Component<MovieDetailProps, MovieDetailState>{
    constructor(props: MovieDetailProps) {
        super(props);
        this.state = {
            isLoading: true,
            movie: undefined,
        }
    }

    componentDidMount() {
        getMovieDetails(this.props.match.params.movieID).then((response) => {
            this.setState({
                isLoading: false,
                movie: response.data,
            })
        }).catch((error) => {

        })
    }

    componentDidUpdate(prevProps: MovieDetailProps, prevState: MovieDetailState) {
        if (prevProps.match.params.movieID !== this.props.match.params.movieID) {
            getMovieDetails(this.props.match.params.movieID).then((response) => {
                this.setState({
                    isLoading: false,
                    movie: response.data,
                })
            }).catch((error) => {

            })
        }
    }

    render() {
        return <div className="movie-details__wrapper">
            {this.state.isLoading ? <p>Loading...</p>
                : <div className="movie-details">
                    <div className="movie-details__poster-wrap">
                        <img src={this.state.movie?.Poster} className="movie-details__poster" alt={this.state.movie?.Title} />
                    </div>
                    <div className="movie-details__text">
                        <p className="movie-details__title">{this.state.movie?.Title}({this.state.movie?.Year})</p>
                        <p className="movie-details__desc">Runtime: {this.state.movie?.Runtime}</p>
                        <p className="movie-details__desc">Genre: {this.state.movie?.Genre}</p>
                        <p className="movie-details__desc">Director: {this.state.movie?.Director}</p>
                        <p className="movie-details__desc">Country: {this.state.movie?.Country}</p>
                        <p className="movie-details__plot">{this.state.movie?.Plot}</p>
                    </div>
                </div>}
        </div>
    }
}