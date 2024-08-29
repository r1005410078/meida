import { message } from "antd";
import { request } from "./api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TableData } from "../value_object/common";
import { User, UserFrom } from "../model/user";

export function useAuthorization() {
  return useQuery(["getAuthorization"], () => {
    return Promise.resolve({ token: undefined });
  });
}

export function useIsLogin() {
  return localStorage.getItem("token") ? true : false;
}

export function useGetUser(isLogin: boolean) {
  return useQuery(
    ["getUser"],
    async () => {
      const res = await request.get<User>("/api/v1/auth/get_user");
      return res.data;
    },
    {
      enabled: isLogin,
    }
  );
}

export function useLogin() {
  return useMutation(
    async (data: { username: string; password: string }) => {
      const res = await request.post<string>("/api/v1/auth/login", data);
      return res.data;
    },
    {
      onSuccess() {
        message.success("登录成功");
      },
      onError(err: any) {
        message.error(err.response.data);
      },
    }
  );
}

export function useRegisterUser() {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: UserFrom) => {
      const res = await request.post<UserFrom>("/api/v1/users/register", data);
      return res.data;
    },
    {
      onSuccess() {
        message.success("注册成功");
        queryClient.invalidateQueries(["usersList"]);
      },
      onError(err: any) {
        message.error(err.response.data);
      },
    }
  );
}

export interface GetUsersParams {
  username?: string;
  phone?: string;
  role?: string;
  is_active?: boolean;
  page_index: number;
  page_size: number;
}

export function useUsersList(data: GetUsersParams) {
  return useQuery(["usersList", data], async () => {
    const res = await request.post<TableData<User>>("/api/v1/users/list", data);
    return res.data;
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation(
    async (user_id: string) => {
      const res = await request.post(`/api/v1/users/delete/${user_id}`);
      return res.data;
    },
    {
      onSuccess() {
        message.success("删除成功");
        queryClient.invalidateQueries(["usersList"]);
      },
      onError(err: any) {
        message.error(err.response.data);
      },
    }
  );
}
