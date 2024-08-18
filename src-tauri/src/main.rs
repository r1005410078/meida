// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // app.config()
            let window = app.get_window("main").unwrap();
            window.maximize().unwrap();
            window.center().unwrap();
            Ok(())
        })
        .on_page_load(|window, _| window.maximize().unwrap())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
