import { ProColumnType } from "@ant-design/pro-components";
import { Button, Flex, Space } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import useImagePhoto from "../components/ImagePhoto";
import { House } from "../model/House";
import { Community } from "../model/Community";
import { SecondHandHousing } from "../model/second_hand_housing";
import { area_options } from "./house_columns";
import { SecondRentalHouse } from "../model/rental_house";
import { useGetCommunityNames } from "../api/Community";

interface IHouse {
  house: House;
  residential: Community;
  house_second_hand?: SecondHandHousing;
  rental_house?: SecondRentalHouse;
}

export function houseAddressColumn<T extends IHouse>(): ProColumnType<T> {
  return {
    title: "地址",
    dataIndex: "house_address",
    render(_, item) {
      return (
        <Space>
          <span>{item.residential.region}</span>
          <span>{item.house.community_name}</span>
          <span>{item.house.house_address}</span>
        </Space>
      );
    },
  };
}

export function houseTypeColumn<T extends IHouse>(): ProColumnType<T> {
  return {
    title: "户型",
    dataIndex: "bedrooms",
    render(_, item) {
      return (
        <Space>
          <span>{item.house.bedrooms}室</span>
          <span>{item.house.living_rooms}厅</span>
          <span>{item.house.living_rooms}卫</span>
        </Space>
      );
    },
  };
}

export function CommunityColumn<T extends IHouse>(): ProColumnType<T> {
  const { data } = useGetCommunityNames();

  return {
    title: "小区",
    dataIndex: "community_name",
    hideInTable: true,
    valueType: "select",
    fieldProps: {
      options: (data?.data ?? []).map((community_name) => {
        return {
          value: community_name,
          label: community_name,
        };
      }),
    },
  };
}

export function houseAreaColumn<T extends IHouse>(): ProColumnType<T> {
  return {
    title: "面积",
    dataIndex: "area",
    valueType: "select",
    fieldProps: {
      options: area_options,
    },
    render(_, item) {
      return `${item.house.area} 平方米`;
    },
  };
}

export function houseImageColumn<T extends IHouse>(): ProColumnType<T> {
  return {
    title: "房屋图片",
    dataIndex: "house_image",
    hideInSearch: true,
    render(_, item) {
      return <PhotoView images={item.house.house_image?.split(",")} />;
    },
  };
}

function PhotoView({ images = [] as string[] }) {
  const { openPhotoView, imagePhotoNode } = useImagePhoto();
  return (
    <Button
      icon={<FileImageOutlined />}
      type="link"
      size="small"
      onClick={() => openPhotoView(images)}
    >
      {imagePhotoNode}
    </Button>
  );
}
