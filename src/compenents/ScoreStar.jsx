import { Rate, Space } from "antd";

export default function ScoreStar({ value }) {
    return (
        <Space>
            <Rate
                disabled
                allowHalf

                value={value / 2}
            />
            <span>{value}</span>
        </Space>
    )
}