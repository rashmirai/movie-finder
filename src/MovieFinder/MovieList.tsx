import { Component } from 'react';
import { MovieListProps } from './movie.types';
import { NavLink } from 'react-router-dom';

export class MovieList extends Component<MovieListProps, {}>{

    renderList() {
        if (this.props.isMovieListLoading) {
            return <p className="movie__error">Loading...</p>
        }
        else if (this.props.error) {
            return <p className="movie__error">{this.props.error}</p>
        }

        return <div className="movie-list">
            {this.props.movieList?.map((movie, index) => {
                return <div key={index + movie.Title} className="movie">
                    <NavLink to={movie.imdbID}>
                        <img src={movie.Poster} className="movie__img"
                            onError={(e) => {
                                //@ts-ignore
                                e.target.onerror = null;
                                // @ts-ignore
                                e.target.src = "https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png";
                            }}
                            alt={movie.Title} />
                    </NavLink>
                    <p className="movie__title">{movie.Title}</p>
                </div>
            })}
        </div>

    }

    render() {

        return <section className="movie-list__wrapper">
            {this.renderList()}
        </section>
    }
}