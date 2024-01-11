import { useState } from "react";
import { Card } from "antd";

import classes from "./CardGrid.module.less";
import { genMovieLargeImgUrl, genMovieMiddleImgUrl } from "../requests/image";
import BriefIntroduction from "./BriefIntroduction";
import JumpToDetailOrOpenLoginModalBox from "./JumpToDetailOrOpenLoginModalBox";

export default function CardGrid({ data }) {
  const [wholeGridHovered, setWholeGridHovered] = useState(false)

  return (
    <Card className={classes.gridWhole}>
      {data.map((item, index) => {
        const name = item.name
        const category = item.category
        const releaseTime = item.releaseTime
        const playAmount = item.playAmount
        const score = item.score
        const briefIntro = { name, category, releaseTime, playAmount, score }

        const isLarge = (index + 1) % 4 === 2
        return (
          <Card.Grid
            className={
              isLarge
                ? wholeGridHovered
                  ? classes.hoveredlargecard
                  : classes.unhoveredlargecard
                : wholeGridHovered
                  ? classes.hoveredsmallcard
                  : classes.unhoveredsmallcard
            }
            onMouseOver={() => setWholeGridHovered(true)}
            onMouseLeave={() => setWholeGridHovered(false)}

            style={{
              backgroundImage: `url(${
                isLarge
                  ? genMovieLargeImgUrl(item.id)
                  : genMovieMiddleImgUrl(item.id)
              })`,
            }}
            key={index}
          >
            <JumpToDetailOrOpenLoginModalBox urlParam={item.id}>
              <div className="briefintro">
                <BriefIntroduction data={briefIntro} />
              </div>
            </JumpToDetailOrOpenLoginModalBox>
          </Card.Grid>
        )
      })}
    </Card>
  )
}
