import { baseUrl } from "../fetch_config"

const suffix = ".webp"

const basePath = baseUrl + "images/"

const movieBasePath = basePath + "movies/"
export const genMovieMiddleImgUrl =
    (movieId) => (movieBasePath + movieId + "_m" + suffix)
export const genMovieLargeImgUrl =
    (movieId) => (movieBasePath + movieId + "_l" + suffix)