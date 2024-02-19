import { Card } from "antd";
const { Meta } = Card;

import classes from "./CardVertical.module.less";
import ScoreStar from "../element/ScoreStar";
import { genMovieMiddleImgUrl } from "../../../requests/image";

export default function CardVertical({ data }) {
  const { id, name, score } = data
  return (
    <Card
      className={classes.cardWhole}
      cover={
        <img
          className={classes.picture}
          
          alt={name}
          src={genMovieMiddleImgUrl(id)}
        />
      }
    >
      <Meta
        title={
          <span className={classes.title}>{name}</span>
        }
        description={
          <ScoreStar value={score} />
        }
      />
    </Card>
  )
}
