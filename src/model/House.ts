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
}
