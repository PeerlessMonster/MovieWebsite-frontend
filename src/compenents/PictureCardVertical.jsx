import { Card } from "antd";
const { Meta } = Card;

import classes from "./PictureCardVertical.module.less";
import ScoreStar from "./ScoreStar";
import { genMovieMiddleImgUrl } from "../requests/image";

export default function PictureCardVertical({ data }) {
  return (
    <Card
      className={classes.cardWhole}
      cover={
        <img
          className={classes.picture}
          
          alt={data.name}
          src={genMovieMiddleImgUrl(data.id)}
        />
      }
    >
      <Meta
        title={
          <span className={classes.title}>{data.name}</span>
        }
        description={
          <ScoreStar value={data.score} />
        }
      />
    </Card>
  )
}
