use serde::{Deserialize, Serialize};
use serde_with::serde_as;
use serde_with::TimestampMilliSeconds;
use sqlx::{
    prelude::FromRow,
    types::{time::OffsetDateTime, BigDecimal},
};

#[serde_as]
#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct SecondHandHousing {
    /// 主键
    pub id: u64,

    /// 创建时间
    #[serde_as(as = "Option<TimestampMilliSeconds>")]
    pub created_at: Option<OffsetDateTime>,

    /// 更新时间
    #[serde_as(as = "Option<TimestampMilliSeconds>")]
    pub updated_at: Option<OffsetDateTime>,

    /// 删除时间
    #[serde_as(as = "Option<TimestampMilliSeconds>")]
    pub deleted_at: Option<OffsetDateTime>,

    /// 是否删除
    pub deleted: i8,

    /// 是否已卖出
    pub sold: i8,

    /// 是否下架
    pub off: i8,

    /// 业主名字
    pub name: String,

    /// 电话
    pub phone: String,

    /// 地址
    pub address: String,

    /// 经度
    pub longitude: Option<BigDecimal>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 纬度
    pub latitude: Option<BigDecimal>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 区域
    pub region: String,

    /// 售价
    pub price: BigDecimal,

    /// 最低价
    pub low_price: Option<BigDecimal>, // 使用 Option<f64> 来处理可能的 NULL 值

    /// 几室
    pub room: i16,

    /// 几卫
    pub bath: i16,

    /// 几厅
    pub hall: i16,

    /// 面积
    pub area: BigDecimal,

    /// 楼层
    pub floor: i16,

    /// 产权
    pub property: String,

    /// 装修
    pub decoration: String,

    /// 年代
    pub age: String,

    /// 是否有电梯
    pub elevator: i8,

    /// 是否有车位
    pub parking: i8,

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
