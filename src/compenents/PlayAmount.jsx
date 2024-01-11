import { FireTwoTone, PlayCircleOutlined } from "@ant-design/icons"

import classes from "./PlayAmount.module.less";
import { Space } from "antd";

export default function PlayAmount({ value }) {
    let playAmountStr
    if (value > 99999999) {
        playAmountStr = `${value / 100000000}亿`
    } else if (value > 9999) {
        playAmountStr = `${value / 10000}万`
    }

    return (
        <Space>
            <FireTwoTone />
            <span className={classes.textEndofIcon}>{playAmountStr}</span>
        </Space>
    )
}