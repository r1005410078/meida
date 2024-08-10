import { useMutation, useQuery, useQueryClient } from "react-query";
import { Community, CommunityFrom } from "../model/Community";
import axios from "axios";

export function useCommunityList() {
  return useQuery(["CommunityList"], () => {
    return axios.get<Community[]>("/api/v1/residential/list");
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

export function useCreateCommunity() {
  return useMutation(
    (data: Omit<CommunityFrom, "id">) => {
      return axios.post("/api/v1/residential/create", {
        ...data,
        region: data.region?.toString(),
      });
    },
    {
      onSuccess: () => {},
    }
  );
}

export function useUpdateCommunity() {
  return useMutation(
    (data: Omit<CommunityFrom, "id">) => {
      return axios.post("/api/v1/residential/update", {
        ...data,
        region: data.region?.toString(),
      });
    },
    {
      onSuccess: () => {},
    }
  );
}
