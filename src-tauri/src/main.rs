#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::Deserialize;
use serde_yaml::Sequence;
use serde_yaml::{self, Value};
use std::fs;

#[derive(Debug, Default, Deserialize)]
struct Profiles {
    profiles: Sequence,
}

#[tauri::command]
fn get_profiles() -> Vec<Value> {
    let path: &str = "../src-tauri/db/main.yaml";
    let data: String = fs::read_to_string(path).expect("Unable to Read File");
    let yaml: Profiles = serde_yaml::from_str(&data).expect("Unable to Parse YAML");
    let profiles: Vec<Value> = yaml.profiles;

    return profiles;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_profiles])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
