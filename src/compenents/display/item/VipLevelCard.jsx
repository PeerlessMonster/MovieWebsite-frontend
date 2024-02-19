import { Button, Card } from "antd";

import classes from "./VipLevelCard.module.less";

export default function VipLevelCard({ value }) {
  return (
    <Card
      className={classes.cardWhole}
      actions={[
        <Button
          className={classes.vipbutton}
          type="primary"
          shape="round"
          size="large"
          key="vip"
          disabled
        >
          已开通
        </Button>
      ]}
    >
      <div className={classes.vipcontent}>
        <h1 className={classes.title}>VIP {value}</h1>
        <h3 className={classes.subtitleBottomofTitle}>已解锁权益：</h3>
        <ul>
          <li>会员专享影片</li>
        </ul>
      </div>
    </Card>
  )
}
