use serde::{Deserialize, Serialize};
use sqlx::types::{time::OffsetDateTime, BigDecimal};

#[derive(Debug)]
pub struct MyDateTime(OffsetDateTime);

// 为新类型实现 Serialize trait
impl Serialize for MyDateTime {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_i64(self.0.unix_timestamp())
    }
}

impl<'de> Deserialize<'de> for MyDateTime {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let timestamp = i64::deserialize(deserializer)?;
        OffsetDateTime::from_unix_timestamp(timestamp)
            .map(MyDateTime)
            .map_err(serde::de::Error::custom)
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, Default)]
pub struct SecondHandHousingQueryDto {
    /// 更新时间
    pub updated_at: Option<OffsetDateTime>,

    /// 删除时间
    pub deleted_at: Option<OffsetDateTime>,

    /// 是否删除
    pub deleted: Option<i8>,

    /// 是否已卖出
    pub sold: Option<i8>,

    /// 是否下架
    pub off: Option<i8>,

    /// 业主名字
    pub name: Option<String>,

    /// 电话
    pub phone: Option<String>,

    /// 地址
    pub address: Option<String>,

    /// 经度
    pub longitude: Option<BigDecimal>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 纬度
    pub latitude: Option<BigDecimal>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 区域
    pub region: Option<String>,

    /// 售价
    pub price: Option<BigDecimal>,

    /// 最低价
    pub low_price: Option<BigDecimal>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 几室
    pub room: Option<i16>,

    /// 几卫
    pub bath: Option<i16>,

    /// 几厅
    pub hall: Option<i16>,

    /// 面积
    pub area: Option<BigDecimal>,

    /// 楼层
    pub floor: Option<i16>,

    /// 产权
    pub property: Option<String>,

    /// 装修
    pub decoration: Option<String>,

    /// 年代
    pub age: Option<String>,

    /// 是否有电梯
    pub elevator: Option<i8>,

    /// 是否有车位
    pub parking: Option<i8>,

    /// 朝向
    pub direction: Option<String>,

    /// 物业类型
    pub property_type: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 备注评论
    pub comment: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 图片地址
    pub image_data: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 封面图片地址
    pub cover_image_url: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 标签
    pub tag: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 录入经纪人
    pub broker: Option<String>,

    // 分页
    pub page_index: i64,
    pub page_size: i64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SecondHandHousingInsertDto {
    /// 业主名字
    pub name: String,

    /// 电话
    pub phone: String,

    /// 地址
    pub address: String,

    /// 经度
    pub longitude: Option<f64>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 纬度
    pub latitude: Option<f64>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 区域
    pub region: String,

    /// 售价
    pub price: f64,

    /// 最低价
    pub low_price: Option<f64>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 几室
    pub room: i16,

    /// 几卫
    pub bath: i16,

    /// 几厅
    pub hall: i16,

    /// 面积
    pub area: f64,

    /// 楼层
    pub floor: i16,

    /// 产权
    pub property: String,

    /// 装修
    pub decoration: String,

    /// 年代
    pub age: String,

    /// 是否有电梯
    pub elevator: bool,

    /// 是否有车位
    pub parking: bool,

    /// 朝向
    pub direction: String,

    /// 物业类型
    pub property_type: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 备注评论
    pub comment: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 图片地址
    pub image_data: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 封面图片地址
    pub cover_image_url: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 标签
    pub tag: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 录入经纪人
    pub broker: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SecondHandHousingUpdateDto {
    /// 主键
    pub id: u64,

    /// 业主名字
    pub name: Option<String>,

    /// 电话
    pub phone: Option<String>,

    /// 地址
    pub address: Option<String>,

    /// 经度
    pub longitude: Option<f64>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 纬度
    pub latitude: Option<f64>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 区域
    pub region: Option<String>,

    /// 售价
    pub price: Option<f64>,

    /// 最低价
    pub low_price: Option<f64>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 几室
    pub room: Option<i16>,

    /// 几卫
    pub bath: Option<i16>,

    /// 几厅
    pub hall: Option<i16>,

    /// 面积
    pub area: Option<f64>,

    /// 楼层
    pub floor: Option<i16>,

    /// 产权
    pub property: Option<String>,

    /// 装修
    pub decoration: Option<String>,

    /// 年代
    pub age: Option<String>,

    /// 是否有电梯
    pub elevator: Option<bool>,

    /// 是否有车位
    pub parking: Option<bool>,

    /// 朝向
    pub direction: Option<String>,

    /// 物业类型
    pub property_type: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 备注评论
    pub comment: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 图片地址
    pub image_data: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 封面图片地址
    pub cover_image_url: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 标签
    pub tag: Option<String>, // 使用 Option<String> 来处理可能的 NULL 值

    /// 录入经纪人
    pub broker: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum SecondHandHousingSaveDto {
    Insert(SecondHandHousingInsertDto),
    Update(SecondHandHousingUpdateDto),
}
