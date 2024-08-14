import { Dayjs } from "dayjs";

export interface SecondRentalHouse {
  // 二手房信息
  house_id: string;
  rent_pice: string;
  rent_low_price?: string;
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

export interface SecondRentalHouseResponse {
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
  rental_house: {
    house_id: string;
    rent_pice: string;
    rent_low_pice?: string;
    listed?: number;
    listed_time?: number;
    unlisted_time?: number;
  };
}

export interface SoldRentalHouseResponse {
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
