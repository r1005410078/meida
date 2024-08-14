import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  SecondHandHousing,
  SecondHandHousingFrom,
  SecondHandHousingResponse,
  SoldSecondHandHouse,
  SoldSecondHandHousingResponse,
} from "../model/second_hand_housing";
import { TableData } from "../value_object/common";
import { HouseParams } from "./house";
import { QueryCommunityParams } from "./community";

// 创建二手房
export function useSecondHandHouseCreate() {
  return useMutation((data: SecondHandHousingFrom) => {
    return axios.post("/api/v1/second_hand_house/create", data);
  });
}

// 保存二手房
export function useSecondHandHouseSave() {
  return useMutation((data: SecondHandHousingFrom) => {
    return axios.post("/api/v1/second_hand_house/save", data);
  });
}

// 上架
export function useListed() {
  const client = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return axios.post("/api/v1/second_hand_house/listed", {
        house_id,
      });
    },
    {
      onSuccess: () => {
        client.refetchQueries(["listListed"]);
      },
    }
  );
}

export interface GetListListedParams extends HouseParams, QueryCommunityParams {
  listed?: 0 | 1;
  tags?: string;
  pice?: {
    start?: number;
    end?: number;
  };
}

// 上架/下架 列表
export function useGetListListed(data: GetListListedParams) {
  return useQuery(["listListed", data], async () => {
    const res = await axios.post<TableData<SecondHandHousingResponse>>(
      "/api/v1/second_hand_house/list_listed",
      data
    );

    return {
      data: res.data.data.map(convertToSecondHandHousing),
      total: res.data.total,
    };
  });
}

// 下架
export function useUnListed() {
  const client = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return axios.post("/api/v1/second_hand_house/unlisted", {
        house_id,
      });
    },
    {
      onSuccess: () => {
        client.refetchQueries(["listListed"]);
      },
    }
  );
}

// 卖出
export function useSold() {
  const client = useQueryClient();
  return useMutation(
    (data: SoldSecondHandHouse) => {
      return axios.post("/api/v1/second_hand_house/sold", data);
    },
    {
      onSuccess: () => {
        client.refetchQueries(["listListed"]);
      },
    }
  );
}

export interface GetSecondHandHouseSoldParams {
  page_index: number;
  page_size: number;
}

// 卖出列表
export function useSecondHandHouseListSold(
  params: GetSecondHandHouseSoldParams
) {
  return useQuery(["list_sold"], async () => {
    const res = await axios.get<TableData<SoldSecondHandHousingResponse>>(
      "/api/v1/second_hand_house/list_sold",
      {
        params,
      }
    );

    return {
      data: res.data.data.map((item) => {
        return {
          // 二手房信息
          sold_id: item.house_second_hand.sold_id,
          house_id: item.house_second_hand.house_id,
          days_to_sell: item.house_second_hand.days_to_sell,
          sold_price: item.house_second_hand.sold_price,
          sold_time: item.house_second_hand.sold_time,
          // 房源信息
          house_address: item.house.house_address,
          house_type: item.house.house_type,
          area: item.house.area,
          floor: item.house.floor,
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
          property_management_company:
            item.residential.property_management_company,
          description: item.residential.description,
        };
      }),
      total: res.data.total,
    };
  });
}

export function useGetSecondHandByHouseId(houseId?: string) {
  return useQuery(
    ["getByHouseId", houseId],
    async () => {
      const res = await axios.get<SecondHandHousingResponse>(
        `/api/v1/second_hand_house/get_by_house_id/${houseId}`
      );

      return convertToSecondHandHousing(res.data);
    },
    {
      enabled: !!houseId,
    }
  );
}

function convertToSecondHandHousing(item: SecondHandHousingResponse) {
  return {
    // 二手房信息
    house_id: item.house_second_hand.house_id,
    pice: item.house_second_hand.pice,
    low_pice: item.house_second_hand.low_pice,
    listed: item.house_second_hand.listed,
    listed_time: item.house_second_hand.listed_time,
    unlisted_time: item.house_second_hand.unlisted_time,
    comment: item.house_second_hand.comment,
    tags: item.house_second_hand.tags.split(","),

    // 房源信息
    house_address: item.house.house_address,
    house_type: item.house.house_type,
    property: item.house.property,
    area: item.house.area,
    floor: item.house.floor,
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
  } as any as SecondHandHousing;
}
