import { Space, Tag } from "antd";

export default function RandomColorTagList({ value }) {
  const colors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple"
  ]
  const number = colors.length

  return (
    <Space size={[0, 8]} wrap>
      {value.map((item, index) => {
        const pos = Math.floor(Math.random() * number)

        return (
          <Tag bordered={false} color={colors[pos]} key={index}>
            {item}
          </Tag>
        )
      })}
    </Space>
  )
}
