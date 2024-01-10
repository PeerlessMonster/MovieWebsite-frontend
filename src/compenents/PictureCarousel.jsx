import { Carousel } from "antd";

import classes from "./PictureCarousel.module.less";
import { genMovieLargeImgUrl } from "../requests/image";
import JumpToDetailOrOpenLoginModalBox from "./JumpToDetailOrOpenLoginModalBox";

export default function PictureCarousel({ data }) {
  return (
    <div className={classes.carouselWholeShadow}>
      <Carousel
        className={classes.carouselWholeBorder}
        effect="fade"
        autoplay
      >
        {data.map((item, index) => (
          <JumpToDetailOrOpenLoginModalBox
            key={index}
            urlParam={item.id}
          >
            <img
              className={classes.picture}

              key={index}
              alt={item.name}
              src={genMovieLargeImgUrl(item.id)}
            />
          </JumpToDetailOrOpenLoginModalBox>
        ))}
      </Carousel>
    </div>
  )
}
