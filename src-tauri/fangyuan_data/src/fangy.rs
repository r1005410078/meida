use std::{fs::File, io::Write, path::PathBuf};

use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
#[derive(Debug, Serialize, Deserialize)]
pub struct Fangy {
    id: i32,
    name: String,
    phone: String,
    address: String,
    comment: Option<String>,
    image_url: String,
    deleted: Option<bool>,
    created_at: String,
    updated_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FangyDataSource {
    data: Vec<Fangy>,
    total: i32,
}

pub fn get_conn() -> anyhow::Result<Connection> {
    let path = "./fangy.db";
    let conn = Connection::open(path)?;
    Ok(conn)
}

pub fn init_fangy_db() -> anyhow::Result<()> {
    let path = "./fangy.db";
    let conn = Connection::open(path)?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS fangy (
          id          INTEGER PRIMARY KEY,
          name        TEXT NOT NULL,
          phone       TEXT NOT NULL,
          address     TEXT NOT NULL,
          comment     TEXT NOT NULL,
          image_url   TEXT NOT NULL,
          deleted     BOOLEAN NOT NULL DEFAULT 0,
          created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
      )",
        (), // empty list of parameters.
    )?;

    Ok(())
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateFangy {
    id: Option<i32>,
    name: String,
    phone: String,
    address: String,
    comment: Option<String>,
    deleted: Option<bool>,
    pub image_data: Vec<ImageFile>,
}

impl UpdateFangy {
    pub fn new(
        id: Option<i32>,
        name: String,
        phone: String,
        address: String,
        comment: Option<String>,
        image_data: Vec<ImageFile>,
    ) -> Self {
        Self {
            id,
            name,
            phone,
            address,
            comment,
            image_data,
            deleted: None,
        }
    }

    pub fn trans_image_data(&mut self, store_image_dir: String) {
        for img in self.image_data.iter_mut() {
            let uuid = Uuid::new_v4();
            img.path = PathBuf::from(&store_image_dir)
                .join(&format!("{}_{}", uuid.to_string(), img.path))
                .display()
                .to_string();
        }
    }

    pub fn upload(&self) -> anyhow::Result<String> {
        let mut image_url = Vec::new();
        for img in self.image_data.iter() {
            let path = img.upload()?;
            image_url.push(path);
        }

        Ok(image_url.join(","))
    }

    pub fn insert(&self) -> anyhow::Result<()> {
        let conn = get_conn()?;
        let image_url = self.upload()?;

        conn.execute(
          "INSERT INTO fangy (name, phone, address, comment, image_url) VALUES (?1, ?2, ?3, ?4, ?5)",
          (
              &self.name,
              &self.phone,
              &self.address,
              &self.comment,
              &image_url,
          ),
        )?;

        Ok(())
    }

    pub fn insert_many(fangy: Vec<UpdateFangy>) -> anyhow::Result<()> {
        for f in fangy.iter() {
            f.insert()?;
        }
        Ok(())
    }

    pub fn update(&self) -> anyhow::Result<()> {
        let conn = get_conn()?;
        let image_url = self.upload()?;

        conn.execute(
          "UPDATE fangy SET name = ?1, phone = ?2, address = ?3, comment = ?4, image_url = ?5 WHERE id = ?6",
          (
              &self.name,
              &self.phone,
              &self.address,
              &self.comment,
              &image_url,
              &self.id,
          ),
        )?;
        Ok(())
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct QueryFany {
    keyword: Option<String>,
    page_index: String,
    page_size: String,
}

impl QueryFany {
    pub fn total(&self) -> anyhow::Result<i32> {
        let conn = get_conn()?;
        let mut stmt = conn.prepare("SELECT count(*) FROM fangy WHERE name like ?1 or phone like ?1 or address like ?1 or comment like ?1")?;
        let count = stmt.query_row::<i32, _, _>(&[&self.keyword], |r| r.get(0))?;
        Ok(count as i32)
    }
    pub fn query(&self) -> anyhow::Result<Vec<Fangy>> {
        let conn = get_conn()?;
        let mut query = conn.prepare("SELECT * FROM fangy WHERE name like ?1 or phone like ?1 or address like ?1 or comment like ?1 order by updated_at DESC LIMIT ?2 OFFSET ?3 ")?;
        let limit = self.page_size.clone();
        let offset = (self.page_size.clone().parse::<i32>().unwrap()
            * (self.page_index.clone().parse::<i32>().unwrap() - 1))
            .to_string();

        let data = query
            .query_map([&self.keyword, &Some(limit), &Some(offset)], |row| {
                Ok(Fangy {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    phone: row.get(2)?,
                    address: row.get(3)?,
                    comment: row.get(4)?,
                    image_url: row.get(5)?,
                    deleted: row.get(6)?,
                    created_at: row.get(7)?,
                    updated_at: row.get(8)?,
                })
            })?
            .map(|row| row.unwrap())
            .collect::<Vec<Fangy>>();
        Ok(data)
    }

    pub fn query_source(&self) -> anyhow::Result<FangyDataSource> {
        Ok(FangyDataSource {
            total: self.total()?,
            data: self.query()?,
        })
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct FangyPrimaryKey {
    id: i32,
}

impl FangyPrimaryKey {
    pub fn new(id: i32) -> Self {
        Self { id }
    }
    pub fn delete(&self) -> anyhow::Result<()> {
        let conn = get_conn()?;
        conn.execute("DELETE FROM fangy WHERE id = ?1", [self.id])?;
        Ok(())
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ImageFile {
    path: String,
    content: Vec<u8>,
}

impl ImageFile {
    pub fn upload(&self) -> anyhow::Result<String> {
        let mut file = File::create(&self.path)?;
        file.write_all(&self.content)?;

        println!("upload image: {}", self.path);
        Ok(self.path.clone())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn init_fangy_db_test() {
        init_fangy_db().unwrap();
    }

    #[test]
    fn insert_fangy_test() {
        let fangy = UpdateFangy::new(
            None,
            "ddd".to_string(),
            "111111111111test111111111111".to_string(),
            "q".to_string(),
            Some("wq".to_string()),
            vec![],
        );
        fangy.insert().unwrap();
    }

    #[test]
    fn update_fangy_test() {
        let fangy = UpdateFangy::new(
            Some(1),
            "test_111".to_string(),
            "test_111".to_string(),
            "test_aaa".to_string(),
            Some("test_aa".to_string()),
            vec![],
        );
        fangy.update().unwrap();
    }

    #[test]
    fn delete_fangy_test() {
        let fangy = FangyPrimaryKey::new(1);
        fangy.delete().unwrap();
    }

    #[test]
    fn query_fangy_test() {
        let fangy = QueryFany {
            keyword: Some("%test%".to_string()),
            page_index: "0".to_string(),
            page_size: "10".to_string(),
        };
        let res = fangy.query().unwrap();
        println!("{:?}", res);
    }
}
