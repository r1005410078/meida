use dto::second_hand_housing::{SecondHandHousingQueryDto, SecondHandHousingSaveDto};
use model::second_hand_housing::SecondHandHousing;
use repository::second_hand_housing::{
    SecondHandHousingQuery, SecondHousingDelete, SecondHousingInsert, SecondHousingUpdate,
};
use sqlx::MySqlPool;

pub async fn save(
    pool: &MySqlPool,
    second_housing_save_dto: SecondHandHousingSaveDto,
) -> anyhow::Result<bool> {
    Ok(match second_housing_save_dto {
        SecondHandHousingSaveDto::Insert(dto) => dto.insert_into(pool).await?,
        SecondHandHousingSaveDto::Update(dto) => dto.update(pool).await?,
    })
}

pub async fn delete(pool: &MySqlPool, id: i64) -> anyhow::Result<bool> {
    Ok(id.delete(pool).await?)
}

pub async fn query(
    pool: &MySqlPool,
    query: SecondHandHousingQueryDto,
) -> anyhow::Result<(Vec<SecondHandHousing>, i32)> {
    Ok((query.query(pool).await?, query.get_total(pool).await?))
}
