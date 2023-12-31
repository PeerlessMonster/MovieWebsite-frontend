import { Button, Result } from "antd";
import { useRouteError } from "react-router-dom";
// import "./error.css"

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <Result
            status="404"
            title="此页面未找到"
            subTitle={error.statusText || error.message}
            extra={
                <Button
                    type="primary"
                    onClick={() => history.back(-1)}
                >返回</Button>
            }
        />
    );
}