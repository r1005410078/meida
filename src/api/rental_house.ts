import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  SecondRentalHouseFrom,
  SecondRentalHouseResponse,
} from "../model/rental_house";

export function useGetRentalHouseList() {
  return useQuery(["RentalHouseList"], async () => {
    let res = await axios.get<SecondRentalHouseResponse[]>(
      "/api/v1/rental_house/list"
    );
    return res.data.map(convertToSecondRentalHouse);
  });
}

export function useListed() {
  const client = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return axios.post("/api/v1/rental_house/listed", {
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
      return axios.post("/api/v1/rental_house/unlisted", {
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

export function useGetRentalHouseByHouseId(house_id?: string) {
  return useQuery(
    ["RentalHouseByHouseId"],
    async () => {
      let res = await axios.get<SecondRentalHouseResponse>(
        `/api/v1/rental_house/${house_id}`
      );
      return convertToSecondRentalHouse(res.data);
    },
    {
      enabled: !!house_id,
    }
  );
}

export function useRentalHouseSave() {
  const client = useQueryClient();
  return useMutation(
    (data: SecondRentalHouseFrom) => {
      return axios.post("/api/v1/rental_house/save", data);
    },
    {
      onSuccess: () => {
        client.refetchQueries(["RentalHouseList"]);
      },
    }
  );
}

function convertToSecondRentalHouse(item: SecondRentalHouseResponse) {
  return {
    // 二手房信息
    house_id: item.rental_house.house_id,
    rent_pice: item.rental_house.rent_pice,
    rent_low_price: item.rental_house.rent_low_price,
    listed: item.rental_house.listed,
    listed_time: item.rental_house.listed_time,
    unlisted_time: item.rental_house.unlisted_time,
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
