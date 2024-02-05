import { useNavigate, useRouteError } from "react-router-dom";
import { Button, Empty } from "antd";

import notFoundImg from "./assets/404-page-not-found-two-color.svg";
import classes from "./error.module.less";
import useTabTitle from "./utils/useDocumentTitle";

export default function ErrorPage() {
  useTabTitle("error")
  const navigate = useNavigate()

//   const error = useRouteError()
  return (
    <div className={classes.boxWhole}>
      <Empty
        image={notFoundImg}
        imageStyle={{
          height: 400
        }}
        description="您访问的页面不存在……"
      >
        <Button
          type="primary"
          onClick={() => navigate(-1)}
        >
          返回
        </Button>
      </Empty>
    </div>
  )
}
