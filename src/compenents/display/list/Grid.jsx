import { useState } from "react";
import { Card } from "antd";

import classes from "./Grid.module.less";
import { genMovieLargeImgUrl, genMovieMiddleImgUrl } from "../../../requests/image";
import BriefIntroductionBox from "../item/BriefIntroductionBox";
import JumpToDetailBox from "../../interact/JumpToDetailBox";

export default function Grid({ data }) {
  const [mouseInsideWholeGrid, setMouseInsideWholeGrid] = useState(false)

  return (
    <Card className={classes.gridWhole}>
      {data.map((item, index) => {
        const { id, name, category, releaseTime, playAmount, score } = item
        const briefIntro = { name, category, releaseTime, playAmount, score }

        const large = (index + 1) % 4 === 2
        return (
          <Card.Grid
            className={
              large
                ? mouseInsideWholeGrid
                  ? classes.activatelargecard
                  : classes.deactivatelargecard
                : mouseInsideWholeGrid
                  ? classes.activatesmallcard
                  : classes.deactivatesmallcard
            }
            onMouseOver={() => setMouseInsideWholeGrid(true)}
            onMouseLeave={() => setMouseInsideWholeGrid(false)}

            style={{
              backgroundImage: `url(${
                large
                  ? genMovieLargeImgUrl(id)
                  : genMovieMiddleImgUrl(id)
              })`,
            }}
            key={index}
          >
            <JumpToDetailBox urlParam={id}>
              <div className="briefintro">
                <BriefIntroductionBox data={briefIntro} />
              </div>
            </JumpToDetailBox>
          </Card.Grid>
        )
      })}
    </Card>
  )
}
