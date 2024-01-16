import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
const { useWatch } = Form;

import classes from "./FilterBox.module.less";
import { search } from "../../../requests/movie";

export default function FilterBox({ setData, setLatestSubmittedFormData, latestSubmittedFormData }) {
  const categoryOptions = [
    "科幻",
    "冒险",
    "灾难",
    "剧情",
    "悬疑",
    "犯罪",
    "喜剧",
    "历史",
    "战争",
    "动作",
    "西部",
    "惊悚",
    "传记",
    "爱情"
  ]
  const regionOptions = ["中国大陆", "中国香港", "中国澳门", "中国台湾", "美国", "英国", "加拿大", "法国", "荷兰"]
  const searchOptions = [
    { value: "", label: " " },
    { value: "name", label: "名称" },
    { value: "director", label: "导演" },
    { value: "scriptwriter", label: "编剧" },
    { value: "actor", label: "主演" },
  ]
  const sortOptions = [
    { value: "release_time", label: "上映时间" },
    { value: "duration", label: "时长" },
    { value: "play_amount", label: "播放量" },
    { value: "score", label: "评分" },
  ]
  const orderOptions = [
    { value: true, label: "降序" },
    { value: false, label: "升序" },
  ]

  const [form] = Form.useForm();
  const formData = useWatch([], form)
  const onFinish = () => {
    if (formData != latestSubmittedFormData) {
      submitSearch(formData)
    }
  }

  const submitSearch = async (data) => {
    const response = await search(data)
    if (response.ok) {
      const data = await response.json()
      setData(data)
      setLatestSubmittedFormData(formData)
    }
  }

  return (
    <Form
      layout="vertical"

      name="serach"
      form={form}
      initialValues={{
        search: "",
        sort: "play_amount",
        descend: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label={
          <h3 className={classes.label}>分类</h3>
        }
        name="category"
      >
        <Checkbox.Group options={categoryOptions} />
      </Form.Item>

      <Form.Item label={
          <h3 className={classes.label}>地区</h3>
        }
        name="region"
      >
        <Checkbox.Group options={regionOptions} />
      </Form.Item>

      <div className={classes.selectinputBottomofCheckbox}>
        <Space
          className={classes.searchkeywordbox}
          size="small"
        >
          <Form.Item
            label={
              <h3 className={classes.label}>搜索字段</h3>
            }

            name="search"
          >
            <Select
              className={classes.select}
              options={searchOptions}
            />
          </Form.Item>
          <Form.Item
            label={
              <h3 className={classes.label}>关键词</h3>
            }

            name="keyword"
            dependencies={["search"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value && getFieldValue("search") !== "") {
                    return Promise.reject(new Error("请输入搜索的关键词！"))
                  } else if (value && getFieldValue("search") == "") {
                    return Promise.reject(new Error("请选择要搜索的字段！"))
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <Input
              className={classes.input}
              placeholder="留空则搜索所有符合条件的结果"
            />
          </Form.Item>
        </Space>
        <Space
          className={classes.sortbox}
          size="small"
        >
          <Form.Item
            label={
              <h3 className={classes.label}>排序字段</h3>
            }

            name="sort"
          >
            <Select
              className={classes.select}
              options={sortOptions}
            />
          </Form.Item>
          <Form.Item name="descend">
            <Select
              className={classes.select}
              options={orderOptions}
            />
          </Form.Item>
        </Space>
      </div>

      <Form.Item className={classes.buttonBottomofInput}>
        <Space size="large">
          <Button
            type="primary"
            ghost
            icon={
              <UndoOutlined />
            }
            htmlType="reset"
          >
            重置
          </Button>
          <Button
            type="primary"
            icon={
              <SearchOutlined />
            }
            htmlType="submit"
          >
            搜索
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
