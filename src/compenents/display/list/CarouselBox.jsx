import { Carousel } from "antd";

import classes from "./CarouselBox.module.less";
import { genMovieLargeImgUrl } from "../../../requests/image";
import JumpToDetailBox from "../../interact/JumpToDetailBox";

export default function CarouselBox({ data }) {
  return (
    <div className={classes.carouselWholeShadow}>
      <Carousel
        className={classes.carouselWholeBorder}
        effect="fade"
        autoplay
      >
        {data.map((item, index) => (
          <JumpToDetailBox
            key={index}
            urlParam={item.id}
          >
            <img
              className={classes.picture}

              key={index}
              alt={item.name}
              src={genMovieLargeImgUrl(item.id)}
            />
          </JumpToDetailBox>
        ))}
      </Carousel>
    </div>
  )
}
