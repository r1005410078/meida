// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{
    fs::{self},
    path::PathBuf,
};

use fangyuan_data::fangy::{
    init_fangy_db, FangyDataSource, FangyPrimaryKey, QueryFany, UpdateFangy,
};
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn insert_fangy(mut data: UpdateFangy, app: tauri::AppHandle) {
    let store_image_dir = get_meida_image_dir(&app).unwrap();
    data.trans_image_data(store_image_dir);
    data.insert().unwrap();
}

#[tauri::command]
fn query_fangy(query: QueryFany) -> FangyDataSource {
    query.query_source().unwrap()
}

#[tauri::command]
fn update_fangy(mut data: UpdateFangy, app: tauri::AppHandle) {
    let store_image_dir = get_meida_image_dir(&app).unwrap();
    data.trans_image_data(store_image_dir);
    data.update().unwrap();
}

#[tauri::command]
fn delete_fangy(data: FangyPrimaryKey) {
    data.delete().unwrap();
}

fn get_meida_image_dir(app: &tauri::AppHandle) -> anyhow::Result<String, String> {
    let meida_images_dir = get_meida_path(app)?.join("images");
    fs::create_dir_all(&meida_images_dir).map_err(|e| e.to_string())?;
    Ok(meida_images_dir.to_string_lossy().to_string())
}

fn get_meida_path(app: &tauri::AppHandle) -> anyhow::Result<PathBuf, String> {
    let app_data_dir = app
        .path_resolver()
        .app_data_dir()
        .ok_or("Could not find app data directory")?;

    let meida_dir = app_data_dir.join("meida");
    fs::create_dir_all(&meida_dir).map_err(|e| e.to_string())?;

    Ok(meida_dir)
}

fn main() {
    init_fangy_db().unwrap();

    tauri::Builder::default()
        .setup(|app| {
            // app.config()
            let window = app.get_window("main").unwrap();
            window.maximize().unwrap();
            window.center().unwrap();
            Ok(())
        })
        .on_page_load(|window, _| window.maximize().unwrap())
        .invoke_handler(tauri::generate_handler![
            insert_fangy,
            query_fangy,
            update_fangy,
            delete_fangy,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
