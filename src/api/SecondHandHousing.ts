import axios from "axios";
import { SecondHandHousing } from "../model/SecondHandHousing";

export interface QuerySecondHandHousing {
  /// 更新时间
  updated_at?: number;

  /// 删除时间
  deleted_at?: number;

  /// 是否删除
  deleted?: number;

  /// 是否已卖出
  sold?: number;

  /// 是否下架
  off?: number;

  /// 业主名字
  name?: string;

  /// 电话
  phone?: string;

  /// 地址
  address?: string;

  /// 经度
  longitude?: number; // 使用 Option<number> 来处理可能的 NULL 值

  /// 纬度
  latitude?: number; // 使用 Option<number> 来处理可能的 NULL 值

  /// 区域
  region?: string;

  /// 售价
  price?: number;

  /// 最低价
  low_price?: number; // 使用 Option<number> 来处理可能的 NULL 值

  /// 几室
  room?: number;

  /// 几卫
  bath?: number;

  /// 几厅
  hall?: number;

  /// 面积
  area?: number;

  /// 楼层
  floor?: number;

  /// 产权
  property?: string;

  /// 装修
  decoration?: string;

  /// 年代
  age?: string;

  /// 是否有电梯
  elevator?: number;

  /// 是否有车位
  parking?: number;

  /// 朝向
  direction?: string;

  /// 物业类型
  property_type?: string; // 使用 Option<string> 来处理可能的 NULL 值

  /// 备注评论
  comment?: string; // 使用 Option<string> 来处理可能的 NULL 值

  /// 图片地址
  image_data?: string; // 使用 Option<string> 来处理可能的 NULL 值

  /// 封面图片地址
  cover_image_url?: string; // 使用 Option<string> 来处理可能的 NULL 值

  /// 标签
  tag?: string; // 使用 Option<string> 来处理可能的 NULL 值

  /// 录入经纪人
  broker?: string;

  // 分页
  page_index: number;
  page_size: number;
}

export async function list(query: QuerySecondHandHousing) {
  const res = await axios.get<{ total: number; data: SecondHandHousing[] }>(
    "/api/second_hand_housing/list",
    {
      params: query,
    }
  );
  return res.data;
}

export async function save(data: {
  Insert?: Omit<SecondHandHousing, "id">;
  Update?: Partial<SecondHandHousing> & { id: number };
}) {
  const res = await axios.post("/api/second_hand_housing/save", data);
  return res.data;
}

export async function deleteSecondHandHousing(id: number) {
  const res = await axios.post(`/api/second_hand_housing/delete/${id}`);
  return res.data;
}
