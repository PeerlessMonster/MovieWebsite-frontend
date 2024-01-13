import { Rate, Space } from "antd";

import classes from "./ScoreStar.module.less";

export default function ScoreStar({ value }) {
    return (
        <Space>
            <Rate
                disabled
                allowHalf

                value={value / 2}
            />
            <span className={classes.textEndofRate}>{value}</span>
        </Space>
    )
}