import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Divider, FloatButton, message } from "antd";

import classes from "./Category.module.less";
import { pathToTitle } from "./route_config";
import CardHorizontalBox from "../compenents/display/list/CardHorizontalBox";
import FilterForm from "../compenents/input/FilterForm";
import { search } from "../requests/movie";
import useArriveBottom from "../states/useArriveBottom";

const filter = {
  category: null,
  region: null,
  search: "",
  keyword: null,
  sort: "play_amount",
  descend: true,
};

export async function loader() {
  document.title = pathToTitle.get("category");

  let movies = null;

  const response = await search(filter);
  if (response.ok) {
    movies = await response.json();
  }
  return { movies };
}

export default function CategoryTab() {
  const { movies } = useLoaderData()
  const [data, setData] = useState(movies)

  const [latestSubmittedFiltter, setLatestSubmittedFilter] = useState(filter)
  const noMoreData = useRef(false)

  const arrivedBottom = useArriveBottom();
  useEffect(() => {
    let ignore = false

    if (!noMoreData.current) {
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

      if (!ignore) {
        loadMoreData(data.length)
      }
    } else {
      message.info("已经到底啦")
    }
    return () => (ignore = true)

  }, [arrivedBottom])

  return (
    <>
      <div className={classes.form}>
        <FilterForm
          setData={setData}
          setLatestSubmittedFormData={setLatestSubmittedFilter}
          latestSubmittedFormData={latestSubmittedFiltter}
        />
      </div>
      <Divider className={classes.divider} orientation="left">
        <h1 className={classes.title}>搜索结果</h1>
      </Divider>
      <div className={classes.boxBottomofForm}>
        <CardHorizontalBox data={data} />
      </div>

      {/* Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DomWrapper2 which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node */}
      <FloatButton.BackTop type="primary" tooltip="回到顶部" />
    </>
  )
}
