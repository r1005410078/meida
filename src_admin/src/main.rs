use actix_web::http::header;
use actix_web::middleware::Logger;
use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use env_logger::Env;

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

async fn index_handler() -> actix_web::Result<impl Responder> {
    Ok(actix_files::NamedFile::open_async("assets/index.html")
        .await?
        .customize()
        .insert_header(header::ContentEncoding::Gzip))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    HttpServer::new(|| {
        App::new()
            .wrap(actix_web::middleware::Compress::default())
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .service(echo)
            .route("/hey", web::get().to(manual_hello))
            .default_service(web::to(index_handler))
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
