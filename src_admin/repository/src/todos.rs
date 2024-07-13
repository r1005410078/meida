use std::future::Future;

use model::todos::Todo;
use sqlx::MySqlPool;

pub trait TodoRepository {
    fn update(&self, pool: &MySqlPool) -> impl Future<Output = anyhow::Result<bool>>;
    fn insert(&self, pool: &MySqlPool) -> impl Future<Output = anyhow::Result<u64>>;
    fn query(pool: &MySqlPool) -> impl Future<Output = anyhow::Result<Vec<Todo>>>;
}

impl TodoRepository for Todo {
    async fn update(&self, pool: &MySqlPool) -> anyhow::Result<bool> {
        let rows_affected = sqlx::query!(
            r#"
UPDATE todos
SET done = TRUE
WHERE id = ?
        "#,
            self.id
        )
        .execute(pool)
        .await?
        .rows_affected();

        Ok(rows_affected > 0)
    }
    async fn insert(&self, pool: &MySqlPool) -> anyhow::Result<u64> {
        let todo_id = sqlx::query!(
            r#"
INSERT INTO todos ( description )
VALUES ( ? )
        "#,
            self.description
        )
        .execute(pool)
        .await?
        .last_insert_id();

        Ok(todo_id)
    }

    async fn query(pool: &MySqlPool) -> anyhow::Result<Vec<Todo>> {
        let mut todos = vec![];
        let recs = sqlx::query!(
            r#"
SELECT id, description, done
FROM todos
ORDER BY id
        "#
        )
        .fetch_all(pool)
        .await?;

        for rec in recs {
            todos.push(Todo {
                id: 0,
                description: rec.description,
                done: rec.done == 1,
            })
        }

        Ok(todos)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::pool::get_pool;

    #[tokio::test]
    async fn test_insert() {
        dotenv::dotenv().ok();
        let pool = get_pool().await.unwrap();

        let todo = Todo {
            id: 0,
            description: "test".to_string(),
            done: false,
        };

        let rows_affected = todo.insert(&pool).await.unwrap();
        assert!(rows_affected > 0);
    }

    #[tokio::test]
    async fn test_query() {
        dotenv::dotenv().ok();
        let pool = get_pool().await.unwrap();

        let todos = Todo::query(&pool).await.unwrap();

        println!("todos: {:?}", todos);
    }
}
