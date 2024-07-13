use crate::headers::todos::list;
use actix_web::web;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/todos").service(list));
}
