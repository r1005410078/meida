import { request } from "./api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  RentalHouseFrom,
  SecondRentalHouseResponse,
  SoldRentalHouseBody,
  SoldRentalHouseResponse,
} from "../model/rental_house";
import { TableData } from "../value_object/common";
import { HouseParams } from "./house";
import { QueryCommunityParams } from "./community";
import { floor } from "lodash";

export interface GetListListedParams extends HouseParams, QueryCommunityParams {
  listed?: 0 | 1;
  rent_pice?: number;
  page_index: number;
  page_size: number;
}

export function useGetRentalHouseList(data: GetListListedParams) {
  return useQuery(
    ["RentalHouseList", data],
    async () => {
      let res = await request.post<TableData<SecondRentalHouseResponse>>(
        "/api/v1/rental_house/list",
        data
      );
      return {
        data: res.data.data.map(convertToSecondRentalHouse),
        total: res.data.total,
      };
    },
    {
      onError(err) {
        console.log(err);
      },
    }
  );
}

export function useGetRentalHouseByHouseId(house_id?: string) {
  return useQuery(
    ["RentalHouseByHouseId"],
    async () => {
      let res = await request.get<SecondRentalHouseResponse>(
        `/api/v1/rental_house/detail/${house_id}`
      );
      return convertToSecondRentalHouse(res.data);
    },
    {
      enabled: !!house_id,
    }
  );
}

export function useListed() {
  const client = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return request.post("/api/v1/rental_house/listed", {
        house_id,
      });
    },
    {
      onSuccess: () => {
        client.refetchQueries(["RentalHouseList"]);
      },
    }
  );
}

export function useUnListed() {
  const client = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return request.post("/api/v1/rental_house/unlisted", {
        house_id,
      });
    },
    {
      onSuccess: () => {
        client.refetchQueries(["RentalHouseList"]);
      },
    }
  );
}

export interface GetRentalHouseSoldParams {
  page_index: number;
  page_size: number;
}

// 已经租出的房源
export function useGetRentalHouseListSold(params: GetRentalHouseSoldParams) {
  return useQuery(
    ["GetRentalHouseSoldList"],
    async () => {
      let res = await request.get<TableData<SoldRentalHouseResponse>>(
        "/api/v1/rental_house/list_sold",
        {
          params,
        }
      );
      return {
        data: res.data.data.map(convertToSoldSecondRentalHouse),
        total: res.data.total,
      };
    },
    {
      onError(err) {
        console.log(err);
      },
    }
  );
}

export function useRentalHouseSave() {
  const client = useQueryClient();
  return useMutation(
    (data: RentalHouseFrom) => {
      return request.post("/api/v1/rental_house/save", data);
    },
    {
      onSuccess: () => {
        client.refetchQueries(["RentalHouseList"]);
      },
    }
  );
}

// 租出
export function useSold() {
  const client = useQueryClient();
  return useMutation(
    (data: SoldRentalHouseBody) => {
      return request.post("/api/v1/rental_house/sold", data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          client.refetchQueries(["RentalHouseList"]);
        }, 300);
      },
    }
  );
}

function convertToSecondRentalHouse(item: SecondRentalHouseResponse) {
  return {
    // 租房信息
    house_id: item.rental_house.house_id,
    rent_pice: item.rental_house.rent_pice,
    rent_low_pice: item.rental_house.rent_low_pice,
    listed: item.rental_house.listed,
    listed_time: item.rental_house.listed_time,
    unlisted_time: item.rental_house.unlisted_time,
    comment: item.rental_house.comment,
    tags: item.rental_house.tags.split(","),

    // 房源信息
    house_address: item.house.house_address,
    house_type: item.house.house_type,
    floor: item.house.floor,
    area: item.house.area,
    bedrooms: item.house.bedrooms,
    living_rooms: item.house.living_rooms,
    bathrooms: item.house.bathrooms,
    orientation: item.house.orientation,
    decoration_status: item.house.decoration_status,
    status: item.house.status,
    house_description: item.house.house_description,
    house_image: item.house.house_image,
    owner_name: item.house.owner_name,
    owner_phone: item.house.owner_phone,
    created_by: item.house.created_by,
    updated_by: item.house.updated_by,
    // 小区信息
    community_name: item.residential.community_name,
    region: item.residential.region,
    city: item.residential.city,
    state: item.residential.state,
    postal_code: item.residential.postal_code,
    year_built: item.residential.year_built,
    community_type: item.residential.community_type,
    property_management_company: item.residential.property_management_company,
    description: item.residential.description,
  };
}

function convertToSoldSecondRentalHouse(item: SoldRentalHouseResponse) {
  return {
    // 二手房信息
    house_id: item.rental_house.house_id,
    rent_pice: item.rental_house.rent_pice,
    rent_start_time: item.rental_house.rent_start_time,
    rent_end_time: item.rental_house.rent_end_time,
    // 房源信息
    house_address: item.house.house_address,
    house_type: item.house.house_type,
    area: item.house.area,
    bedrooms: item.house.bedrooms,
    living_rooms: item.house.living_rooms,
    bathrooms: item.house.bathrooms,
    orientation: item.house.orientation,
    decoration_status: item.house.decoration_status,
    status: item.house.status,
    house_description: item.house.house_description,
    house_image: item.house.house_image,
    owner_name: item.house.owner_name,
    owner_phone: item.house.owner_phone,
    created_by: item.house.created_by,
    updated_by: item.house.updated_by,
    // 小区信息
    community_name: item.residential.community_name,
    region: item.residential.region,
    city: item.residential.city,
    state: item.residential.state,
    postal_code: item.residential.postal_code,
    year_built: item.residential.year_built,
    community_type: item.residential.community_type,
    property_management_company: item.residential.property_management_company,
    description: item.residential.description,
  };
}

function convertToSoldRentalHouse(item: SoldRentalHouseResponse) {
  return {
    // 出租房信息
    sold_id: item.rental_house.sold_id,
    house_id: item.rental_house.house_id,
    rent_pice: item.rental_house.rent_pice,
    rent_low_pice: item.rental_house.rent_low_pice,
    rent_start_time: item.rental_house.rent_start_time,
    rent_end_time: item.rental_house.rent_end_time,

    // 房源信息
    house_address: item.house.house_address,
    house_type: item.house.house_type,
    area: item.house.area,
    bedrooms: item.house.bedrooms,
    living_rooms: item.house.living_rooms,
    bathrooms: item.house.bathrooms,
    orientation: item.house.orientation,
    decoration_status: item.house.decoration_status,
    status: item.house.status,
    house_description: item.house.house_description,
    house_image: item.house.house_image,
    owner_name: item.house.owner_name,
    owner_phone: item.house.owner_phone,
    created_by: item.house.created_by,
    updated_by: item.house.updated_by,
    // 小区信息
    community_name: item.residential.community_name,
    region: item.residential.region,
    city: item.residential.city,
    state: item.residential.state,
    postal_code: item.residential.postal_code,
    year_built: item.residential.year_built,
    community_type: item.residential.community_type,
    property_management_company: item.residential.property_management_company,
    description: item.residential.description,
  };
}
