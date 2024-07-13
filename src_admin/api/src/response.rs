use actix_web::{
    body::BoxBody,
    error,
    http::{header::ContentType, StatusCode},
    HttpRequest, HttpResponse, Responder,
};
use serde::Serialize;

use derive_more::Display;

#[derive(Debug, Display)]
pub enum ApiError {
    #[display(fmt = "internal error")]
    InternalError,

    #[display(fmt = "bad request")]
    BadClientData,

    #[display(fmt = "timeout")]
    Timeout,

    #[display(fmt = "{}", _0)]
    ErrMsg(String),
}

impl error::ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse {
        let body = Response {
            code: 1,
            message: Some(self.to_string()),
            data: (),
        };
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .body(serde_json::to_string(&body).unwrap())
    }

    fn status_code(&self) -> StatusCode {
        match *self {
            ApiError::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
            ApiError::BadClientData => StatusCode::BAD_REQUEST,
            ApiError::Timeout => StatusCode::GATEWAY_TIMEOUT,
            ApiError::ErrMsg(_) => StatusCode::OK,
        }
    }
}

#[derive(Serialize)]
pub struct Response<T: Serialize> {
    pub code: u32,
    pub message: Option<String>,
    pub data: T,
}

impl<T: Serialize> Response<T> {
    pub fn ok(data: T) -> Self {
        Self {
            code: 0,
            message: None,
            data,
        }
    }
}

impl<T: Serialize> Responder for Response<T> {
    type Body = BoxBody;

    fn respond_to(self, _req: &HttpRequest) -> HttpResponse<Self::Body> {
        let body = serde_json::to_string(&self).unwrap();
        // Create response and set content type
        HttpResponse::Ok()
            .content_type(ContentType::json())
            .body(body)
    }
}