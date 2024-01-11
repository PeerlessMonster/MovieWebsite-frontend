import { pathToTitle } from "./route_config"

export async function loader() {
    document.title = pathToTitle.get("category")
    return {}
}

export default function CategoryTab() {
    return (
        <>
            <div>

            </div>

            <div>
            </div>
        </>
    )
}