import classes from "./BriefIntroduction.module.less";
import FeedbackBox from "./FeedbackBox";

export default function BriefIntroduction({ data }) {
  return (
    <>
      <div>
        <h1 className={classes.title}>{data.name}</h1>
        <div className={classes.annotationBottomofTitle}>{data.category}</div>
      </div>
      <h3 className={classes.maintext}>上映时间：{data.releaseTime}</h3>
      <FeedbackBox
        playAmount={data.playAmount}
        score={data.score}
      />
    </>
  )
}
