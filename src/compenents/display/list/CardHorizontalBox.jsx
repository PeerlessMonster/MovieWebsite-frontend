import { Space } from "antd";

import JumpToDetailBox from "../../control/JumpToDetailBox";
import CardHorizontal from "../item/CardHorizontal";

export default function CardHorizontalListHorizontal({ data }) {
  return (
    <Space size="middle" wrap>
      {data.map((item, index) => (
        <JumpToDetailBox key={index} urlParam={item.id}>
          <CardHorizontal data={item} />
        </JumpToDetailBox>
      ))}
    </Space>
  )
}
