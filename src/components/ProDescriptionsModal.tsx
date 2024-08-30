import {
  ProDescriptions,
  ProDescriptionsItemProps,
} from "@ant-design/pro-components";
import { Drawer } from "antd";
import { useState } from "react";

interface ProDescriptionsModalProps {
  title: string;
  columns: ProDescriptionsItemProps<any, any>[];
  width?: number;
}

export function useProDescriptionsModal({
  title,
  columns,
  width,
}: ProDescriptionsModalProps) {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState<Record<string, any>>();

  const proDescriptionsModalNode = (
    <Drawer
      open={open}
      title={title}
      width={width ?? 1000}
      footer={null}
      destroyOnClose
      closable={false}
      onClose={() => {
        setOpen(false);
      }}
    >
      <ProDescriptions
        dataSource={dataSource}
        emptyText={"--"}
        columns={columns}
      ></ProDescriptions>
    </Drawer>
  );

  return {
    proDescriptionsModalNode,
    openProDescriptionsModal(data: Record<string, any>) {
      setOpen(true);
      setDataSource(data);
    },
  };
}
