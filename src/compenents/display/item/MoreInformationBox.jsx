import { useContext } from "react";
import { Button } from "antd";
import { CrownOutlined, PlayCircleOutlined } from "@ant-design/icons";

import classes from "./MoreInformationBox.module.less";
import FeedbackBox from "../element/FeedbackBox";
import CategoryTagList from "../element/CategoryTagList";
import { UserContext } from "../../../states/UserContext";

export default function MoreInformationBox({ data }) {
  const needLevel = data.vip
  const user = useContext(UserContext)
  const userInfo = user.info
  const userLevel = userInfo.vip
  const able = userLevel >= needLevel

  const categoryStr = data.category;
  const categoryList = categoryStr.split("/");

  return (
    <>
      <div>
        <h1 className={classes.title}>{data.name}</h1>
        <h3 className={classes.dateBottomofTitle}>
          上映时间：{data.releaseTime}
        </h3>
      </div>

      <div>
        <div>
          <div className={classes.annotation}>{data.region}</div>
          <div className={classes.taglistBottomofAnnotation}>
            <CategoryTagList value={categoryList} />
          </div>
        </div>
      </div>

      <div>
        <div>
          <Button
            type="primary"
            ghost={!able}
            size="large"
            icon={
              able ? <PlayCircleOutlined /> : <CrownOutlined />
            }
          >
            {able ? "立即播放" : "会员专享"}
          </Button>
          <h3 className={classes.textEndofButton}>
            {data.duration}
            <span className="recover"> 分钟</span>
          </h3>
        </div>

        <div className={classes.feedbackbox}>
          <FeedbackBox
            playAmount={data.playAmount}
            score={data.score}
          />
        </div>
      </div>
    </>
  )
}
