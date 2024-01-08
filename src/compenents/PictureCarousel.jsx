import { Carousel } from "antd";

import classes from "./PictureCarousel.module.less";
import { genMovieLargeImgUrl } from "../requests/img";
import { useContext } from "react";
import { userContext } from "../states/userContext";
import { Link } from "react-router-dom";
import { loginModalContext } from "../states/loginModalContext";

export default function PictureCarousel({ data }) {
  const user = useContext(userContext)
  const userInfo = user.info

  const loginModal = useContext(loginModalContext)

  return (
    <div className={classes.carouselWholeShadow}>
      <Carousel
        className={classes.carouselWholeBorder}
        effect="fade"
        autoplay
      >
        {data.map((movie) => userInfo ? (
          <Link
            key={movie.id}
            to={`/movie/${movie.movieId}`}>
            <img
              className={classes.picture}

              alt={movie.name}
              src={genMovieLargeImgUrl(movie.movieId)}
            />
          </Link>
        ) : (
          <img
            className={classes.picture}

            key={movie.id}
            alt={movie.name}
            src={genMovieLargeImgUrl(movie.movieId)}
            onClick={loginModal.open}
          />
        ))}
      </Carousel>
    </div>
  )
}
