import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  FormInstance,
  Input,
  InputRef,
  Row,
  Select,
  Space,
} from "antd";
import { AimOutlined, PlusOutlined } from "@ant-design/icons";
import { CommunityFrom } from "../model/Community";
import { property_type, region } from "../value_object/house_columns";
import {
  useCommunityByName,
  useGetCommunityNames,
  useSaveCommunity,
} from "../api/Community";
import { useEffect, useRef, useState } from "react";

export function useCommunity(propCommunityName?: string) {
  const [communityName, setCommunityName] = useState<string>();
  const [communityForm] = Form.useForm<CommunityFrom>();
  const save = useSaveCommunity();
  const { data } = useGetCommunityNames();
  const { data: communityRes } = useCommunityByName(communityName);
  const community = communityRes?.data;
  const {
    items,
    name,
    onNameChange,
    addItem,
    inputRef,
    dropdownVisible,
    setOnDropdownVisibleChange,
  } = useAddItem(communityForm);

  useEffect(() => {
    if (community) {
      communityForm.setFieldsValue(community as any);
    } else {
      communityForm.resetFields();
    }
  }, [community]);

  useEffect(() => {
    setCommunityName(propCommunityName);
  }, [propCommunityName]);

  const communityNode = (
    <Form form={communityForm} layout="vertical" style={{ margin: "0 auto" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="小区名称"
            name="community_name"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="选择小区"
              open={dropdownVisible}
              onDropdownVisibleChange={setOnDropdownVisibleChange}
              onSelect={(community_name) => setCommunityName(community_name)}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Row style={{ padding: "0 8px 4px" }} gutter={4}>
                    <Col flex={1}>
                      <Input
                        placeholder="新增小区名称"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                    </Col>

                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      新增
                    </Button>
                  </Row>
                </>
              )}
              options={(data?.data ?? [])
                .map((community_name) => {
                  return {
                    value: community_name,
                    label: (
                      <Flex justify="space-between" align="center">
                        <span>{community_name}</span>
                        <Button
                          type="link"
                          icon={<AimOutlined />}
                          size="small"
                        />
                      </Flex>
                    ),
                  };
                })
                .concat(
                  items.map((name) => {
                    return {
                      value: name,
                      label: <>{name}</>,
                    };
                  })
                )}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="所在区域"
            name="region"
            rules={[{ required: true }]}
          >
            <Select placeholder="所在区域" options={region} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="建设年份" name="year_built">
            <Select
              placeholder="建设年份"
              showSearch
              style={{ width: "100%" }}
              options={new Array(100).fill(0).map((_, index) => {
                const year = new Date().getFullYear() - index;
                return {
                  value: year,
                  label: year,
                };
              })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="物业公司" name="property_management_company">
            <Input placeholder="物业公司" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="住宅区类型" name="community_type">
            <Select
              placeholder="物业类型"
              onChange={() => {}}
              style={{ minWidth: 200 }}
              options={property_type}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="小区描述" name="description">
            <Input.TextArea placeholder="小区描述" rows={3} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  return {
    communityNode,
    communityForm,
    communitySubmit,
    loading: save.isLoading,
  };

  async function communitySubmit() {
    const value = await communityForm.validateFields();
    let newValue = {
      city: "安庆",
      state: "安徽省",
      postal_code: "246000",
      ...value,
    };

    await save.mutateAsync(newValue);
    return value;
  }
}

function useAddItem(form: FormInstance, key = "community_name") {
  const [items, setItems] = useState<String[]>([]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [dropdownVisible, setOnDropdownVisibleChange] = useState(false);

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (name) {
      form.setFieldsValue({ [key]: name });
      // setItems([...items, name]);
      setItems([name]);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
        setOnDropdownVisibleChange(false);
      }, 0);
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return {
    items,
    name,
    onNameChange,
    addItem,
    inputRef,
    dropdownVisible,
    setOnDropdownVisibleChange,
  };
}
