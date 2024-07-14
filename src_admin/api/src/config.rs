use crate::headers::second_hand_housing;
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    second_hand_housing::config(cfg);
}
