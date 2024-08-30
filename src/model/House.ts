import { UploadFile } from "antd";
import dayjs from "dayjs";

export interface House {
  house_id: string;
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
  house_description: string;
  house_image: string;
  owner_name: string;
  owner_phone: string;
  created_by: string;
  updated_by: string;

  // -- 新增
  title: string;
  status: string;
  recommended_tags: string;
  elevator?: number;
  household?: number;
  balcony?: number;
  kitchen?: number;
  building_structure?: string;
  property_rights?: string;
  building_year?: string;
  property_duration?: string;
  property_date?: string;
  delivery_date?: string;
  school_qualification?: string;
  household_registration?: string;
  unique_house?: boolean;
  facilities?: string[];
  usable_area: number;
  current_status?: string;
  house_type?: string;
  source?: string;
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
