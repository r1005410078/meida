use actix_web::{
    get, post,
    web::{self},
    Responder, Result,
};
use dto::second_hand_housing::{SecondHandHousingQueryDto, SecondHandHousingSaveDto};
use service::{qiliu, second_hand_housing};
use sqlx::MySqlPool;

use crate::response::{ApiError, Response};

#[get("/list")]
async fn list(
    pool: web::Data<MySqlPool>,
    query: web::Query<SecondHandHousingQueryDto>,
) -> Result<impl Responder> {
    let (data, total) = second_hand_housing::query(pool.as_ref(), query.into_inner())
        .await
        .map_err(|err| ApiError::ErrMsg(err.to_string()))?;

    Ok(Response::ok_total(data, total))
}

#[post("/save")]
async fn save(
    pool: web::Data<MySqlPool>,
    data: web::Json<SecondHandHousingSaveDto>,
) -> Result<impl Responder> {
    second_hand_housing::save(pool.as_ref(), data.into_inner())
        .await
        .map_err(|err| ApiError::ErrMsg(err.to_string()))?;

    Ok(Response::ok(true))
}

#[post("/delete/{id}")]
async fn delete(pool: web::Data<MySqlPool>, id: web::Path<i64>) -> Result<impl Responder> {
    second_hand_housing::delete(pool.as_ref(), id.into_inner())
        .await
        .map_err(|err| ApiError::ErrMsg(err.to_string()))?;

    Ok(Response::ok(true))
}

#[get("/get_qiniu_token/{file_name}")]
async fn get_qiniu_token(file_name: web::Path<String>) -> Result<impl Responder> {
    let token = qiliu::get_upload_token(&file_name);
    Ok(Response::ok(token))
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/second_hand_housing")
            .service(list)
            .service(save)
            .service(delete)
            .service(get_qiniu_token),
    );
}
