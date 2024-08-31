import {
  ProDescriptions,
  ProDescriptionsItemProps,
} from "@ant-design/pro-components";
import { Divider, Drawer } from "antd";
import { useState } from "react";
import {
  useCommunityColumns,
  useHouseColumns,
} from "../value_object/house_columns";
import { HouseUnion } from "../model/House";

interface ProDescriptionsModalProps {
  title: string;
  columns?: ProDescriptionsItemProps<any, any>[];
  width?: number;
}

interface HouseSoldDescription extends HouseUnion {
  columns_data?: Record<string, any>;
}

export function useProDescriptionsModal({
  title,
  columns,
  width,
}: ProDescriptionsModalProps) {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<HouseSoldDescription>();

  const communityColumns = useCommunityColumns();
  const houseColumns = useHouseColumns();

  const proDescriptionsModalNode = (
    <Drawer
      open={open}
      title="详情"
      width={width ?? 1000}
      footer={null}
      destroyOnClose
      onClose={() => {
        setOpen(false);
      }}
    >
      {record?.columns_data ? (
        <>
          <ProDescriptions
            dataSource={record?.columns_data}
            emptyText={"--"}
            title={title}
            columns={columns}
          />
          <Divider />
        </>
      ) : null}

      {record?.house ? (
        <>
          <ProDescriptions
            dataSource={record?.house}
            emptyText={"--"}
            title="住宅"
            columns={houseColumns as any}
          />
          <Divider />
        </>
      ) : null}

      {record?.residential ? (
        <ProDescriptions
          dataSource={record?.residential}
          emptyText={"--"}
          title="小区"
          columns={communityColumns as any}
        ></ProDescriptions>
      ) : null}
    </Drawer>
  );

  return {
    proDescriptionsModalNode,
    openProDescriptionsModal(data: HouseSoldDescription) {
      setOpen(true);
      setRecord(data);
    },
  };
}
