import { Space, Tag } from "antd";

import { accessCache, createCache } from "../../../hooks/useLocalStorage";

class Color {
  static #_categoryToColor = null

  static get #categoryToColor() {
    if (!this.#_categoryToColor) {
      const cache = createCache("categoryToColor", () => {
        const map = new Map()

        const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
        const colorNumber = colors.length

        let index = 0
        const categories = accessCache("categories")
        categories.map((category) => {
          map.set(category, colors[index])

          index = (index + 1) % colorNumber
        })

        /* JSON.stringfy()不会转换Map、Set
           Map转Array */
        return Array.from(map)
      })
      /* Array转回Map */
      this.#_categoryToColor = new Map(
        cache.map((value) => value)
      )
    }
    return this.#_categoryToColor
  }

  static match(category) {
    return this.#categoryToColor.get(category)
  }
}

export default function CategoryTagList({ value }) {  
  return (
    <Space size={[0, 8]} wrap>
      {value.map((item, index) => {
        return (
          <Tag
            bordered={false}
            color={/*ready ? */Color.match(item)/* : null*/}
            key={index}
          >
            {item}
          </Tag>
        )
      })}
    </Space>
  )
}
