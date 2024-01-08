import { useLoaderData } from "react-router-dom";

import classes from "./Rank.module.less"
import PictureCarousel from "../compenents/PictureCarousel";
import { getCarousel } from "../requests/movie";

export async function loader() {
    let carouselMovies = null

    const response = await getCarousel()
    if (response.ok) {
        carouselMovies = await response.json()
    }
    return { carouselMovies }
}

export default function RankTab() {
    const { carouselMovies } = useLoaderData()

    return (
        <>
            <div className={classes.carouselBottomofHeader}>
                <PictureCarousel data={carouselMovies} />
            </div>
            
            <div>
                <h1>测试</h1>
            </div>
        </>
    )
}