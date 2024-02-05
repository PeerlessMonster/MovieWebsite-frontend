import { List } from "antd";

import classes from "./ListVertical.module.less";
import { genMovieMiddleImgUrl } from "../../../requests/image";
import ScoreStar from "../element/ScoreStar";
import JumpToDetailBox from "../../interact/JumpToDetailBox";

export default function ListVertical({ data }) {
  return (
    <List
      className={classes.listWhole}

      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <JumpToDetailBox urlParam={item.id}>
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  className={classes.picture}
                  src={genMovieMiddleImgUrl(item.id)}
                />
              }
              title={
                <span className={classes.title}>{item.name}</span>
              }
              description={
                <ScoreStar value={item.score} />
              }
            />
          </List.Item>
        </JumpToDetailBox>
      )}
    />
  )
}
