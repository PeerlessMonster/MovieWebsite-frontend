import { Descriptions, Space } from "antd";
import { CopyrightTwoTone, EditTwoTone, SmileTwoTone, VideoCameraTwoTone } from "@ant-design/icons";

import classes from "./DetailCard.module.less";

export default function DetailCard({ data }) {
    const items = [
        {
            key: "1",
            label: (<span className={classes.title}>导演</span>),
            children: (<Space><VideoCameraTwoTone />{data.director}</Space>)
        },
        {
            key: "2",
            label: (<span className={classes.title}>编剧</span>),
            children: (<Space><EditTwoTone />{data.scriptwriter}</Space>)
        },
        {
            key: "3",
            label: (<span className={classes.title}>主演</span>),
            children: (<Space><SmileTwoTone />{data.actor}</Space>)
        },
        {
            key: "4",
            label: (<span className={classes.title}>故事梗概</span>),
            children: (
                <span className={classes.maintext}>
                    {data.description}&nbsp;
                    <CopyrightTwoTone />
                </span>
            )
        }
    ]

    return (
        <Descriptions
            className={classes.cardWhole}
            layout="vertical"

            items={items}
        />
    )
}