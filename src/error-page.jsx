import { Button, Result } from "antd";

import classes from "./error.module.less";

export default function ErrorPage() {
    return (
        <Result
            className={classes.resultboxWhole}
            status="error"
            title={
                <h1 className={classes.titleBottomofIcon}>404</h1>
            }
            subTitle={
                <h1 className={classes.subtitle}>您访问的页面不存在……</h1>
            }
            extra={
                <Button
                    className={classes.buttonBottomofSubtitle}
                    type="primary"
                    size="large"
                    onClick={() => history.back(-1)}
                >返回</Button>
            }
        />
    );
}