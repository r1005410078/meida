import { useMutation, useQuery, useQueryClient } from "react-query";
import { Community, CommunityFrom } from "../model/community";
import { request } from "./api";
import { message, notification } from "antd";

export interface QueryCommunityParams {
  community_name?: string;
  region?: string;
  community_type?: string;
  year_built?: {
    start: number;
    end: number;
  };
  description?: string;
  updated_at?: {
    start: number;
    end: number;
  };
}

export function useCommunityList(params: QueryCommunityParams) {
  return useQuery(["CommunityList", params], () => {
    return request.get<Community[]>("/api/v1/residential/list", {
      params,
    });
  });
}

export function useGetCommunityNames() {
  return useQuery(
    ["GetCommunityNames"],
    () => {
      return request.get<String[]>("/api/v1/residential/get_community_names");
    },
    {
      keepPreviousData: true,
    }
  );
}

export function useDeleteCommunity() {
  const client = useQueryClient();
  return useMutation(
    (community_name: string) => {
      return request.post("/api/v1/residential/delete", {
        community_name,
      });
    },
    {
      onSuccess: () => {
        client.refetchQueries(["CommunityList"]);
      },
    }
  );
}

export function useCommunityByName(name?: string) {
  return useQuery(
    ["getCommunity", name],
    () => {
      return request.get<Community>(
        `/api/v1/residential/get_residential/${name}`
      );
    },
    {
      enabled: !!name,
    }
  );
}

export function useSaveCommunity() {
  return useMutation(
    (data: Omit<CommunityFrom, "id">) => {
      return request.post("/api/v1/residential/save", {
        ...data,
        region: data.region?.toString(),
      });
    },
    {
      onSuccess: () => {},
      onError: (err: any) => {
        notification.error({
          message: "系统错误，请联系管理员！",
          description: err.message,
        });
      },
    }
  );
}
