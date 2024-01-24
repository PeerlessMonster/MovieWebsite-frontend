import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
const { useWatch } = Form;

import classes from "./FilterBox.module.less";
import { orders, search, searches, sorts } from "../../../requests/movie";
import { pickMovieCategory, pickMovieRegion } from "../../../states/MovieInfo";

const { categories, regions } = await (async function() {
  const categories = await pickMovieCategory()
  const regions = await pickMovieRegion()

  return { categories, regions }
})()

export default function FilterBox({ setData, setLatestSubmittedFormData, latestSubmittedFormData }) {
  const [form] = Form.useForm()
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
        <Checkbox.Group options={categories} />
      </Form.Item>

      <Form.Item label={
          <h3 className={classes.label}>地区</h3>
        }
        name="region"
      >
        <Checkbox.Group options={regions} />
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
              options={searches}
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
              options={sorts}
            />
          </Form.Item>
          <Form.Item name="descend">
            <Select
              className={classes.select}
              options={orders}
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
