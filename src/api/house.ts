import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { House, HouseFrom } from "../model/house";
import { useDebounceFn } from "@ant-design/pro-components";
import { TableData } from "../value_object/common";
import dayjs from "dayjs";
import omitBy from "lodash/omitBy";

export interface HouseParams {
  page_index: number;
  page_size: number;
  community_name?: string;
  house_address?: string;
  property?: string;
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
      params: omitBy(params, (value) => value === ""),
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
    async () => {
      const result = await axios.get<House>(`/api/v1/house/get_house/${id}`);
      result.data.house_age = dayjs(result.data.house_age);

      return result;
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
  let { run } = useDebounceFn(async () => {
    const result = await axios.get<House[]>(
      `/api/v1/house/list_by_owner_name/${ownerName}`
    );

    result.data = result.data.map((item) => {
      item.house_age = dayjs(item.house_age);
      return item;
    });

    return result;
  }, 300);

  return useQuery<AxiosResponse<House[]>>(
    ["houseListByOwnerName", ownerName],
    run,
    {
      enabled: !!ownerName,
    }
  );
}
