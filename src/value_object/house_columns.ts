import { ProColumns } from "@ant-design/pro-components";
import { Community } from "../model/Community";
import { House } from "../model/House";
import { useGetCommunityNames } from "../api/community";
import dayjs from "dayjs";

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
];

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
];

// 建立年限
export const year_built = [
  {
    value: {
      start: dayjs().subtract(2, "year").unix(),
      end: Date.now(),
    },
    label: "2年以内",
  },
  {
    value: {
      start: dayjs().subtract(5, "year").unix(),
      end: dayjs().subtract(2, "year").unix(),
    },
    label: "2-5年",
  },
  {
    value: "5-10",
    label: "5-10年",
    start: dayjs().subtract(10, "year").unix(),
    end: dayjs().subtract(5, "year").unix(),
  },
  {
    value: "10-20",
    label: "10-20年",
    start: dayjs().subtract(20, "year").unix(),
    end: dayjs().subtract(10, "year").unix(),
  },
  {
    value: "20以上",
    label: "20年以上",
    start: dayjs().subtract(100, "year").unix(),
    end: dayjs().subtract(20, "year").unix(),
  },
];

// 价格
export const price = [
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
];

// 户型
const bedrooms = [
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
];

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

export const tag = [
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
  const community = useCommunityColumns();
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
      fieldProps: {
        options: house_property,
      },
      render: (_, record) => {
        return `${dayjs(record.house_age).year()}年`;
      },
    },
  ];

  return columns.concat(community as any);
}

export function useSecondHandHouseColumns() {
  const community = useCommunityColumns();
  const house = useHouseColumns();
  const columns: ProColumns<any>[] = [
    {
      title: "姓名",
      dataIndex: "owner_name",
    },
    {
      title: "价格",
      dataIndex: "price",
      valueType: "select",
      fieldProps: {
        options: price,
      },
    },
    {
      title: "最低价格",
      dataIndex: "low_price",
      hideInSearch: true,
    },
    {
      title: "标签",
      dataIndex: "tag",
      valueType: "select",
      fieldProps: {
        options: tag,
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
      title: "姓名",
      dataIndex: "owner_name",
    },
    {
      title: "价格",
      dataIndex: "rent_pice",
      valueType: "select",
      fieldProps: {
        options: price,
      },
    },
    {
      title: "最低价格",
      dataIndex: "low_rent_price",
      hideInSearch: true,
    },
    {
      title: "标签",
      dataIndex: "tag",
      valueType: "select",
      fieldProps: {
        options: tag,
      },
    },
  ];

  return columns.concat(house).concat(community);
}
