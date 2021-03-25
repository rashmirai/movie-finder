import { RouteComponentProps } from 'react-router-dom';

export interface MovieType {
    Title: string;
    Poster: string;
    Type: string;
    Year: string;
    imdbID: string;
}
export interface MovieFinderState {
    movieSearch: string;
    isMovieListLoading: boolean;
    movieSuggestions: MovieType[];
    movieList: MovieType[];
    error: string;
    movieSuggestionError: string;
}

export interface MovieFinderProps extends RouteComponentProps<{}> {

}

export interface MovieListProps extends RouteComponentProps<{}> {
    isMovieListLoading: boolean;
    movieList: MovieType[];
    error: string;
}


export interface MovieDetailProps extends RouteComponentProps<{ movieID: string; }> {

}

export interface MovieDetailState {
    isLoading: boolean;
    movie: undefined | {
        Title: string;
        imdbRating: string;
        Year: string;
        Poster: string;
        Runtime: string;
        Genre: string;
        Director: string;
        Country: string;
        Plot: string;
    }
}
