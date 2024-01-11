import { Col, Row } from "antd";

import PictureCardVertical from "./PictureCardVertical";
import JumpToDetailOrOpenLoginModalBox from "./JumpToDetailOrOpenLoginModalBox";

export default function CardListHorizontal({ data }) {
  return (
    <Row gutter={16}>
      {data.map((item, index) => {
        const id = item.id
        const name = item.name
        const score = item.score
        const data = { id, name, score }

        return (
          <Col
            span={4}
            
            key={index}
          >
            <JumpToDetailOrOpenLoginModalBox urlParam={item.id}>
              <PictureCardVertical data={data} />
            </JumpToDetailOrOpenLoginModalBox>
          </Col>
        )
      })}
    </Row>
  )
}
