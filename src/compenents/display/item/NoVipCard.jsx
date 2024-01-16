import { Button, Card } from "antd";

import classes from "./NoVipCard.module.less";

export default function NoVipCard({ openModal }) {
  return (
    <Card
      className={classes.cardWhole}
      actions={[
        <Button
          className={classes.novipbutton}
          type="primary"
          shape="round"
          size="large"
          key="vip"
          onClick={openModal}
        >
          我要开通 !
        </Button>
      ]}
    >
      <div className={classes.novipcontent}>
        <h1 className={classes.title}>开通会员</h1>
        <h3 className={classes.annotationBottomofTitle}>解锁会员专享影片~</h3>
      </div>
    </Card>
  )
}
