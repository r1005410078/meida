use anyhow::Ok;
use dto::second_hand_housing::{
    SecondHandHousingInsertDto, SecondHandHousingQueryDto, SecondHandHousingUpdateDto,
};
use model::second_hand_housing::SecondHandHousing;
use sqlx::{MySql, MySqlPool, QueryBuilder};
use std::future::Future;

pub trait SecondHandHousingQuery {
    fn query(
        &self,
        pool: &MySqlPool,
    ) -> impl Future<Output = anyhow::Result<Vec<SecondHandHousing>>>;
}

pub trait SecondHousingInsert {
    fn insert_into(&self, pool: &MySqlPool) -> impl Future<Output = anyhow::Result<bool>>;
}

pub trait SecondHousingUpdate {
    fn update(&self, pool: &MySqlPool) -> impl Future<Output = anyhow::Result<bool>>;
}

pub trait SecondHousingDelete {
    fn delete(&self, pool: &MySqlPool) -> impl Future<Output = anyhow::Result<bool>>;
}

impl SecondHandHousingQuery for SecondHandHousingQueryDto {
    async fn query(&self, pool: &MySqlPool) -> anyhow::Result<Vec<SecondHandHousing>> {
        let mut query: QueryBuilder<MySql> =
            QueryBuilder::new("SELECT * FROM second_hand_housing WHERE deleted = 0");

        if let Some(ref sold) = self.sold {
            query.push(" AND sold = ").push_bind(sold);
        }

        if let Some(ref off) = self.off {
            query.push(" AND off = ").push_bind(off);
        }

        if let Some(ref name) = self.name {
            query.push(" AND name = ").push_bind(name);
        }

        if let Some(ref phone) = self.phone {
            query.push(" AND phone = ").push_bind(phone);
        }

        if let Some(ref address) = self.address {
            query
                .push(" AND address like ")
                .push_bind(format!("%{address}%"));
        }

        if let Some(ref longitude) = self.longitude {
            query.push(" AND longitude = ").push_bind(longitude);
        }

        if let Some(ref latitude) = self.latitude {
            query.push(" AND latitude = ").push_bind(latitude);
        }

        if let Some(ref region) = self.region {
            query.push(" AND region = ").push_bind(region);
        }

        if let Some(ref price) = self.price {
            query.push(" AND price <= ").push_bind(price);
        }

        if let Some(ref low_price) = self.low_price {
            query.push(" AND low_price <= ").push_bind(low_price);
        }

        if let Some(ref room) = self.room {
            query.push(" AND room = ").push_bind(room);
        }

        if let Some(ref bath) = self.bath {
            query.push(" AND bath = ").push_bind(bath);
        }

        if let Some(ref hall) = self.hall {
            query.push(" AND hall = ").push_bind(hall);
        }

        if let Some(ref area) = self.area {
            query.push(" AND area <= ").push_bind(area);
        }

        if let Some(ref floor) = self.floor {
            query.push(" AND floor <= ").push_bind(floor);
        }

        if let Some(ref property) = self.property {
            query.push(" AND property = ").push_bind(property);
        }

        if let Some(ref decoration) = self.decoration {
            query.push(" AND decoration = ").push_bind(decoration);
        }

        if let Some(ref age) = self.age {
            query.push(" AND age = ").push_bind(age);
        }

        if let Some(ref elevator) = self.elevator {
            query.push(" AND elevator = ").push_bind(elevator);
        }

        if let Some(ref parking) = self.parking {
            query.push(" AND parking = ").push_bind(parking);
        }

        if let Some(ref direction) = self.direction {
            query.push(" AND direction = ").push_bind(direction);
        }

        if let Some(ref property_type) = self.property_type {
            query.push(" AND property_type = ").push_bind(property_type);
        }

        if let Some(ref comment) = self.comment {
            query
                .push(" AND comment like ")
                .push_bind(format!("%{comment}%"));
        }

        if let Some(ref tag) = self.tag {
            query.push(" AND tag like ").push_bind(format!("%{tag}%"));
        }

        if let Some(ref broker) = self.broker {
            query.push(" AND broker = ").push_bind(broker);
        }

        query
            .push(" ORDER BY updated_at DESC")
            .push(" LIMIT ")
            .push_bind(self.page_size)
            .push(" OFFSET ")
            .push_bind(self.page_size * (self.page_index - 1));

        let data = query.build_query_as().fetch_all(pool).await?;

        Ok(data)
    }
}

impl SecondHousingInsert for Vec<SecondHandHousingInsertDto> {
    async fn insert_into(&self, pool: &MySqlPool) -> anyhow::Result<bool> {
        let mut query_builder: QueryBuilder<MySql> = QueryBuilder::new(
            r#"
            insert into second_hand_housing (
                name,
                phone,
                address,
                longitude,
                latitude,
                region,
                price,
                low_price,
                room,
                bath,
                hall,
                area,
                floor,
                property,
                decoration,
                age,
                elevator,
                parking,
                direction,
                property_type,
                comment,
                image_data,
                cover_image_url,
                tag,
                broker
            )
            "#,
        );

        query_builder.push_values(self, |mut b, dto| {
            b.push_bind(dto.name.clone())
                .push_bind(dto.phone.clone())
                .push_bind(dto.address.clone())
                .push_bind(dto.longitude)
                .push_bind(dto.latitude)
                .push_bind(dto.region.clone())
                .push_bind(dto.price)
                .push_bind(dto.low_price)
                .push_bind(dto.room)
                .push_bind(dto.bath)
                .push_bind(dto.hall)
                .push_bind(dto.area)
                .push_bind(dto.floor)
                .push_bind(dto.property.clone())
                .push_bind(dto.decoration.clone())
                .push_bind(dto.age.clone())
                .push_bind(dto.elevator)
                .push_bind(dto.parking)
                .push_bind(dto.direction.clone())
                .push_bind(dto.property_type.clone())
                .push_bind(dto.comment.clone())
                .push_bind(dto.image_data.clone())
                .push_bind(dto.cover_image_url.clone())
                .push_bind(dto.tag.clone())
                .push_bind(dto.broker.clone());
        });

        let query = query_builder.build();
        let _ = query.execute(pool).await?;

        Ok(true)
    }
}

