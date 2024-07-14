-- Add migration script here

CREATE TABLE second_hand_housing (
  id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '主键',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  deleted_at TIMESTAMP COMMENT '删除时间',
  deleted BOOLEAN NOT NULL DEFAULT FALSE COMMENT '是否删除',
  sold BOOLEAN NOT NULL DEFAULT FALSE COMMENT '已卖出',
  off BOOLEAN NOT NULL DEFAULT FALSE COMMENT '下架',
  name VARCHAR(100) NOT NULL COMMENT '业主名字',  -- Reduced length assuming names typically are shorter
  phone VARCHAR(15) NOT NULL COMMENT '电话',
  address VARCHAR(255) NOT NULL COMMENT '地址',
  longitude DECIMAL(9, 6) COMMENT '经度',  -- Reduced to DECIMAL(9, 6) which is precise enough for most applications
  latitude DECIMAL(9, 6) COMMENT '纬度',  -- Reduced to DECIMAL(9, 6)
  region VARCHAR(100) NOT NULL COMMENT '区域',  -- Reduced length assuming regions typically have shorter names
  price DECIMAL(12, 2) NOT NULL COMMENT '售价',
  low_price DECIMAL(12, 2) COMMENT '最低价',
  room SMALLINT NOT NULL COMMENT '几室',  -- Changed TINYINT to SMALLINT for consistency
  bath SMALLINT NOT NULL COMMENT '几卫',  -- Changed TINYINT to SMALLINT for consistency
  hall SMALLINT NOT NULL COMMENT '几厅',  -- Changed TINYINT to SMALLINT for consistency
  area DECIMAL(10, 2) NOT NULL COMMENT '面积',
  floor SMALLINT NOT NULL COMMENT '楼层',
  property VARCHAR(100) NOT NULL COMMENT '产权',  -- Reduced length assuming property types typically are shorter
  decoration VARCHAR(100) NOT NULL COMMENT '装修',  -- Reduced length assuming decoration types typically are shorter
  age VARCHAR(100) NOT NULL COMMENT '年代',
  elevator BOOLEAN NOT NULL DEFAULT FALSE COMMENT '电梯',
  parking BOOLEAN NOT NULL DEFAULT FALSE COMMENT '车位',
  direction VARCHAR(50) NOT NULL COMMENT '朝向',  -- Reduced length assuming directions typically are shorter
  property_type VARCHAR(100) COMMENT '物业类型',  -- Reduced length assuming property types typically are shorter
  comment TEXT COMMENT '备注评论',
  image_data TEXT COMMENT '图片地址',
  cover_image_url VARCHAR(255) COMMENT '封面图片地址',
  tag TEXT COMMENT '标签',
  broker VARCHAR(100) NOT NULL COMMENT '录入经纪人'  -- Reduced length assuming broker names typically are shorter
);
