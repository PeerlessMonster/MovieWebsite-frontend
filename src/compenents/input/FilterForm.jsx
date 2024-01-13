import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
const { useWatch } = Form;

import classes from "./FilterForm.module.less";
import { search } from "../../requests/movie";

export default function FilterForm({ setData, setLatestSubmittedFormData, latestSubmittedFormData }) {
  const categoryOptions = [
    "科幻",
    "冒险",
    "灾难",
    "剧情",
    "喜剧",
    "历史",
    "战争",
    "动作",
    "西部",
  ]
  const regionOptions = ["中国大陆", "中国香港", "美国"]
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
    const search = formData.search
    const keyword = formData.keyword
    console.info(formData)
    if ((search != "" && keyword != null) || (search == "" && keyword == null)) {
      if (formData != latestSubmittedFormData) {
        submitSearch(formData)
      }
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
          <h3 className={classes.label}>分 类</h3>
        }
        name="category"
      >
        <Checkbox.Group options={categoryOptions} />
      </Form.Item>

      <Form.Item label={
          <h3 className={classes.label}>地 区</h3>
        }
        name="region"
      >
        <Checkbox.Group options={regionOptions} />
      </Form.Item>

      <div className={classes.searchboxBottomofCheckbox}>
        <Space size="small">
          <Form.Item
            className="search-single"
            name="search"
          >
            <Select
              className={classes.select}
              options={searchOptions}
            />
          </Form.Item>
          <Form.Item
            className="search-single"
            name="keyword"
          >
            <Input
              className={classes.input}
              placeholder="留空则搜索所有符合条件的结果"
            />
          </Form.Item>
        </Space>
        <Space size="small">
          <Form.Item
            className="search-single"
            name="sort"
          >
            <Select
              className={classes.select}
              options={sortOptions}
            />
          </Form.Item>
          <Form.Item
            className="search-single"
            name="descend"
          >
            <Select
              className={classes.select}
              options={orderOptions}
            />
          </Form.Item>
        </Space>
      </div>

      <Form.Item className={classes.buttonBottomofInput}>
        <Space size="small">
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
