import { ProColumns } from "@ant-design/pro-components";
import { Community } from "../model/Community";
import { House } from "../model/House";
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
export const orientation_options = [
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
export const property_type = [
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
    value: "免税",
    label: "免税",
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
      title: "住宅区类型",
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
    {
      title: "城市",
      dataIndex: "city",
      hideInSearch: true,
    },
    {
      title: "省份",
      dataIndex: "state",
      hideInSearch: true,
    },
    {
      title: "邮政编码",
      dataIndex: "postal_code",
      hideInSearch: true,
    },
    {
      title: "物业管理公司",
      dataIndex: "property_management_company",
      hideInSearch: true,
    },
    {
      title: "描述",
      dataIndex: "description",
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      hideInSearch: true,
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      hideInSearch: true,
    },
  ];
}

export function useHouseColumns() {
  const columns: ProColumns<House>[] = [
    {
      title: "小区名称",
      dataIndex: "community_name",
    },
    {
      title: "房屋地址",
      dataIndex: "house_address",
    },
    {
      title: "产权",
      dataIndex: "property",
    },
    {
      title: "房屋装修情况",
      dataIndex: "decoration_status",
    },
    {
      title: "建筑面积",
      dataIndex: "area",
    },
    {
      title: "卧室数量",
      dataIndex: "bedrooms",
    },
    {
      title: "客厅数量",
      dataIndex: "living_rooms",
    },
    {
      title: "卫生间数量",
      dataIndex: "bathrooms",
    },
    {
      title: "房屋朝向",
      dataIndex: "orientation",
    },
    {
      title: "房屋描述",
      dataIndex: "house_description",
    },
    {
      title: "房屋图片",
      dataIndex: "house_image",
    },
    {
      title: "业主姓名",
      dataIndex: "owner_name",
    },
    {
      title: "业主联系方式",
      dataIndex: "owner_phone",
    },
    {
      title: "创建人",
      dataIndex: "created_by",
    },
    {
      title: "更新人",
      dataIndex: "updated_by",
    },
    {
      title: "楼层",
      dataIndex: "floor",
    },
    {
      title: "总楼层",
      dataIndex: "floor_range",
    },
    {
      title: "房源标题",
      dataIndex: "title",
      hideInSearch: true,
    },
    {
      title: "推荐标签",
      dataIndex: "recommended_tags",
      hideInSearch: true,
    },
    {
      title: "梯",
      dataIndex: "elevator",
      hideInSearch: true,
    },
    {
      title: "阳台",
      dataIndex: "balcony",
      hideInSearch: true,
    },
    {
      title: "kitchen",
      dataIndex: "厨房",
      hideInSearch: true,
    },
    {
      title: "建筑结构",
      dataIndex: "building_structure",
      hideInSearch: true,
    },
    {
      title: "建筑年代",
      dataIndex: "building_year",
      hideInSearch: true,
    },
    {
      title: "产权性质",
      dataIndex: "property_rights",
      hideInSearch: true,
    },
    {
      title: "产权年限",
      dataIndex: "property_duration",
      hideInSearch: true,
    },
    {
      title: "产权日期",
      dataIndex: "property_date",
      hideInSearch: true,
    },
    {
      title: "学位",
      dataIndex: "school_qualification",
      hideInSearch: true,
    },
    {
      title: "户口",
      dataIndex: "household_registration",
      hideInSearch: true,
    },
    {
      title: "唯一住房",
      dataIndex: "unique_house",
      hideInSearch: true,
    },
    {
      title: "配套",
      dataIndex: "facilities",
      hideInSearch: true,
    },
    {
      title: "使用面积",
      dataIndex: "facilities",
      hideInSearch: true,
    },
    {
      title: "配套",
      dataIndex: "usable_area",
      hideInSearch: true,
    },
    {
      title: "现状",
      dataIndex: "current_status",
      hideInSearch: true,
    },
    {
      title: "房屋类型",
      dataIndex: "house_type",
      hideInSearch: true,
    },
    {
      title: "来源",
      dataIndex: "source",
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      hideInSearch: true,
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      hideInSearch: true,
    },
  ];

  return columns;
}

