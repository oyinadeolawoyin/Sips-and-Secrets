#! /usr/bin/env node
require('dotenv').config({ path: '../.env' });
console.log('env', process.env.DATABASE_URL);
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR ( 255 ),
  lastname VARCHAR ( 255 ),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  admin BOOLEAN DEFAULT FALSE,
  membership BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255),
  content TEXT,
  date TIMESTAMP,
  profile_id INTEGER,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
