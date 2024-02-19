import { Button, notification } from "antd";

import classes from "./LoginExpireNotification.module.css";

export default function LoginExpireNotification() {
  notification.warning({
    message: "通知",
    description: (
      <div>
        <div>您的登录状态已过期，请重新登录！</div>
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
    placement: "topRight",
    duration: null
  })
}
