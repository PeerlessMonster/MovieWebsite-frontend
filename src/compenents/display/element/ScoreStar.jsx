import { Rate } from "antd";

import classes from "./ScoreStar.module.less";

export default function ScoreStar({ value }) {
  return (
    <div>
      <Rate
        disabled
        allowHalf
        className={classes.stars}
        
        value={value / 2}
      />
      <span className={classes.textEndofStars}>{value}</span>
    </div>
  )
}
