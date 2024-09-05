import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "./api";
import { message } from "antd";

export interface ImportsPropertiesParams {
  page_index: number;
  page_size: number;
}

export function useGetImportsProperties(params: ImportsPropertiesParams) {
  return useQuery(
    ["/imports/list/properties", params],
    async () => {
      const res = await request.get("/api/v1/imports/list/properties", {
        params,
      });
      return res.data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );
}

export function useAsyncImportsList() {
  const client = useQueryClient();

  return useMutation(
    async () => {
      const res = await request.post("/api/v1/imports/sync/properties", {});
      return res.data;
    },
    {
      onSuccess() {
        message.success("同步成功");
        client.refetchQueries(["/imports/list/properties"]);
      },
      onError(err: any) {
        message.error(err.response.data);
      },
    }
  );
}

export function useDeleteImportsList() {
  const client = useQueryClient();

  return useMutation(
    async (ids: string[]) => {
      const res = await request.post("/api/v1/imports/delete/properties", ids);
      return res.data;
    },
    {
      onSuccess() {
        message.success("删除成功");
        client.refetchQueries(["/imports/list/properties"]);
      },
      onError(err: any) {
        message.error(err.response.data);
      },
    }
  );
}
