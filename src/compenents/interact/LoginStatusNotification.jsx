import { Button, notification } from "antd";

import classes from "./LoginStatusNotification.module.css";

export default function LoginStatusNotification({ data }) {
  const { message } = data
  notification.warning({
    placement: "topRight",

    message: "通知",
    description: (
      <div>
        <div>{message}</div>
        <div className={classes.buttonBottomofText}>
          <Button
            type="primary"
            
            onClick={() => location.reload()}
          >
            刷新
          </Button>
        </div>
      </div>
    ),
    duration: null
  })
}
