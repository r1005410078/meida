import { ProColumns } from "@ant-design/pro-components";
import { Community } from "../model/community";
import { House } from "../model/house";
import { useGetCommunityNames } from "../api/community";
import dayjs from "dayjs";
import { Tag } from "antd";

// 区域
export const region = [
  "迎江区",
  "大观区",
  "宜秀区",
  "怀宁县",
  "潜山县",
  "太湖县",
  "宿松县",
  "望江县",
  "岳西县",
  "桐城市",
].map((item) => ({ label: item, value: item }));

// 面积
export const area = [
  {
    value: {
      end: 70,
    },
    label: "70以下",
  },
  {
    value: {
      start: 70,
      end: 80,
    },
    label: "70-80",
  },
  {
    value: {
      start: 80,
      end: 90,
    },
    label: "80-90",
  },
  {
    value: {
      start: 90,
      end: 100,
    },
    label: "90-100",
  },
  {
    value: {
      start: 100,
      end: 110,
    },
    label: "100-110",
  },
  {
    value: {
      start: 110,
      end: 120,
    },
    label: "110-120",
  },
  {
    value: {
      start: 120,
      end: 130,
    },
    label: "120-130",
  },
  {
    value: {
      start: 130,
      end: 140,
    },
    label: "130-140",
  },
  {
    value: {
      start: 140,
      end: 150,
    },
    label: "140-150",
  },
  {
    value: {
      start: 150,
    },
    label: "150以上",
  },
].map(({ label, value }) => {
  return {
    label,
    value: JSON.stringify(value),
  };
});

// 朝向
export const orientation = [
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
];

// 楼层
export const floor = [
  {
    value: {
      start: 1,
      end: 3,
    },
    label: "1-3层",
  },
  {
    value: {
      start: 3,
      end: 5,
    },
    label: "3-5层",
  },
  {
    value: {
      start: 5,
      end: 10,
    },
    label: "5-10层",
  },
  {
    value: {
      start: 10,
    },
    label: "10以上",
  },
].map(({ label, value }) => {
  return {
    label,
    value: JSON.stringify(value),
  };
});

// 建立年限
export const year_built = [
  {
    value: JSON.stringify({
      start: dayjs().subtract(2, "year").unix(),
      end: Date.now(),
    }),
    label: "2年以内",
  },
  {
    value: JSON.stringify({
      start: dayjs().subtract(5, "year").unix(),
      end: dayjs().subtract(2, "year").unix(),
    }),
    label: "2-5年",
  },
  {
    value: JSON.stringify({
      start: dayjs().subtract(10, "year").unix(),
      end: dayjs().subtract(5, "year").unix(),
    }),
    label: "5-10年",
  },
  {
    value: JSON.stringify({
      start: dayjs().subtract(20, "year").unix(),
      end: dayjs().subtract(10, "year").unix(),
    }),
    label: "10-20年",
  },
  {
    value: JSON.stringify({
      start: dayjs().subtract(100, "year").unix(),
      end: dayjs().subtract(20, "year").unix(),
    }),
    label: "20年以上",
  },
];

// 价格
export const price = [
  {
    value: {
      start: 0,
      end: 20,
    },
    label: "20万以下",
  },
  {
    value: {
      start: 20,
      end: 30,
    },
    label: "20-30万",
  },
  {
    value: {
      start: 30,
      end: 40,
    },
    label: "30-40万",
  },
  {
    value: {
      start: 40,
      end: 50,
    },
    label: "40-50万",
  },
  {
    value: {
      start: 50,
      end: 60,
    },
    label: "50-60万",
  },
  {
    value: {
      start: 60,
      end: 70,
    },
    label: "60-70万",
  },
  {
    value: {
      start: 70,
      end: 80,
    },
    label: "70-80万",
  },
  {
    value: {
      start: 80,
      end: 90,
    },
    label: "80-90万",
  },
  {
    value: {
      start: 90,
      end: 100,
    },
    label: "90-100万",
  },
  {
    value: {
      start: 100,
      end: 110,
    },
    label: "100-110万",
  },
  {
    value: {
      start: 110,
      end: 120,
    },
    label: "110-120万",
  },
  {
    value: {
      start: 120,
      end: 130,
    },
    label: "120-130万",
  },
  {
    value: {
      start: 130,
      end: 140,
    },
    label: "130-140万",
  },
  {
    value: {
      start: 140,
      end: 150,
    },
    label: "140-150万",
  },
  {
    value: {
      start: 150,
    },
    label: "150万以上",
  },
].map((item) => {
  return { ...item, value: JSON.stringify(item.value) };
});