impl SecondHousingInsert for SecondHandHousingInsertDto {
    async fn insert_into(&self, pool: &MySqlPool) -> anyhow::Result<bool> {
        let dto = vec![self.clone()];
        dto.insert_into(pool).await?;
        Ok(true)
    }
}

impl SecondHousingUpdate for SecondHandHousingUpdateDto {
    async fn update(&self, pool: &MySqlPool) -> anyhow::Result<bool> {
        let mut query: QueryBuilder<MySql> = QueryBuilder::new("UPDATE second_hand_housing SET ");
        let mut first = true;

        if let Some(ref name) = self.name {
            query.push("name = ").push_bind(name);
            first = false;
        }

        if let Some(ref phone) = self.phone {
            if !first {
                query.push(",");
            }
            query.push("phone = ").push_bind(phone);
            first = false;
        }

        if let Some(ref address) = self.address {
            if !first {
                query.push(",");
            }
            query.push("address = ").push_bind(address);
            first = false;
        }

        if let Some(ref longitude) = self.longitude {
            if !first {
                query.push(",");
            }
            query.push("longitude = ").push_bind(longitude);
            first = false;
        }

        if let Some(ref latitude) = self.latitude {
            if !first {
                query.push(",");
            }
            query.push("latitude = ").push_bind(latitude);
            first = false;
        }

        if let Some(ref region) = self.region {
            if !first {
                query.push(",");
            }
            query.push("region = ").push_bind(region);
            first = false;
        }

        if let Some(ref price) = self.price {
            if !first {
                query.push(",");
            }
            query.push("price = ").push_bind(price);
            first = false;
        }

        if let Some(ref low_price) = self.low_price {
            if !first {
                query.push(",");
            }
            query.push("low_price = ").push_bind(low_price);
            first = false;
        }

        if let Some(ref room) = self.room {
            if !first {
                query.push(",");
            }
            query.push("room = ").push_bind(room);
            first = false;
        }

        if let Some(ref bath) = self.bath {
            if !first {
                query.push(",");
            }
            query.push("bath = ").push_bind(bath);
            first = false;
        }

        if let Some(ref hall) = self.hall {
            if !first {
                query.push(",");
            }
            query.push("hall = ").push_bind(hall);
            first = false;
        }

        if let Some(ref area) = self.area {
            if !first {
                query.push(",");
            }
            query.push("area = ").push_bind(area);
            first = false;
        }

        if let Some(ref floor) = self.floor {
            if !first {
                query.push(",");
            }
            query.push("floor = ").push_bind(floor);
            first = false;
        }

        if let Some(ref property) = self.property {
            if !first {
                query.push(",");
            }
            query.push("property = ").push_bind(property);
            first = false;
        }

        if let Some(ref decoration) = self.decoration {
            if !first {
                query.push(",");
            }
            query.push("decoration = ").push_bind(decoration);
            first = false;
        }

        if let Some(ref age) = self.age {
            if !first {
                query.push(",");
            }
            query.push("age = ").push_bind(age);
            first = false;
        }

        if let Some(ref elevator) = self.elevator {
            if !first {
                query.push(",");
            }
            query.push("elevator = ").push_bind(elevator);
            first = false;
        }

        if let Some(ref parking) = self.parking {
            if !first {
                query.push(",");
            }
            query.push("parking = ").push_bind(parking);
            first = false;
        }

        if let Some(ref direction) = self.direction {
            if !first {
                query.push(",");
            }
            query.push("direction = ").push_bind(direction);
            first = false;
        }

        if let Some(ref property_type) = self.property_type {
            if !first {
                query.push(",");
            }
            query.push("property_type = ").push_bind(property_type);
            first = false;
        }

        if let Some(ref tag) = self.tag {
            if !first {
                query.push(",");
            }
            query.push("tag = ").push_bind(tag);
            first = false;
        }

        if let Some(ref comment) = self.comment {
            if !first {
                query.push(",");
            }
            query.push("comment = ").push_bind(comment);
            first = false;
        }

        if let Some(ref image_data) = self.image_data {
            if !first {
                query.push(",");
            }
            query.push("image_data = ").push_bind(image_data);
            first = false;
        }

        if let Some(ref cover_image_url) = self.cover_image_url {
            if !first {
                query.push(",");
            }
            query.push("cover_image_url = ").push_bind(cover_image_url);
            first = false;
        }

        if let Some(ref broker) = self.broker {
            if !first {
                query.push(",");
            }
            query.push("broker = ").push_bind(broker);
        }

        query.push(" WHERE id = ").push_bind(self.id);

        let _ = query.build().execute(pool).await?;

        Ok(true)
    }
}

impl SecondHousingDelete for i64 {
    async fn delete(&self, pool: &MySqlPool) -> anyhow::Result<bool> {
        let query = sqlx::query("UPDATE second_hand_housing SET deleted = 1 WHERE id = ?")
            .bind(self)
            .execute(pool)
            .await?;

        Ok(query.rows_affected() > 0)
    }
}
