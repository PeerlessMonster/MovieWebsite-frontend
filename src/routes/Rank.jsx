import { useLoaderData } from "react-router-dom";

import classes from "./Rank.module.less"
import PictureCarousel from "../compenents/PictureCarousel";
import { getCarousel, getLatest, getPopular, getTopScore } from "../requests/movie";
import CardListHorizontal from "../compenents/CardListHorizontal";
import ListVerticalCard from "../compenents/ListVerticalCard";
import CardGrid from "../compenents/CardGrid";
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
                <PictureCarousel data={carouselMovies} />
            </div>
            
            <div className={classes.horizontallistBottomofCarousel}>
                <h1>最新上映</h1>
                <CardListHorizontal data={latestMovies} />
            </div>

            <div className={classes.sidebysideboxBottomofHorizontallist}>
                <div className="verticallist">
                    <h1>广受好评</h1>
                    <ListVerticalCard data={topScoreMovies} />
                </div>
                <div className="cardgrid-endof-verticallist">
                    <h1>时下热门</h1>
                    <CardGrid data={popularMovies} />
                </div>
            </div>
        </>
    )
}