// When using the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";
import { convertFileSrc } from "@tauri-apps/api/tauri";

export interface Fangy {
  id: number;
  name: string;
  phone: string;
  address: string;
  comment?: string;
  image_url: string;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}
export interface FangyDataSource {
  data: Fangy[];
  total: number;
}

export interface ImageData {
  path: String;
  content: number[];
}

export interface UpdateFangy {
  id: string;
  name: string;
  phone: string;
  address: string;
  comment: string;
  image_data: ImageData[];
  deleted?: boolean;
}

interface QueryFany {
  keyword?: string;
  page_index: string;
  page_size: string;
}

export interface FangyPrimaryKey {
  id: number;
}

export async function query_fangy(query: QueryFany): Promise<FangyDataSource> {
  return invoke<FangyDataSource>("query_fangy", { query } as any).then(
    (result) => {
      result.data.forEach((item) => {
        item.image_url = item.image_url
          .split(",")
          .map((path) => {
            console.log("path", path);
            return convertFileSrc(path, "asset");
          })
          .join(",");
      });
      return result;
    }
  );
}

export async function insert_fangy(data: UpdateFangy) {
  return invoke("insert_fangy", { data: data } as any);
}

export async function update_fangy(data: UpdateFangy) {
  return invoke("update_fangy", { data: data } as any);
}

export async function delete_fangy(data: FangyPrimaryKey) {
  return invoke("delete_fangy", { data: data } as any);
}
