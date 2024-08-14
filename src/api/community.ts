import { useMutation, useQuery, useQueryClient } from "react-query";
import { Community, CommunityFrom } from "../model/community";
import axios from "axios";

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
    return axios.get<Community[]>("/api/v1/residential/list", {
      params,
    });
  });
}

export function useGetCommunityNames() {
  return useQuery(
    ["GetCommunityNames"],
    () => {
      return axios.get<String[]>("/api/v1/residential/get_community_names");
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
      return axios.post("/api/v1/residential/delete", {
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
      return axios.get<Community>(
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
      return axios.post("/api/v1/residential/save", {
        ...data,
        region: data.region?.toString(),
      });
    },
    {
      onSuccess: () => {},
    }
  );
}
