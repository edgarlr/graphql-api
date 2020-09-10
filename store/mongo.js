'use strict'

const { MongoClient } = require('mongodb')
const { config } = require('../config')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`

let connection;

async function connectDB() {
  if (connection) return connection.db()

  let client;
  try {
    client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = await client.connect()
    console.log(`[DB]: Succesfully connected to Mongo`);
  } catch (error) {
    console.log('[DB]: Could not connect to db', MONGO_URI, error);
    process.exit(1);
  }

  return connection.db();
}

module.exports = connectDB;