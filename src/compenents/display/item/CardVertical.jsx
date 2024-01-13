import { Card } from "antd";
const { Meta } = Card;

import classes from "./CardVertical.module.less";
import ScoreStar from "../element/ScoreStar";
import { genMovieMiddleImgUrl } from "../../../requests/image";

export default function CardVertical({ data }) {
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
