import { useContext } from "react"
import { useLoaderData } from "react-router-dom"

import classes from "./Detail.module.less"
import { searchOne } from "../requests/movie"
import MoreInformationBox from "../compenents/display/item/MoreInformationBox"
import { genMovieLargeImgUrl } from "../requests/image"
import { UserContext } from "../states/UserContext"
import DetailCard from "../compenents/display/item/DetailCard"

export async function loader({ params }) {
    /* 滚动到顶部 */
    // window.scrollTo({
    //     top: 0,
    //     behavior: "smooth"
    // })

    let movieDetail = null

    const response = await searchOne(params.id)
    if (response.ok) {
        movieDetail = await response.json()
    }

    document.title = movieDetail.name
    return { movieDetail }
}

export default function DetailTab() {
    const user = useContext(UserContext)
    const userInfo = user.info
    if (!userInfo) {
        throw Error("未登录账号！")
    }

    const { movieDetail } = useLoaderData()
    const name = movieDetail.name
    const category = movieDetail.category
    const releaseTime = movieDetail.releaseTime
    const region = movieDetail.region
    const duration = movieDetail.duration
    const playAmount = movieDetail.playAmount
    const score = movieDetail.score
    const vip = movieDetail.vip
    const detailIntro = { name, category, releaseTime, region, duration, playAmount, score, vip }
    const director = movieDetail.director
    const scriptwriter = movieDetail.scriptwriter
    const actor = movieDetail.actor
    const description = movieDetail.description
    const moreIntro = { director, scriptwriter, actor, description }

    return (
        <>
            <div
                className={classes.box}
                style={{
                    backgroundImage: `url(${genMovieLargeImgUrl(movieDetail.id)})`
                }}
                >
                <div className={classes.card}>
                    <MoreInformationBox data={detailIntro}/>
                </div>
            </div>
            <div className={classes.tableBottomofBox}>
                <h1>影片详情</h1>
                <DetailCard data={moreIntro} />
            </div>
        </>
    )
}