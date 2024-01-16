import { Empty, Space } from "antd";

import classes from "./CardHorizontalBox.module.css";
import emptyImg from "../../../assets/empty-inbox-outline.svg";
import JumpToDetailBox from "../../control/JumpToDetailBox";
import CardHorizontal from "../item/CardHorizontal";

export default function CardHorizontalListHorizontal({ data }) {
  return data.length !== 0 ? (
    <Space size="middle" wrap>
      {data.map((item, index) => (
        <JumpToDetailBox key={index} urlParam={item.id}>
          <CardHorizontal data={item} />
        </JumpToDetailBox>
      ))}
    </Space>
  ) : (
    <Empty
      className={classes.boxWhole}
      image={emptyImg}
      imageStyle={{
        height: 200
      }}
      description="暂无符合条件的影片"
    />
  )
}
