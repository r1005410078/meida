import { Dayjs } from "dayjs";
import { House } from "./House";
import { Community } from "./Community";

export interface SecondRentalHouse {
  // 租房信息
  house_id: string;
  // 小区名称
  community_name: string;
  // 租金
  rent_pice: string;
  // 出租低价
  rent_low_price?: string;
  // 是否上架 0 为下架 1 为上架
  listed?: number;
  // 出租房上架时间
  listed_time?: number;
  // 出租房下架时间
  unlisted_time?: number;
  // 评论
  comment: string;
  // 标签
  tags: string;
  // 记录看房的方式（如预约、随时可看等）
  viewing_method: string;
  // 记录付款方式（如一次性付款、按揭贷款等）
  payment_method: string;
  // 标识是否必须全款，0 为否，1 为是
  full_payment_required: string;
  // 标识是否急切出售，0 为否，1 为是
  urgent_sale: string;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
}

export interface SecondRentalHouseResponse {
  house: House;
  residential: Community;
  rental_house: SecondRentalHouse;
}

// 卖出房源
export interface SoldRentalHouseResponse {
  house: House;
  residential: Community;
  rental_house: {
    sold_id: number;
    house_id: string;
    rent_pice: number;
    rent_low_pice: number;
    rent_start_time: string;
    rent_end_time: string;
  };
}

export interface RentalHouseFrom {
  house_id: string;
  rent_pice: string;
  rent_low_pice?: string;
  comment: string;
  tags: string[];
}

type RentStartTime = Dayjs;
type RentEndTime = Dayjs;

export interface SoldRentalHouseForm {
  rent_pice: number;
  date: [RentStartTime, RentEndTime];
}

export interface SoldRentalHouseBody {
  house_id: string;
  rent_pice: number;
  rent_start_time: string;
  rent_end_time: string;
}

export interface SoldSecondHandHouse {
  house_id: string;
  sale_price: number;
}
