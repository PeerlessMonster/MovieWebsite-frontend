import { useContext } from "react"
import { useLoaderData } from "react-router-dom"

import classes from "./Detail.module.less"
import { getDetail } from "../requests/movie"
import DetailIntroduction from "../compenents/DetailIntroduction"
import { genMovieLargeImgUrl } from "../requests/image"
import { userContext } from "../states/userContext"
import MoreIntroduction from "../compenents/MoreIntroduction"

export async function loader({ params }) {
    /* 滚动到顶部 */
    // window.scrollTo({
    //     top: 0,
    //     behavior: "smooth"
    // })

    let movieDetail = null

    const response = await getDetail(params.id)
    if (response.ok) {
        movieDetail = await response.json()
    }

    document.title = movieDetail.name
    return { movieDetail }
}

export default function Detail() {
    const user = useContext(userContext)
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
                    <DetailIntroduction data={detailIntro}/>
                </div>
            </div>
            <div className={classes.tableBottomofBox}>
                <h1>影片详情</h1>
                <MoreIntroduction data={moreIntro} />
            </div>
        </>
    )
}