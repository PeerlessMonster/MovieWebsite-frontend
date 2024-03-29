import { useContext } from "react";
import { useLoaderData } from "react-router-dom";

import classes from "./Detail.module.less";
import { searchOne } from "../requests/movie";
import MoreInformationBox from "../compenents/display/item/MoreInformationBox";
import { genMovieLargeImgUrl } from "../requests/image";
import { UserContext } from "../states/UserContext";
import DetailCard from "../compenents/display/item/DetailCard";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export async function loader({ params }) {
  let movieDetail = null

  const response = await searchOne(params.id)
  if (response.ok) {
    movieDetail = await response.json()
  }
  return { movieDetail }
}

export default function DetailTab() {
  const user = useContext(UserContext)
  const userInfo = user.info
  if (!userInfo) {
    throw Error("未登录账号！")
  }

  const { movieDetail } = useLoaderData()
  const { name, category, releaseTime, region, duration, playAmount, score, vip, director, scriptwriter, actor, description } = movieDetail
  const moreInfo = { name, category, releaseTime, region, duration, playAmount, score, vip }
  const detailIntro = { director, scriptwriter, actor, description }

  useDocumentTitle(name)
  return (
    <>
      <div
        className={classes.box}
        style={{
          backgroundImage: `url(${genMovieLargeImgUrl(movieDetail.id)})`,
        }}
      >
        <div className={classes.card}>
          <MoreInformationBox data={moreInfo} />
        </div>
      </div>
      <div className={classes.tableBottomofBox}>
        <h1>影片详情</h1>
        <DetailCard data={detailIntro} />
      </div>
    </>
  )
}