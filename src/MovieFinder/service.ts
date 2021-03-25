import axios from 'axios';

const apiKey = '4eeb3307';

export function getMovies(search?: string) {
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`;
    return axios.get(url).then((response) => {
        return response;
    })
}

export function getMovieDetails(movieID: string) {
    return axios.get(`http://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`).then((response) => {
        return response;
    })
}