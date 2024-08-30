import { Community } from "./community";
import { House } from "./house";

export interface SecondHandHousing {
  // 二手房信息
  house_id: string;
  pice: string;
  low_pice?: string;
  listed?: number;
  listed_time?: number;
  unlisted_time?: number;
  comment: string;
  tags: string;
  // 新增
  down_payment: number; // '首付' 记录首付金额，精度为两位小数
  viewing_method: string; // '看房方式' 记录看房的方式（如预约、随时可看等）
  payment_method: string; // '付款方式' 记录付款方式（如一次性付款、按揭贷款等）
  taxes_and_fees: number; // '房源税费' 记录房源涉及的税费，精度为两位小数
  full_payment_required: boolean; //  '是否全款'  标识是否必须全款，0 为否，1 为是
  urgent_sale: boolean; // '是否急切' 标识是否急切出售，0 为否，1 为是
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
