import axios from 'axios';

// URL FILMES EM CARTAZ
//https://api.themoviedb.org/3/movie/now_playing?api_key=88d6f6a6f76330920b94c21ae8783099&language=pt-BR&page=1

export const key = '88d6f6a6f76330920b94c21ae8783099'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;