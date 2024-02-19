import { useContext, useEffect, useState } from "react";
import { Space, Tag } from "antd";

import { MovieInfoContext } from "../../../states/MovieInfoContext";

class Color {
  static #_categoryToColor = null

  static init(categories) {
    if (!this.#_categoryToColor) {
      const map = new Map()

      const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
      const colorNumber = colors.length

      let index = 0
      categories.map((category) => {
        map.set(category, colors[index])

        index = (index + 1) % colorNumber
      })
      this.#_categoryToColor = map
    }
  }

  static get(category) {
    return this.#_categoryToColor.get(category)
  }
}

export default function CategoryTagList({ value }) {
  const [ready, setReady] = useState(false)

  const { info: movieInfo } = useContext(MovieInfoContext)
  useEffect(() => {
    const { categories } = movieInfo
    Color.init(categories)

    setReady(true)
  }, [])
  
  return (
    <Space size={[0, 8]} wrap>
      {value.map((item, index) => {
        return (
          <Tag
            bordered={false}
            color={ready ? Color.get(item) : null}
            key={index}
          >
            {item}
          </Tag>
        )
      })}
    </Space>
  )
}
