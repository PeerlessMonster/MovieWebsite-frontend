import { Card } from "antd";
const { Meta } = Card;

import classes from "./PictureCardVertical.module.css"
import ScoreStar from "./ScoreStar";

export default function PictureCardVertical({ imageLink, name, score }) {
    return (
        <Card
            className={classes.cardWhole}
            
            cover={
                <img
                    className={classes.picture}

                    alt={name}
                    src={imageLink}
                />
            }
        >
            <Meta
                title={name}
                description={
                    <ScoreStar value={score} />
                }
            />
        </Card>
    )
}