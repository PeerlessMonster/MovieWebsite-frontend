import { useLoaderData } from "react-router-dom";

import classes from "./Rank.module.less"
import CarouselBox from "../compenents/display/list/CarouselBox";
import { getCarousel, getLatest, getPopular, getTopScore } from "../requests/movie";
import CardVerticalListHorizontal from "../compenents/display/list/CardVerticalListHorizontal";
import ListVertical from "../compenents/display/list/ListVertical";
import Grid from "../compenents/display/list/Grid";
import { pathToTitle } from "./route_config";

export async function loader() {
    document.title = pathToTitle.get("rank")

    let carouselMovies = null
    let response = await getCarousel()
    if (response.ok) {
        carouselMovies = await response.json()
    }

    let latestMovies = null
    response = await getLatest()
    if (response.ok) {
        latestMovies = await response.json()
    }

    let topScoreMovies = null
    response = await getTopScore()
    if (response.ok) {
        topScoreMovies = await response.json()
    }

    let popularMovies = null
    response = await getPopular()
    if (response.ok) {
        popularMovies = await response.json()
    }

    return { carouselMovies, latestMovies, topScoreMovies, popularMovies }
}

export default function RankTab() {
    const { carouselMovies, latestMovies, topScoreMovies, popularMovies } = useLoaderData()

    return (
        <>
            <div className={classes.carouselBottomofHeader}>
                <CarouselBox data={carouselMovies} />
            </div>
            
            <div className={classes.horizontallistBottomofCarousel}>
                <h1>最新上映</h1>
                <CardVerticalListHorizontal data={latestMovies} />
            </div>

            <div className={classes.sidebysideboxBottomofHorizontallist}>
                <div className="verticallist">
                    <h1>广受好评</h1>
                    <ListVertical data={topScoreMovies} />
                </div>
                <div className="cardgrid-endof-verticallist">
                    <h1>时下热门</h1>
                    <Grid data={popularMovies} />
                </div>
            </div>
        </>
    )
}