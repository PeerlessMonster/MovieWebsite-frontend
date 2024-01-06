import { Button, Result } from "antd";

export default function ErrorPage() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="您访问的页面不存在……"
            extra={
                <Button
                    type="primary"
                    onClick={() => history.back(-1)}
                >返回</Button>
            }
        />
    );
}