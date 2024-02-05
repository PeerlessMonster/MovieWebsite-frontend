import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Divider, Empty, FloatButton, message } from "antd";

import emptyInboxImg from "../assets/empty-inbox-outline.svg";
import classes from "./Category.module.less";
import CardHorizontalBox from "../compenents/display/list/CardHorizontalBox";
import FilterBox from "../compenents/form/list/FilterBox";
import { search } from "../requests/movie";
import useScrollStatus from "../utils/useScrollStatus";
import useReachBottom from "../utils/useReachBottom";
import useTabTitle from "../utils/useDocumentTitle";

const filter = {
  category: null,
  region: null,
  search: "",
  keyword: null,
  sort: "play_amount",
  descend: true
}

export async function loader() {
  let movies = null
  const response = await search(filter)
  if (response.ok) {
    movies = await response.json()
  }
  return { movies }
}

export default function CategoryTab() {
  useTabTitle("category")

  const { movies } = useLoaderData()
  const [data, setData] = useState(movies)

  const [latestSubmittedFiltter, setLatestSubmittedFilter] = useState(filter)
  const noMoreData = useRef(false)
  const loadMoreData = async (offset) => {
    const response = await search(latestSubmittedFiltter, offset)
    if (response.ok) {
      const moreData = await response.json()
      if (moreData.length === 0) {
        noMoreData.current = true
      } else {
        setData(data.concat(moreData))
      }
    } else {
      if (response.status === 404) {
        setData([])
      }
    }
  }

  useReachBottom([data], () => {
    if (!noMoreData.current) {
      loadMoreData(data.length)
    } else {
      message.info("已经到底啦")
    }
  })
  /* 另一种实现 */
  // const { scrollTop, scrollHeight, clientHeight } = useScrollStatus()
  // useEffect(() => {
  //   let ignore = false

  //   if (scrollHeight - scrollTop === clientHeight) {
  //     if (!noMoreData.current) {
  //       if (!ignore) {
  //         loadMoreData(data.length)
  //       }
  //     } else {
  //       message.info("已经到底啦")
  //     }
  //   }
  //   return () => (ignore = true)

  // }, [scrollTop, scrollHeight, clientHeight])

  return (
    <>
      <div className={classes.form}>
        <FilterBox
          setData={setData}
          setLatestSubmittedFormData={setLatestSubmittedFilter}
          latestSubmittedFormData={latestSubmittedFiltter}
        />
      </div>
      <Divider
        className={classes.divider}
        orientation="left"
      >
        <h1 className={classes.title}>搜索结果</h1>
      </Divider>
      <div className={classes.boxBottomofForm}>
        {
          data.length !== 0 ? (
            <div className="content">
              <CardHorizontalBox data={data} />
            </div>
          ) : (
            <Empty
              image={emptyInboxImg}
              imageStyle={{
                height: 200
              }}
              description="暂无符合条件的影片"
            />
          )
        }
      </div>

      {/* Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DomWrapper2 which is inside StrictMode. Instead, add a ref directly to the element you want to reference. */}
      <FloatButton.BackTop
        type="primary"
        tooltip="回到顶部"
      />
    </>
  )
}
