import React, { useMemo, useState } from "react";
import "./FanyList.less";
import { SecondHandHousing } from "./SecondHandHousing";
import { Button, Result, Segmented } from "antd";

interface FanyListProps {}

enum FangyType {
  SecondHandHousing = "二手房",
  Renting = "租房",
  NewHouse = "新房",
}

const FanyList: React.FC<FanyListProps> = () => {
  const [fangyType, setFangyType] = useState(FangyType.SecondHandHousing);

  const secondHandHousingNode = useMemo(() => {
    switch (fangyType) {
      case FangyType.SecondHandHousing:
        return <SecondHandHousing />;
      case FangyType.Renting:
        return (
          <div>
            <Result
              status="404"
              title="租房正在开发中"
              subTitle="Sorry, something went wrong."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
        );
      case FangyType.NewHouse:
        return (
          <div>
            <Result
              status="404"
              title="新房正在开发中"
              subTitle="Sorry, something went wrong."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
        );
    }
  }, [fangyType]);

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "16px 0",
          justifyContent: "flex-end",
        }}
      >
        <Segmented
          size="large"
          onChange={(value) => {
            setFangyType(value);
          }}
          options={[
            FangyType.SecondHandHousing,
            FangyType.Renting,
            FangyType.NewHouse,
          ]}
        />
      </div>
      {secondHandHousingNode}
    </>
  );
};

export default FanyList;
