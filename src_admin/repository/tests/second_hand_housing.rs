use dto::second_hand_housing::{
    SecondHandHousingInsertDto, SecondHandHousingQueryDto, SecondHandHousingUpdateDto,
};
use fake::faker::internet::zh_cn::Username;
use fake::Fake;
use model::second_hand_housing::SecondHandHousing;
use repository::pool::get_pool;
use repository::second_hand_housing::{
    SecondHandHousingQuery, SecondHousingDelete, SecondHousingInsert, SecondHousingUpdate,
};
use sqlx::query_as;

#[tokio::test]
async fn test_query() {
    dotenv::dotenv().ok();
    let pool = get_pool().await.unwrap();
    let mut dto = SecondHandHousingQueryDto::default();

    dto.name = Some("君乾_sit".to_string());
    dto.page_index = 1;
    dto.page_size = 10;

    match dto.query(&pool).await {
        Err(err) => panic!("{:?}", err),
        Ok(data) => {
            println!("data: {:?}", data);
        }
    }
}

#[tokio::test]
async fn test_create() {
    dotenv::dotenv().ok();
    let name: String = Username().fake();

    let pool = get_pool().await.unwrap();
    let dto = vec![SecondHandHousingInsertDto {
        name: name.clone(),
        phone: "12345678901".to_string(),
        address: "北京市朝阳区".to_string(),
        longitude: Some(1.0), // 使用 Option<f64> 来处理可能的 NULL 值
        latitude: Some(1.0),  // 使用 Option<f64> 来处理可能的 NULL 值
        region: "朝阳区".to_string(),
        price: 1000000.0,
        low_price: Some(10.0), // 使用 Option<f64> 来处理可能的 NULL 值
        room: 3,
        bath: 5,
        hall: 1,
        area: 100.0,
        floor: 2,
        property: "个人".to_string(),
        decoration: "毛坯".to_string(),
        age: "2010-01-01".to_string(),
        elevator: true,
        parking: true,
        direction: "东".to_string(),
        property_type: Some("公寓".to_string()),
        tag: Some("123".to_string()),
        comment: Some("123".to_string()),
        image_data: Some("123".to_string()),
        cover_image_url: Some("123".to_string()),
        broker: "张三".to_string(),
    }];

    let count = dto.insert_into(&pool).await;
    assert!(count.is_ok());

    let result = query_as!(
        SecondHandHousing,
        r#"select * from second_hand_housing where name = ?"#,
        name
    )
    .fetch_one(&pool)
    .await
    .unwrap();

    assert_eq!(result.name, name);
}

#[tokio::test]
async fn test_update() {
    dotenv::dotenv().ok();
    let name: String = Username().fake();
    let pool = get_pool().await.unwrap();
    let result = query_as!(SecondHandHousing, r#"select * from second_hand_housing "#)
        .fetch_one(&pool)
        .await
        .unwrap();

    let dto = SecondHandHousingUpdateDto {
        id: result.id,
        name: Some(name.clone()),
        phone: Some("12345678901".to_string()),
        address: Some("北京市朝阳区".to_string()),
        longitude: Some(1.0), // 使用 Option<f64> 来处理可能的 NULL 值
        latitude: Some(1.0),  // 使用 Option<f64> 来处理可能的 NULL 值
        region: Some("朝阳区".to_string()),
        price: Some(1000000.0),
        low_price: Some(10.0), // 使用 Option<f64> 来处理可能的 NULL 值
        room: Some(3),
        bath: Some(5),
        hall: Some(1),
        area: Some(100.0),
        floor: Some(2),
        property: Some("个人".to_string()),
        decoration: Some("毛坯".to_string()),
        age: Some("2010-01-01".to_string()),
        elevator: Some(true),
        parking: Some(true),
        direction: Some("东".to_string()),
        property_type: Some("公寓".to_string()),
        tag: Some("123".to_string()),
        comment: Some("123".to_string()),
        image_data: Some("123".to_string()),
        cover_image_url: Some("123".to_string()),
        broker: Some("张三".to_string()),
    };

    match dto.update(&pool).await {
        Err(err) => panic!("{:?}", err),
        _ => {}
    }

    let result = query_as!(
        SecondHandHousing,
        r#"select * from second_hand_housing where id = ?"#,
        result.id
    )
    .fetch_one(&pool)
    .await
    .unwrap();

    assert_eq!(result.name, name);
}

#[tokio::test]
async fn test_delete() {
    dotenv::dotenv().ok();
    let pool = get_pool().await.unwrap();
    let result = query_as!(SecondHandHousing, r#"select * from second_hand_housing "#)
        .fetch_one(&pool)
        .await
        .unwrap();

    let dto = result.id as i64;
    let count = dto.delete(&pool).await;

    assert!(count.is_ok());

    let result = query_as!(
        SecondHandHousing,
        r#"select * from second_hand_housing where id = ?"#,
        result.id
    )
    .fetch_one(&pool)
    .await
    .unwrap();

    assert_eq!(result.deleted, 1);
}
