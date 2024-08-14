export interface SecondHandHousing {
  // 二手房信息
  house_id: string;
  pice: string;
  low_price?: string;
  listed?: number;
  listed_time?: number;
  unlisted_time?: number;
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
    created_at: string;
    updated_at: string;
  };
}

export interface SecondHandHousingFrom {
  house_id: string;
  pice: string;
  low_price?: string;
  listed?: number;
}

export interface SoldSecondHandHousingResponse {
  house: {
    house_id: string;
    community_name: string;
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