export const rent_pice = [
  {
    value: {
      start: 0,
      end: 500,
    },
    label: "500元以下",
  },
  {
    value: {
      start: 500,
      end: 1000,
    },
    label: "500-1000元",
  },
  {
    value: {
      start: 1000,
      end: 1500,
    },
    label: "1000-1500元",
  },
  {
    value: {
      start: 1500,
      end: 2000,
    },
    label: "1500-2000元",
  },
  {
    value: {
      start: 2000,
      end: 2500,
    },
    label: "2000-2500元",
  },
  {
    value: {
      start: 2500,
      end: 3000,
    },
    label: "2500-3000元",
  },
  {
    value: {
      start: 3000,
      end: 3500,
    },
    label: "3000-3500元",
  },
  {
    value: {
      start: 3500,
      end: 4000,
    },
    label: "3500-4000元",
  },
  {
    value: {
      start: 4000,
      end: 4500,
    },
    label: "4000-4500元",
  },
  {
    value: {
      start: 4500,
      end: 5000,
    },
    label: "4500-5000元",
  },
  {
    value: {
      end: 5000,
    },
    label: "5000以上",
  },
].map((item) => {
  return { ...item, value: JSON.stringify(item.value) };
});

// 户型
const bedrooms = [
  {
    value: {
      start: 1,
      end: 1,
    },
    label: "一室",
  },
  {
    value: {
      start: 2,
      end: 2,
    },
    label: "二室",
  },
  {
    value: {
      start: 3,
      end: 3,
    },
    label: "三室",
  },
  {
    value: {
      start: 4,
      end: 4,
    },
    label: "四室",
  },
  {
    value: {
      start: 5,
      end: 5,
    },
    label: "五室",
  },
  {
    value: {
      start: 5,
    },
    label: "五室以上",
  },
].map((item) => {
  return { ...item, value: JSON.stringify(item.value) };
});

// 装修
export const decoration = [
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
];

// 物业管理
const property_type = [
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
];

export const house_tags = [
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
];

export const house_property = [
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
];

export function useCommunityColumns(): ProColumns<Community>[] {
  let { data } = useGetCommunityNames();
  return [
    {
      title: "区域",
      dataIndex: "region",
      valueType: "select",
      fieldProps: {
        options: region,
      },
    },
    {
      title: "小区名称",
      dataIndex: "community_name",
      valueType: "select",
      fieldProps: {
        options: data?.data.map((name) => {
          return {
            value: name,
            label: name,
          };
        }),
      },
    },
    {
      title: "建立年份",
      dataIndex: "year_built",
      valueType: "select",
      hideInSearch: true,
      fieldProps: {
        options: year_built,
      },
    },
    {
      title: "物业类型",
      dataIndex: "community_type",
      valueType: "select",
      fieldProps: {
        options: property_type,
      },
    },
    {
      title: "小区描述",
      dataIndex: "description",
      hideInSearch: true,
    },
  ];
}

export function useHouseColumns() {
  const columns: ProColumns<House>[] = [
    {
      title: "姓名",
      dataIndex: "owner_name",
    },
    {
      title: "联系方式",
      dataIndex: "owner_phone",
      hideInSearch: true,
      valueType: "select",
    },
    {
      title: "房屋地址",
      dataIndex: "house_address",
    },
    {
      title: "装修",
      dataIndex: "decoration_status",
      valueType: "select",
      fieldProps: {
        options: decoration,
      },
    },
    {
      title: "面积 m²",
      dataIndex: "area",
      valueType: "select",
      fieldProps: {
        options: area,
      },
    },
    {
      title: "房屋朝向",
      dataIndex: "orientation",
      valueType: "select",
      fieldProps: {
        options: orientation,
      },
    },
    {
      title: "房间数",
      dataIndex: "bedrooms",
      valueType: "select",
      fieldProps: {
        options: bedrooms,
      },
    },
    {
      title: "楼层",
      dataIndex: "floor",
      valueType: "select",
      fieldProps: {
        options: floor,
      },
    },
    {
      title: "产权",
      dataIndex: "property",
      valueType: "select",
      fieldProps: {
        options: house_property,
      },
    },
    {
      title: "房龄",
      dataIndex: "house_age",
      valueType: "select",
      fieldProps: {
        options: year_built,
      },
      render: (_, record) => {
        return `${dayjs(record.house_age).year()}年`;
      },
    },
  ];

  return columns;
}

export function useSecondHandHouseColumns() {
  const community = useCommunityColumns();
  const house = useHouseColumns();
  const columns: ProColumns<any>[] = [
    {
      title: "价格",
      dataIndex: "pice",
      valueType: "select",
      fieldProps: {
        options: price,
      },
      render: (_, item) => {
        return `${item.pice} 万元`;
      },
    },
    {
      title: "最低价格",
      dataIndex: "low_pice",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      // TODO
      hideInSearch: true,
      fieldProps: {
        options: house_tags,
      },
      render: (_, item) => {
        return (
          <div>
            {item.tags?.map((tag: string) => (
              <Tag color="green" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        );
      },
    },
  ];

  return columns.concat(house).concat(community);
}

export function useRentalHouseColumns() {
  const community = useCommunityColumns();
  const house = useHouseColumns();
  const columns: ProColumns<any>[] = [
    {
      title: "价格",
      dataIndex: "rent_pice",
      valueType: "select",
      fieldProps: {
        options: rent_pice,
      },
    },
    {
      title: "最低价格",
      dataIndex: "rent_low_pice",
      hideInSearch: true,
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      hideInSearch: true,
      fieldProps: {
        options: house_tags,
      },
      render: (_, item) => {
        return (
          <div>
            {item.tags?.map((tag: string) => (
              <Tag color="green" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        );
      },
    },
  ];

  return columns.concat(house).concat(community);
}
