import classes from "./FeedbackBox.module.css";
import PlayAmount from "./PlayAmount";
import ScoreStar from "./ScoreStar";

export default function FeedbackBox({ playAmount, score }) {
  return (
    <div className={classes.boxWhole}>
      <PlayAmount value={playAmount} />
      <div className={classes.scorestarEndofPlayamount}>
        <ScoreStar value={score} />
      </div>
    </div>
  )
}
