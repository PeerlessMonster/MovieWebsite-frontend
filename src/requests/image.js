// import { baseUrl } from "../fetch_config"

const suffix = ".webp"

/* development */
// const basePath = baseUrl + "images/"
/* production */
const basePath = "http://localhost/assets/"

const movieBasePath = basePath + "movies/"
export const genMovieMiddleImgUrl =
    (movieId) => (movieBasePath + movieId + "_m" + suffix)
export const genMovieLargeImgUrl =
    (movieId) => (movieBasePath + movieId + "_l" + suffix)