import { List } from "antd";

import classes from "./ListVerticalCard.module.less";
import { genMovieMiddleImgUrl } from "../requests/image";
import ScoreStar from "./ScoreStar";
import JumpToDetailOrOpenLoginModalBox from "./JumpToDetailOrOpenLoginModalBox";

export default function ListVerticalCard({ data }) {
  return (
    <List
      className={classes.listWhole}

      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <JumpToDetailOrOpenLoginModalBox urlParam={item.id}>
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
        </JumpToDetailOrOpenLoginModalBox>
      )}
    />
  )
}
