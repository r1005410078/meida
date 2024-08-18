import { message } from "antd";
import { request } from "./api";
import { useMutation, useQuery } from "react-query";

export function useAuthorization() {
  return useQuery(["getAuthorization"], () => {
    return Promise.resolve({ token: undefined });
  });
}

export function useIsLogin() {
  return localStorage.getItem("token") ? true : false;
}

export function useLogin() {
  return useMutation(async (data: { username: string; password: string }) => {
    try {
      const res = await request.post<string>("/api/v1/users/login", data);
      return res.data;
    } catch (error: any) {
      message.error(error.response.data);
    }
  });
}