export function useSecondHandHouseColumns() {
  const columns: ProColumns<any>[] = [
    {
      title: "售价",
      dataIndex: "pice",
      valueType: "select",
      fieldProps: {
        options: price,
      },
      render: (_, item) => {
        if (item.pice) {
          return `${item.pice} 万元`;
        }
        return "--";
      },
    },
    {
      title: "出售低价",
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
    {
      title: "小区名称",
      dataIndex: "community_name",
    },
    {
      title: "是否上架",
      dataIndex: "listed",
    },
    {
      title: "上架时间",
      dataIndex: "listed_time",
    },
    {
      title: "下架时间",
      dataIndex: "unlisted_time",
    },
    {
      title: "评论",
      dataIndex: "comment",
    },
    {
      title: "首付",
      dataIndex: "down_payment",
    },
    {
      title: "看房方式",
      dataIndex: "viewing_method",
    },
    {
      title: "付款方式",
      dataIndex: "payment_method",
    },
    {
      title: "房源税费",
      dataIndex: "taxes_and_fees",
    },
    {
      title: "是否全款",
      dataIndex: "full_payment_required",
    },
    {
      title: "是否急切",
      dataIndex: "urgent_sale",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
    },
  ];

  return columns;
}

export function useRentalHouseColumns() {
  const columns: ProColumns<any>[] = [
    {
      title: "租金",
      dataIndex: "rent_pice",
      valueType: "select",
      fieldProps: {
        options: rent_pice,
      },
    },
    {
      title: "出租低价",
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
    {
      title: "是否上架",
      dataIndex: "listed",
    },
    {
      title: "上架时间",
      dataIndex: "listed_time",
    },
    {
      title: "下架时间",
      dataIndex: "unlisted_time",
    },
    {
      title: "评论",
      dataIndex: "comment",
    },
    {
      title: "看房方式",
      dataIndex: "viewing_method",
    },
    {
      title: "付款方式",
      dataIndex: "payment_method",
    },
    {
      title: "是否全款",
      dataIndex: "full_payment_required",
    },
    {
      title: "是否急切",
      dataIndex: "urgent_sale",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
    },
  ];

  return columns;
}

// 看房方式
export const viewing_method = [
  {
    value: "提前预约",
    label: "提前预约",
  },
  {
    value: "直接带看",
    label: "直接带看",
  },
  {
    value: "借钥匙带看",
    label: "借钥匙带看",
  },
];

// payment_method
export const payment_method = [
  {
    value: "一次性付款",
    label: "一次性付款",
  },
  {
    value: "分期付款",
    label: "分期付款",
  },
  {
    value: "先付押金，再付款",
    label: "先付押金，再付款",
  },
  {
    value: "银行按揭贷款",
    label: "银行按揭贷款",
  },
];

// 标识是否必须全款，0 为否，1 为是
export const full_payment_required = [
  {
    value: true,
    label: "是",
  },
  {
    value: false,
    label: "否",
  },
];

// 标识是否急切出售，0 为否，1 为是
export const urgent_sale = [
  {
    value: true,
    label: "是",
  },
  {
    value: false,
    label: "否",
  },
];

export const usage_options = [
  {
    value: 1,
    label: "住宅",
  },
  {
    value: 2,
    label: "别墅",
    disabled: true,
  },
  {
    value: 3,
    label: "公寓",
    disabled: true,
  },
  {
    value: 4,
    label: "车位",
    disabled: true,
  },
  {
    value: 5,
    label: "写字楼",
    disabled: true,
  },
  {
    value: 6,
    label: "商品",
    disabled: true,
  },
  {
    value: 7,
    label: "厂房",
    disabled: true,
  },
  {
    value: 8,
    label: "仓库",
    disabled: true,
  },
  {
    value: 9,
    label: "土地",
    disabled: true,
  },
  {
    value: 10,
    label: "垂直楼",
    disabled: true,
  },
];

export const pice_type_options = [
  {
    value: 1,
    label: "出售",
  },
  {
    value: 2,
    label: "出租",
  },
  {
    value: 3,
    label: "租售",
  },
];

export const rental_status_options = [
  {
    value: 1,
    label: "有效",
  },
  {
    value: 2,
    label: "暂缓",
  },
  {
    value: 3,
    label: "未知",
  },
  {
    value: 4,
    label: "他租",
  },
];

// 建筑结构
export const building_structure_options = [
  {
    value: "砖木结构",
    label: "砖木结构",
  },
  {
    value: "砖混结构",
    label: "砖混结构",
  },
  {
    value: "钢筋混凝土",
    label: "钢筋混凝土",
  },
  {
    value: "钢结构",
    label: "钢结构",
  },
  {
    value: "塔楼",
    label: "塔楼",
  },
  {
    value: "板楼",
    label: "板楼",
  },
  {
    value: "塔板结合",
    label: "塔板结合",
  },
];

// 产权性质
export const property_rights_options = [
  {
    value: "商品房",
    label: "商品房",
  },
  {
    value: "公产房",
    label: "公产房",
  },
  {
    value: "私产房",
    label: "私产房",
  },
  {
    value: "房改房",
    label: "房改房",
  },
  {
    value: "企业房",
    label: "企业房",
  },
  {
    value: "军业房",
    label: "军业房",
  },
  {
    value: "安置房",
    label: "安置房",
  },
  {
    value: "小产房",
    label: "小产房",
  },
];

// 学位
export const school_qualification_options = new Array(50)
  .fill(0)
  .map((_, index) => {
    return {
      value: `${2018 + index}`,
      label: `${2018 + index}`,
    };
  });

// 户口
export const household_registration_options = [
  {
    value: "集体户口可买",
    label: "集体户口可买",
  },
  {
    value: "业主可协助过户",
    label: "业主可协助过户",
  },
];

// 配套
export const facilities_options = [
  {
    value: "床",
    label: "床",
  },
  {
    value: "衣柜",
    label: "衣柜",
  },
  {
    value: "书桌",
    label: "书桌",
  },
  {
    value: "空调",
    label: "空调",
  },
  {
    value: "冰箱",
    label: "冰箱",
  },
  {
    value: "电视",
    label: "电视",
  },
  {
    value: "洗衣机",
    label: "洗衣机",
  },
  {
    value: "宽带",
    label: "宽带",
  },
  {
    value: "WIFI",
    label: "WIFI",
  },
  {
    value: "油烟机",
    label: "油烟机",
  },
  {
    value: "灶具",
    label: "灶具",
  },
  {
    value: "热水器",
    label: "热水器",
  },
  {
    value: "电脑",
    label: "电脑",
  },
];

// 现状
export const current_status_options = [
  {
    value: "空置",
    label: "空置",
  },
  {
    value: "在用",
    label: "在用",
  },
  {
    value: "全新",
    label: "全新",
  },
];

// 房屋类型
export const house_type_options = [
  {
    value: "底层",
    label: "底层",
  },
  {
    value: "多层",
    label: "多层",
  },
  {
    value: "小高层",
    label: "小高层",
  },
  {
    value: "高层",
    label: "高层",
  },
  {
    value: "洋房",
    label: "洋房",
  },
  {
    value: "跃层式住宅",
    label: "跃层式住宅",
  },
  {
    value: "复式住宅",
    label: "复式住宅",
  },
  {
    value: "公寓式住宅",
    label: "公寓式住宅",
  },
  {
    value: "普通住宅",
    label: "普通住宅",
  },
  {
    value: "高端住宅",
    label: "高端住宅",
  },
  {
    value: "LOFT",
    label: "LOFT",
  },
  {
    value: "别墅",
    label: "别墅",
  },
  {
    value: "老式里弄",
    label: "老式里弄",
  },
  {
    value: "老式公寓",
    label: "老式公寓",
  },
];

// 来源
export const source_options = [
  {
    value: "上门",
    label: "上门",
  },
  {
    value: "电话",
    label: "电话",
  },
  {
    value: "陌拜",
    label: "陌拜",
  },
  {
    value: "驻守",
    label: "驻守",
  },
  {
    value: "窗体公告",
    label: "窗体公告",
  },
  {
    value: "驻守",
    label: "驻守",
  },
  {
    value: "搜房",
    label: "搜房",
  },
  {
    value: "新浪乐居",
    label: "新浪乐居",
  },
  {
    value: "58",
    label: "58",
  },
  {
    value: "赶集",
    label: "赶集",
  },
  {
    value: "已成交客户推荐",
    label: "已成交客户推荐",
  },
  {
    value: "未成交客户推荐",
    label: "未成交客户推荐",
  },
  {
    value: "公司网站",
    label: "公司网站",
  },
  {
    value: "朋友介绍",
    label: "朋友介绍",
  },
  {
    value: "老客户",
    label: "老客户",
  },
  {
    value: "派单",
    label: "派单",
  },
  {
    value: "微信公众账号",
    label: "微信公众账号",
  },
  {
    value: "拍卖交易网站",
    label: "拍卖交易网站",
  },
];
