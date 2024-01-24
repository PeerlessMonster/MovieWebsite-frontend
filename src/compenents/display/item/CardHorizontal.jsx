import { Card } from "antd";
const { Meta } = Card;

import classes from "./CardHorizontal.module.less";
import CategoryTagList from "../element/CategoryTagList";
import FeedbackBox from "../element/FeedbackBox";
import { genMovieLargeImgUrl } from "../../../requests/image";

export default function CardHorizontal({ data }) {
  const categoryStr = data.category;
  const categoryList = categoryStr.split("/");

  return (
    <Card
      className={classes.cardWhole}
      cover={
        <img
          className={classes.picture}

          alt={data.name}
          src={genMovieLargeImgUrl(data.id)} />
      }
      actions={[
        <FeedbackBox
          key="feedback"
          playAmount={data.playAmount}
          score={data.score}
        />
      ]}
    >
      <Meta
        title={
          <div className={classes.titlebox}>
            <span className={classes.title}>{data.name}</span>
            <span className={classes.maintext}>{data.releaseTime}</span>
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
