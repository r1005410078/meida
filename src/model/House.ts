import { UploadFile } from "antd";
import dayjs from "dayjs";
import { Community } from "./Community";

export interface House {
  // 房屋编号
  house_id: string;
  // 小区名称
  community_name: string;
  // 房屋地址
  house_address: string;
  // 产权
  property: string;
  // 房屋装修情况
  decoration_status: string;
  // 建筑面积
  area: number;
  // 卧室数量
  bedrooms: number;
  // 客厅数量
  living_rooms: number;
  // 卫生间数量
  bathrooms: number;
  // 房屋朝向
  orientation: string;
  // 房屋描述
  house_description: string;
  // 房屋图片
  house_image: string;
  // 业主姓名
  owner_name: string;
  // 业主联系方式
  owner_phone: string;
  // 创建人
  created_by: string;
  // 更新人
  updated_by: string;
  // 楼层
  floor: string;
  // 总楼层
  floor_range: string;

  // -- 新增
  title: string;

  // 梯
  recommended_tags: string;
  // 梯
  elevator?: number;
  // 户
  household?: number;
  // 阳台
  balcony?: number;
  // 厨房
  kitchen?: number;
  // 建筑结构
  building_structure?: string;
  // 建筑年代
  building_year?: string;
  // 产权性质
  property_rights?: string;
  // 产权年限
  property_duration?: string;
  // 产权日期
  property_date?: string;
  // 交房日期
  delivery_date?: string;
  // 学位
  school_qualification?: string;
  // 户口
  household_registration?: string;
  // 唯一住房
  unique_house?: boolean;
  // 配套
  facilities?: string[];
  // 使用面积
  usable_area: number;
  // 现状
  current_status?: string;
  // 房屋类型
  house_type?: string;
  // 来源
  source?: string;
  // 推荐标签
  status: string;
}

export interface HouseFrom {
  house_id?: string;
  community_name: string;
  house_address: string;
  floor: string;
  property: string;
  house_age: dayjs.Dayjs;
  area: number;
  bedrooms: number;
  living_rooms: number;
  bathrooms: number;
  orientation: string;
  decoration_status: string;
  house_image?: UploadFile[];
  owner_name: string;
  owner_phone: string;
  house_description?: string;
  // -- 新增
  title: string;
  recommended_tags: string;
  elevator?: number;
  household?: number;
  balcony?: number;
  kitchen?: number;
  building_structure?: string;
  property_rights?: string;
  building_year?: dayjs.Dayjs;
  property_duration?: dayjs.Dayjs;
  property_date?: dayjs.Dayjs;
  delivery_date?: dayjs.Dayjs;
  school_qualification?: string;
  household_registration?: string;
  unique_house?: boolean;
  facilities?: string[];
  usable_area: number;
  current_status?: string;
  house_type?: string;
  source?: string;
}

// 组合
export interface HouseUnion {
  house?: House;
  community?: Community;
}
