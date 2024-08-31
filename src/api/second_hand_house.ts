import { request } from "./api";
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
import { message } from "antd";

// 保存二手房
export function useSecondHandHouseSave() {
  return useMutation(
    (data: SecondHandHousingFrom) => {
      return request.post("/api/v1/second_hand_house/save", data);
    },
    {
      onSuccess() {
        message.success("出售住宅保存成功");
      },
    }
  );
}

// 上架
export function useListed() {
  const client = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return request.post("/api/v1/second_hand_house/listed", {
        house_id,
      });
    },
    {
      onSuccess: () => {
        client.removeQueries(["listListed"]);
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
    const res = await request.post<TableData<SecondHandHousingResponse>>(
      "/api/v1/second_hand_house/list_listed",
      data
    );

    return {
      data: res.data?.data,
      total: res.data.total,
      getItemByHouseId(houseId: string) {
        return res.data.data.find((item) => item.house.house_id === houseId);
      },
    };
  });
}

// 下架
export function useUnListed() {
  const client = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return request.post("/api/v1/second_hand_house/unlisted", {
        house_id,
      });
    },
    {
      onSuccess: () => {
        client.removeQueries(["listListed"]);
      },
    }
  );
}

// 卖出
export function useSold() {
  const client = useQueryClient();
  return useMutation(
    (data: SoldSecondHandHouse) => {
      return request.post("/api/v1/second_hand_house/sold", data);
    },
    {
      onSuccess: () => {
        client.removeQueries(["listListed"]);
      },
    }
  );
}

// 删除
export function useDeleteSecondHandHouse() {
  const client = useQueryClient();
  return useMutation(
    (house_id: string) => {
      return request.post("/api/v1/second_hand_house/delete", { house_id });
    },
    {
      onSuccess: () => {
        client.removeQueries(["listListed"]);
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
  return useQuery(["list_sold", params], async () => {
    const res = await request.get<TableData<SoldSecondHandHousingResponse>>(
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
      const res = await request.get<SecondHandHousingResponse>(
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
    // 新增
    down_payment: item.house_second_hand.down_payment, // '首付' 记录首付金额，精度为两位小数
    viewing_method: item.house_second_hand.viewing_method, // '看房方式' 记录看房的方式（如预约、随时可看等）
    payment_method: item.house_second_hand.payment_method, // '付款方式' 记录付款方式（如一次性付款、按揭贷款等）
    taxes_and_fees: item.house_second_hand.taxes_and_fees, // '房源税费' 记录房源涉及的税费，精度为两位小数
    full_payment_required: item.house_second_hand.full_payment_required, //  '是否全款'  标识是否必须全款，0 为否，1 为是
    urgent_sale: item.house_second_hand.urgent_sale, // '是否急切' 标识是否急切出售，0 为否，1 为是

    // 房源信息
    house_address: item.house.house_address,
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

    // -- 新增
    title: item.house.title,
    recommended_tags: item.house.recommended_tags,
    elevator: item.house.elevator,
    household: item.house.household,
    balcony: item.house.balcony,
    kitchen: item.house.kitchen,
    building_structure: item.house.building_structure,
    property_rights: item.house.property_rights,
    building_year: item.house.building_year,
    property_duration: item.house.property_duration,
    property_date: item.house.property_date,
    delivery_date: item.house.delivery_date,
    school_qualification: item.house.school_qualification,
    household_registration: item.house.household_registration,
    unique_house: item.house.unique_house,
    facilities: item.house.facilities,
    usable_area: item.house.usable_area,
    current_status: item.house.current_status,
    house_type: item.house.house_type,
    source: item.house.source,

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
