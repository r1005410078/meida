import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { House, HouseFrom } from "../model/House";
import { useDebounceFn } from "@ant-design/pro-components";
import { TableData } from "../value_object/common";

export interface HouseParams {
  page_index: number;
  page_size: number;
  community_name?: string;
  house_address?: string;
  house_type?: string;
  area?: number;
  bedrooms?: number;
  living_rooms?: number;
  bathrooms?: number;
  orientation?: string;
  decoration_status?: string;
  status?: string;
  house_description?: string;
  owner_name?: string;
  owner_phone?: string;
}

export function useHouseList(params: HouseParams) {
  return useQuery(["houseList", params], () => {
    return axios.get<TableData<House>>("/api/v1/house/list", {
      params,
    });
  });
}

export function useDeleteHouse() {
  let queryClient = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return axios.post(`/api/v1/house/delete`, {
        house_id,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["houseList"]);
      },
    }
  );
}

export function useHouseById(id?: string) {
  return useQuery(
    ["getHouse", id],
    () => {
      return axios.get<House>(`/api/v1/house/get_house/${id}`);
    },
    {
      enabled: !!id,
    }
  );
}

export function useSaveHouse() {
  return useMutation(
    (data: Omit<HouseFrom, "id">) => {
      return axios.post<{ house_id: string }>("/api/v1/house/save", data);
    },
    {
      onSuccess: () => {},
    }
  );
}

// 根据户主名称查询
export function useHouseListByOwnerName(ownerName?: string) {
  let { run } = useDebounceFn(() => {
    return axios.get<House[]>(`/api/v1/house/list_by_owner_name/${ownerName}`);
  }, 300);

  return useQuery<AxiosResponse<House[]>>(
    ["houseListByOwnerName", ownerName],
    run,
    {
      enabled: !!ownerName,
    }
  );
}
