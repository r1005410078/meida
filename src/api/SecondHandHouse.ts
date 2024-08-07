import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  SecondHandHousingFrom,
  SecondHandHousingResponse,
  SoldSecondHandHouse,
  SoldSecondHandHousingResponse,
} from "../model/SecondHandHousing";

// 创建二手房
export function useSecondHandHouseCreate() {
  return useMutation((data: SecondHandHousingFrom) => {
    return axios.post("/api/v1/second_hand_house/create", data);
  });
}

// 更新二手房
export function useSecondHandHouseUpdate() {
  return useMutation((data: SecondHandHousingFrom) => {
    return axios.post("/api/v1/second_hand_house/update", data);
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

// 上架/下架 列表
export function useGetListListed() {
  return useQuery(["listListed"], async () => {
    const res = await axios.get<SecondHandHousingResponse[]>(
      "/api/v1/second_hand_house/list_listed"
    );

    return res.data.map(convertToSecondHandHousing);
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

// 卖出列表
export function useSecondHandHouseListSold() {
  return useQuery(["list_sold"], async () => {
    const res = await axios.get<SoldSecondHandHousingResponse[]>(
      "/api/v1/second_hand_house/list_sold"
    );

    return res.data.map((item) => {
      return {
        // 二手房信息
        house_id: item.house_second_hand.house_id,
        days_to_sell: item.house_second_hand.days_to_sell,
        sold_price: item.house_second_hand.sold_price,
        sold_time: item.house_second_hand.sold_time,
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
        property_management_company:
          item.residential.property_management_company,
        description: item.residential.description,
      };
    });
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
