import { Community } from "./Community";
import { House } from "./House";

export interface SecondHandHousing {
  // 字符串唯一标识
  house_id: string;
  // 小区
  community_name: string;
  // 售价
  pice: string;
  // 出售底价
  low_pice?: string;
  // 是否上架 0 为下架 1 为上架
  listed?: number;
  // 二手房上架时间
  listed_time?: number;
  // 二手房下架时间
  unlisted_time?: number;
  // 评论
  comment: string;
  // 标签
  tags: string;
  // '首付' 记录首付金额，精度为两位小数
  down_payment: number;
  // '看房方式' 记录看房的方式（如预约、随时可看等）
  viewing_method: string;
  // '付款方式' 记录付款方式（如一次性付款、按揭贷款等）
  payment_method: string;
  // '房源税费' 记录房源涉及的税费，精度为两位小数
  taxes_and_fees: number;
  //  '是否全款'  标识是否必须全款，0 为否，1 为是
  full_payment_required: boolean;
  // '是否急切' 标识是否急切出售，0 为否，1 为是
  urgent_sale: boolean;
}

export interface SecondHandHousingResponse {
  house: House;
  residential: Community;
  house_second_hand: SecondHandHousing;
}

export interface SecondHandHousingFrom {
  house_id: string;
  pice: string;
  low_price?: string;
  listed?: number;
  comment: string;
  tags: string[];
}

export interface SoldSecondHandHousingResponse {
  house: House;
  residential: Community;
  house_second_hand: {
    sold_id: number;
    house_id: string;
    community_name: string;
    days_to_sell: number;
    sold_price: string;
    sold_time: string;
    created_at: string;
    updated_at: string;
  };
}

export interface SoldSecondHandHouse {
  house_id: string;
  sale_price: number;
}
