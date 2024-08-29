export interface SecondHandHousing {
  // 二手房信息
  house_id: string;
  pice: string;
  low_price?: string;
  listed?: number;
  listed_time?: number;
  unlisted_time?: number;
  comment: string;
  tags: string;
  // 房源信息
  house_address: string;
  house_type: string;
  area: string;
  bedrooms: number;
  living_rooms: number;
  bathrooms: number;
  orientation: string;
  decoration_status: string;
  status: string;
  house_description: string;
  house_image: string;
  owner_name: string;
  owner_phone: string;
  created_by: string;
  updated_by: string;
  // 小区信息
  community_name: string;
  region: string;
  city: string;
  state: string;
  postal_code: string;
  year_built: number;
  community_type: string;
  property_management_company: string;
  description: string;
}

export interface SecondHandHousingResponse {
  house: {
    house_id: string;
    community_name: string;
    house_address: string;
    house_type: string;
    area: string;
    floor: number;
    bedrooms: number;
    property: string;
    living_rooms: number;
    bathrooms: number;
    orientation: string;
    decoration_status: string;
    status: string;
    house_description: string;
    house_image: string;
    owner_name: string;
    owner_phone: string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
  };
  residential: {
    community_name: string;
    region: string;
    city: string;
    state: string;
    postal_code: string;
    year_built: number;
    community_type: string;
    property_management_company: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
  house_second_hand: {
    house_id: string;
    community_name: string;
    pice: string;
    low_pice?: string;
    listed: number;
    listed_time: string;
    unlisted_time: string;
    comment: string;
    tags: string;
    created_at: string;
    updated_at: string;
  };
}

export interface SecondHandHousingFrom {
  house_id: string;
  pice: string;
  low_price?: string;
  listed?: number;
  comment: string;
  tags: string[];
  // 新增
  down_payment: number; // '首付' 记录首付金额，精度为两位小数
  viewing_method: string; // '看房方式' 记录看房的方式（如预约、随时可看等）
  payment_method: string; // '付款方式' 记录付款方式（如一次性付款、按揭贷款等）
  taxes_and_fees: number; // '房源税费' 记录房源涉及的税费，精度为两位小数
  full_payment_required: boolean; //  '是否全款'  标识是否必须全款，0 为否，1 为是
  urgent_sale: boolean; // '是否急切' 标识是否急切出售，0 为否，1 为是
}

export interface SoldSecondHandHousingResponse {
  house: {
    house_id: string;
    community_name: string;
    house_address: string;
    house_type: string;
    area: string;
    floor: number;
    bedrooms: number;
    living_rooms: number;
    bathrooms: number;
    orientation: string;
    decoration_status: string;
    status: string;
    house_description: string;
    house_image: string;
    owner_name: string;
    owner_phone: string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
  };
  residential: {
    community_name: string;
    region: string;
    city: string;
    state: string;
    postal_code: string;
    year_built: number;
    community_type: string;
    property_management_company: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
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
