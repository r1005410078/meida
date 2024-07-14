use actix_files::Files;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer, Responder};
use env_logger::Env;
use repository::pool::get_pool;

async fn index_handler() -> actix_web::Result<impl Responder> {
    Ok(actix_files::NamedFile::open_async("assets/index.html").await?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    let pool = web::Data::new(get_pool().await.unwrap());

    println!("Starting server at http://127.0.0.1:8081");

    HttpServer::new(move || {
        App::new()
            .app_data(pool.clone())
            .wrap(actix_web::middleware::Compress::default())
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .service(Files::new("/static", "assets").show_files_listing())
            .service(web::scope("/api").configure(api::config::config))
            .default_service(web::to(index_handler))
    })
    .bind(("127.0.0.1", 8081))?
    .run()
    .await
}
