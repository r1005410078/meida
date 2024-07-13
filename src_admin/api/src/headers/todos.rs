use actix_web::{
    body::BoxBody, get, http::header::ContentType, HttpRequest, HttpResponse, Responder, Result,
};
use anyhow::{anyhow, bail};
use serde::Serialize;

use crate::response::{ApiError, Response};

#[derive(Serialize)]
struct Todo {
    id: i32,
    title: String,
    completed: bool,
}

#[get("/list")]
async fn list() -> Result<Response<Vec<Todo>>, ApiError> {
    "12d"
        .parse::<i32>()
        .map_err(|_| ApiError::ErrMsg("1212".to_string()))?;

    let res = Response::ok(vec![
        Todo {
            id: 1,
            title: "Todo 1".to_string(),
            completed: false,
        },
        Todo {
            id: 2,
            title: "Todo 2".to_string(),
            completed: true,
        },
    ]);

    Ok(res)
}
