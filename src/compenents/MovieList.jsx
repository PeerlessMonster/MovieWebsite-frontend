import { Avatar, List } from "antd";

import testImg from "../assets/wandering-earth-2.webp"

export default function MovieList() {
    const data = [
        {
            name: '流浪地球',
            imgSrc: testImg,
            description: '占位符'
        },
        {
            name: '流浪地球',
            imgSrc: testImg,
            description: '占位符'
        },
        {
            name: '流浪地球',
            imgSrc: testImg,
            description: '占位符'
        }
    ]

    return (
        <List
            itemLayout="horizontal"

            dataSource={data}
            renderItem={(item, _) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src="http://localhost:8080/movie/wandering-earth-2.webp" />}
                        title={<h1>{item.name}</h1>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    )
}