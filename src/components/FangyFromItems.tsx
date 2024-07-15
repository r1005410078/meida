import { Cascader, Form, Select } from "antd";

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: "迎江",
    label: "迎江",
    children: [
      {
        value: "百货大楼",
        label: "百货大楼",
      },
      {
        value: "绿地新都会",
        label: "绿地新都会",
      },
      {
        value: "新城吾悦广场",
        label: "新城吾悦广场",
      },
    ],
  },
  {
    value: "宜秀",
    label: "宜秀",
    children: [
      {
        value: "光彩大市场",
        label: "光彩大市场",
      },
      {
        value: "文化广场",
        label: "文化广场",
      },
    ],
  },
  {
    value: "大观",
    label: "大观",
    children: [
      {
        value: "安庆八佰伴",
        label: "安庆八佰伴",
      },
      {
        value: "百联",
        label: "百联",
      },
    ],
  },
  {
    value: "其他",
    label: "其他",
  },
];

export function RegionFormItem() {
  return (
    <Form.Item label="区域" name="region">
      <Cascader
        multiple
        options={options}
        placeholder="区域"
        style={{ width: 310 }}
      />
    </Form.Item>
  );
}

export function PriceFormItem() {
  return (
    <Form.Item label="售价" name="price">
      <Select
        mode="multiple"
        placeholder="售价"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 160 }}
        options={[
          {
            value: "20",
            label: "20以下",
          },
          {
            value: "20,30",
            label: "20-30万",
          },
          {
            value: "30,40",
            label: "30-40万",
          },
          {
            value: "40-50",
            label: "40-50万",
          },
          {
            value: "50-60",
            label: "50-60万",
          },
          {
            value: "60-70",
            label: "60-70万",
          },
          {
            value: "70-80",
            label: "70-80万",
          },
          {
            value: "80-90",
            label: "80-90万",
          },
          {
            value: "90-100",
            label: "90-100万",
          },
          {
            value: "100-110",
            label: "100-110万",
          },
          {
            value: "110-120",
            label: "110-120万",
          },
          {
            value: "120-130",
            label: "120-130万",
          },
          {
            value: "130-140",
            label: "130-140万",
          },
          {
            value: "140-150",
            label: "140-150万",
          },
          {
            value: "150以上",
          },
        ]}
      />
    </Form.Item>
  );
}

export function RoomFormItem() {
  return (
    <Form.Item label="房型" name="room">
      <Select
        placeholder="房型"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 160 }}
        options={[
          {
            value: "不限",
            label: "不限",
          },
          {
            value: "一室",
            label: "一室",
          },
          {
            value: "二室",
            label: "二室",
          },
          {
            value: "三室",
            label: "三室",
          },
          {
            value: "四室",
            label: "四室",
          },
          {
            value: "五室",
            label: "五室",
          },
          {
            value: "五室以上",
            label: "五室以上",
          },
        ]}
      />
    </Form.Item>
  );
}

export function AreaFormItem() {
  return (
    <Form.Item label="面积 (单位 m²)" name="area">
      <Select
        placeholder="房型"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 200 }}
        options={[
          {
            value: "(70",
            label: "70以下",
          },
          {
            value: "70-80",
            label: "70-80",
          },
          {
            value: "80-90",
            label: "80-90",
          },
          {
            value: "90-100",
            label: "90-100",
          },
          {
            value: "100-110",
            label: "100-110",
          },
          {
            value: "110-120",
            label: "110-120",
          },
          {
            value: "120-130",
            label: "120-130",
          },
          {
            value: "130-140",
            label: "130-140",
          },
          {
            value: "140-150",
            label: "140-150",
          },
          {
            value: "150以上",
            label: "150以上",
          },
        ]}
      />
    </Form.Item>
  );
}

export function DirectionFormItem() {
  return (
    <Form.Item label="朝向" name="direction">
      <Select
        placeholder="朝向"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 200 }}
        options={[
          {
            value: "东",
            label: "东",
          },
          {
            value: "西",
            label: "西",
          },
          {
            value: "南",
            label: "南",
          },
          {
            value: "北",
            label: "北",
          },
          {
            value: "东南",
            label: "东南",
          },
          {
            value: "东北",
            label: "东北",
          },
          {
            value: "西南",
            label: "西南",
          },
          {
            value: "西北",
            label: "西北",
          },
          {
            value: "东西",
            label: "东西",
          },
          {
            value: "南北",
            label: "南北",
          },
        ]}
      />
    </Form.Item>
  );
}

