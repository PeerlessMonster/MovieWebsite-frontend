import { Space } from "antd";

import JumpToDetailBox from "../../interact/JumpToDetailBox";
import CardHorizontal from "../item/CardHorizontal";

export default function CardHorizontalListHorizontal({ data }) {
  return (
    <Space
      size="middle"
      wrap
    >
      {data.map((item, index) => {
        const { id } = item
        return (
          <JumpToDetailBox
            key={index}
            urlParam={id}
          >
            <CardHorizontal data={item} />
          </JumpToDetailBox>
        )
      })}
    </Space>
  )
}
