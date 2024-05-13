import classes from "./BriefIntroductionBox.module.less";
import FeedbackBox from "../element/FeedbackBox";

export default function BriefIntroductionBox({ data }) {
  const { name, category, releaseTime, playAmount, score } = data
  return (
    <>
      <div>
        <h1 className={classes.title}>{name}</h1>
        <div className={classes.annotationBottomofTitle}>{category}</div>
      </div>
      <h3 className={classes.maintext}>上映时间：{releaseTime}</h3>
      <FeedbackBox
        playAmount={playAmount}
        score={score}
      />
    </>
  )
}
