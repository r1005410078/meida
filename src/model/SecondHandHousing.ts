export interface SecondHandHousing {
  /// 主键
  id: number;

  /// 创建时间
  created_at: number;

  /// 更新时间
  updated_at?: number;

  /// 删除时间
  deleted_at?: number;

  /// 是否删除
  deleted: number;

  /// 是否已卖出
  sold: number;

  /// 是否下架
  off: number;

  /// 业主名字
  name: string;

  /// 联系方式
  phone: string;

  /// 地址
  address: string;

  /// 经度
  longitude?: number; // 使用 Option<f64> 来处理可能的 NULL 值

  /// 纬度
  latitude?: number; // 使用 Option<f64> 来处理可能的 NULL 值

  /// 区域
  region: string;

  /// 报价
  price: number;

  /// 最低价
  low_price?: number; // 使用 Option<f64> 来处理可能的 NULL 值

  /// 几室
  room: number;

  /// 几卫
  bath: number;

  /// 几厅
  hall: number;

  /// 面积
  area: number;

  /// 楼层
  floor: number;

  /// 产权
  property: string;

  /// 装修
  decoration: string;

  /// 年代
  age: string;

  /// 是否有电梯
  elevator: boolean;

  /// 是否有车位
  parking: boolean;

  /// 朝向
  direction: string;

  /// 物业类型
  property_type?: string;

  /// 备注评论
  comment?: string;

  /// 图片地址
  image_data?: string;

  /// 封面图片地址
  cover_image_url?: string;

  /// 标签
  tag?: string;

  /// 录入经纪人
  broker: string;
}
