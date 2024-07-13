use anyhow::Ok;
use sqlx::MySqlPool;
use std::env;

pub async fn get_pool() -> anyhow::Result<MySqlPool> {
    Ok(MySqlPool::connect(&env::var("DATABASE_URL")?).await?)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn it_works() {
        dotenv::dotenv().ok();
        let pool = get_pool().await;
        assert!(pool.is_ok());
    }
}
