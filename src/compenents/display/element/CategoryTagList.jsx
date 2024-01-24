import { Space, Tag } from "antd";

import { pickMovieCategory } from "../../../states/MovieInfo";

const categoryToColor = await (async function() {
  const map = new Map()
  
  const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
  const colorNumber = colors.length

  const categories = await pickMovieCategory()
  let index = 0
  categories.map((category) => {
    map.set(category, colors[index])
    
    index = (index + 1) % colorNumber
  })
  return map
})()

export default function CategoryTagList({ value }) {
  return (
    <Space size={[0, 8]} wrap>
      {value.map((item, index) => {
        return (
          <Tag
            bordered={false}
            color={categoryToColor.get(item)}
            key={index}
          >
            {item}
          </Tag>
        )
      })}
    </Space>
  )
}
