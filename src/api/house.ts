import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { House, HouseFrom } from "../model/House";
import { useDebounceFn } from "@ant-design/pro-components";
import { TableData } from "../value_object/common";
import dayjs from "dayjs";
import omitBy from "lodash/omitBy";
import { request } from "./api";
import { message } from "antd";
import { useGetUser } from "./users";

export interface HouseParams {
  page_index: number;
  page_size: number;
  community_name?: string;
  house_address?: string;
  property?: string;
  area?: number;
  bedrooms?: number;
  floor?: number;
  living_rooms?: number;
  bathrooms?: number;
  orientation?: string;
  decoration_status?: string;
  status?: string;
  house_description?: string;
  owner_name?: string;
  owner_phone?: string;
}

export function useHouseList(data: HouseParams) {
  return useQuery(["houseList", data], () => {
    return request.post<TableData<House>>(
      "/api/v1/house/list",
      omitBy(data, (value) => value === "")
    );
  });
}

export function useDeleteHouse() {
  let queryClient = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return request.post(`/api/v1/house/delete`, {
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
      const result = await request.get<House>(`/api/v1/house/get_house/${id}`);

      result.data = convertToHouse(result.data);
      return result;
    },
    {
      enabled: !!id,
    }
  );
}

export function useSaveHouse() {
  const user = useGetUser();

  return useMutation(
    (data: Omit<HouseFrom, "id">) => {
      return request.post<{ house_id: string }>("/api/v1/house/save", {
        ...data,
        facilities: data.facilities?.join(","),
        building_year: data.building_year?.format("YYYY-MM-DD"),
        property_duration: data.property_date?.year(),
        property_date: data.property_date?.format("YYYY-MM-DD"),
        delivery_date: data.delivery_date?.format("YYYY-MM-DD"),
        created_by: data.house_id ? undefined : user.data?.username,
        updated_by: user.data?.username,
      });
    },
    {
      onSuccess: () => {
        message.success("住宅保存成功");
      },
    }
  );
}

// 根据户主名称查询
export function useHouseListByOwnerName(ownerName?: string) {
  let { run } = useDebounceFn(async () => {
    const result = await request.get<House[]>(
      `/api/v1/house/list_by_owner_name/${ownerName}`
    );

    result.data = result.data.map(convertToHouse);

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

function convertToHouse(item: any) {
  if (item.building_year) {
    item.building_year = dayjs(item.building_year);
  }
  if (item.property_duration) {
    item.property_duration = dayjs(item.property_duration);
  }
  if (item.property_date) {
    item.property_date = dayjs(item.property_date);
  }
  if (item.delivery_date) {
    item.delivery_date = dayjs(item.delivery_date);
  }

  if (item.facilities) {
    item.facilities = item.facilities.split(",");
  }

  return item;
}
