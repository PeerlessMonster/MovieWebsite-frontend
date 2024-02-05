import { useEffect, useState } from "react";
import { Space, Tag } from "antd";

import { accessCategoriesCache } from "../../../states/MovieInfo";

class Color {
  static #categoryToColor

  static async accessCategoryToColorCache() {
    if (!this.#categoryToColor) {
      this.#categoryToColor = await this.#genCategoryToColor()
    }
    return this.#categoryToColor
  }

  static async #genCategoryToColor() {
    const map = new Map()

    const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]
    const colorNumber = colors.length

    const categories = await accessCategoriesCache()
    let index = 0
    categories.map((category) => {
      map.set(category, colors[index])

      index = (index + 1) % colorNumber
    })
    return map
  }
}

export default function CategoryTagList({ value }) {
  const [categoryToColor, setCategoryToColor] = useState(null)
  useEffect(() => {
    const startFetching = async () => {
      const data = await Color.accessCategoryToColorCache()
      setCategoryToColor(data)
    }

    let ignore = false
    if (!ignore) {
      startFetching()
    }
    return () => ignore = true
  }, [])

  return (
    <Space size={[0, 8]} wrap>
      {value.map((item, index) => {
        return (
          <Tag
            bordered={false}
            color={categoryToColor?.get(item) ?? null}
            key={index}
          >
            {item}
          </Tag>
        )
      })}
    </Space>
  )
}