export function FloorFormItem() {
  return (
    <Form.Item label="楼层" name="floor">
      <Select
        placeholder="楼层"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 200 }}
        options={[
          {
            value: "不限",
            label: "不限",
          },
          {
            value: "1,3",
            label: "1-3层",
          },
          {
            value: "3,5",
            label: "3-5层",
          },
          {
            value: "5,10",
            label: "5-10层",
          },
          {
            value: "10以上",
            label: "10以上",
          },
        ]}
      />
    </Form.Item>
  );
}

export function PropertyFormItem() {
  return (
    <Form.Item label="产权" name="property">
      <Select
        placeholder="产权"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 200 }}
        options={[
          {
            value: "商品房住宅",
            label: "商品房住宅",
          },
          {
            value: "商住两用",
            label: "商住两用",
          },
          {
            value: "经济适用房",
            label: "经济适用房",
          },
          {
            value: "公房",
            label: "公房",
          },
          {
            value: "动迁配套房",
            label: "动迁配套房",
          },
          {
            value: "其他",
            label: "其他",
          },
        ]}
      />
    </Form.Item>
  );
}

export function DecorationFormItem() {
  return (
    <Form.Item label="装修" name="decoration">
      <Select
        placeholder="装修"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 200 }}
        options={[
          {
            value: "毛坯",
            label: "毛坯",
          },
          {
            value: "普通装修",
            label: "普通装修",
          },
          {
            value: "精装修",
            label: "精装修",
          },
          {
            value: "豪华装修",
            label: "豪华装修",
          },
        ]}
      />
    </Form.Item>
  );
}

export function AgeFormItem() {
  return (
    <Form.Item label="房龄" name="age">
      <Select
        placeholder="房龄"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 200 }}
        options={[
          {
            value: "2",
            label: "2年以内",
          },
          {
            value: "2-5",
            label: "2-5年",
          },
          {
            value: "5-10",
            label: "5-10年",
          },
          {
            value: "10-20",
            label: "10-20年",
          },
          {
            value: "20以上",
            label: "20年以上",
          },
        ]}
      />
    </Form.Item>
  );
}

export function PropertyTypeFormItem() {
  return (
    <Form.Item label="物业类型" name="property_type">
      <Select
        placeholder="物业类型"
        defaultValue={[]}
        onChange={() => {}}
        style={{ minWidth: 200 }}
        options={[
          {
            value: "普通住宅",
            label: "普通住宅",
          },
          {
            value: "公寓",
            label: "公寓",
          },
          {
            value: "别墅",
            label: "别墅",
          },
          {
            value: "写字楼",
            label: "写字楼",
          },
          {
            value: "商住两用",
            label: "商住两用",
          },
          {
            value: "其他",
            label: "其他",
          },
        ]}
      />
    </Form.Item>
  );
}

export function TagsFormItem() {
  return (
    <Form.Item label="标签" name="tag">
      <Select
        placeholder="标签"
        defaultValue={[]}
        onChange={() => {}}
        mode="multiple"
        style={{ minWidth: 360 }}
        options={[
          {
            value: "品质小区",
            label: "品质小区",
          },
          {
            value: "随时看房",
            label: "随时看房",
          },
          {
            value: "学区",
            label: "学区",
          },
          {
            value: "近公园",
            label: "近公园",
          },
          {
            value: "复式",
            label: "复式",
          },
          {
            value: "跃层",
            label: "跃层",
          },
          {
            value: "超大阳台",
            label: "超大阳台",
          },
          {
            value: "7日上",
            label: "7日上",
          },
          {
            value: "满二年",
            label: "满二年",
          },
          {
            value: "满五年",
            label: "满五年",
          },
          {
            value: "绿化率高",
            label: "绿化率高",
          },
          {
            value: "交通便利",
            label: "交通便利",
          },
          {
            value: "繁华地段",
            label: "繁华地段",
          },
          {
            value: "周边配套齐全",
            label: "周边配套齐全",
          },
          {
            value: "配套成熟",
            label: "配套成熟",
          },
        ]}
      />
    </Form.Item>
  );
}
