#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::offset::Local;
use serde::{Deserialize, Serialize};
use serde_yaml::{self, Sequence, Value};
use std::fs;
use std::io::prelude::*;

const PATH: &str = "C:/Users/kevka/Documents/okane";
// const PATH: &str = "/okane";

#[tauri::command]
fn check_new_user() -> bool {
    let index_file = fs::File::open("{PATH}/index.json");
    match index_file {
        Ok(_) => return true,
        Err(_) => return false,
    }
}

// ========================================================================================================================//
// ========================================================================================================================//
// ========================================================================================================================//

#[derive(Debug, Default, Serialize, Deserialize)]
struct Account {
    account: String,
    card_color: String,
}

#[tauri::command]
fn add_account(new_account: Vec<Account>) {
    println!("NOW: {:?}", Local::now());
    println!("ACC: {:?} ", new_account);
    fs::create_dir_all(PATH).expect("Unable to create directory");
    let mut file = fs::File::create("C:/Users/kevka/Documents/okane/index.json")
        .expect("Unable to create file");
    file.write_all(b"Hello, world!")
        .expect("Unable to write to file");
}

// ========================================================================================================================//
// ========================================================================================================================//
// ========================================================================================================================//

#[derive(Debug, Default, Deserialize)]
struct ProfileObject {
    id: u32,
    name: String,
}

#[tauri::command]
fn get_income(profile: ProfileObject) {
    // let path: &str = "../src-tauri/db/main.yaml";
    // let path: &str = "../src-tauri/db/main.yaml";
    let id = profile.id;
    let name = profile.name;
    println!("{}-{}", id, name);
    println!("----");
    // let data: String = fs::read_to_string(path).expect("Unable to Read File");
    // let yaml: Profiles = serde_yaml::from_str(&data).expect("Unable to Parse YAML");
    // let profiles: Vec<Value> = yaml.profiles;

    // return profiles;
}

// ========================================================================================================================//
// ========================================================================================================================//
// ========================================================================================================================//

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

// ========================================================================================================================//
// ========================================================================================================================//
// ========================================================================================================================//

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            check_new_user,
            add_account,
            get_income,
            get_profiles
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
