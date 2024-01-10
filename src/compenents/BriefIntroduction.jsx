import classes from "./BriefIntroduction.module.less";
import PlayAmount from "./PlayAmount";
import ScoreStar from "./ScoreStar";

export default function BriefIntroduction({
  name,
  category,
  releaseTime,
  playAmount,
  score
}) {
  return (
    <>
      <div className={classes.title}>{name}</div>
      <div className={classes.annotation}>{category}</div>
      <div className>上映时间：{releaseTime}</div>
      <div className={classes.sidebysidebox}>
        <PlayAmount value={playAmount} />
        <div className={classes.scorestarEndofPlayamount}>
          <ScoreStar value={score} />
        </div>
        
      </div>
    </>
  )
}
