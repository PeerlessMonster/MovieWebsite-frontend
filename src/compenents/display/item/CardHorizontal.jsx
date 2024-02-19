import { Card } from "antd";
const { Meta } = Card;

import classes from "./CardHorizontal.module.less";
import CategoryTagList from "../element/CategoryTagList";
import FeedbackBox from "../element/FeedbackBox";
import { genMovieLargeImgUrl } from "../../../requests/image";

export default function CardHorizontal({ data }) {
  const { id, name, category: categoryStr, releaseTime, playAmount, score } = data

  const categoryList = categoryStr.split("/")
  return (
    <Card
      className={classes.cardWhole}
      cover={
        <img
          className={classes.picture}

          alt={name}
          src={genMovieLargeImgUrl(id)} />
      }
      actions={[
        <FeedbackBox
          key="feedback"
          playAmount={playAmount}
          score={score}
        />
      ]}
    >
      <Meta
        title={
          <div className={classes.titlebox}>
            <span className={classes.title}>{name}</span>
            <span className={classes.maintext}>{releaseTime}</span>
          </div>
        }
        description={
          <div className={classes.taglistBottomofTitlebox}>
            <CategoryTagList value={categoryList} />
          </div>
        }
      />
    </Card>
  )
}
