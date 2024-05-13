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
      renderItem={(item) => {
        const { id, name, score } = item
        return (
          <JumpToDetailBox urlParam={id}>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <img
                    className={classes.picture}
                    src={genMovieMiddleImgUrl(id)}
                  />
                }
                title={<span className={classes.title}>{name}</span>}
                description={<ScoreStar value={score} />}
              />
            </List.Item>
          </JumpToDetailBox>
        )
      }}
    />
  )
}
