import { Col, Row } from "antd";

import PictureCardVertical from "./PictureCardVertical";
import { genMovieMiddleImgUrl } from "../requests/image";
import JumpToDetailOrOpenLoginModalBox from "./JumpToDetailOrOpenLoginModalBox";

export default function CardListHorizontal({ data }) {
  return (
    <Row gutter={16}>
      {data.map((item, index) => (
        <Col
          span={4}
          
          key={index}
        >
          <JumpToDetailOrOpenLoginModalBox urlParam={item.id}>
            <PictureCardVertical
              imageLink={genMovieMiddleImgUrl(item.id)}
              name={item.name}
              score={item.score}
            />
          </JumpToDetailOrOpenLoginModalBox>
        </Col>
      ))}
    </Row>
  )
}
