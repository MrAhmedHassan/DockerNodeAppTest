const express = require('express');
// const mongoose = require('mongoose');
const  { Client } = require('pg');
const redis = require('redis');
const os = require('os');
const { log } = require('console');

const app = express();
const port = process.env.PORT || 7000 ;

// const DB_USER = 'root';
// const DB_PASS = 'example';
// const DB_HOST = 'mongo';
// const DB_PORT = 27017;

// mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/`)
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Could not connect to MongoDB', err));

const DB_USER = 'root';
const DB_PASS = 'example';
const DB_HOST = 'postgres';
const DB_PORT = 5432;
const connectionString = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/`;
const postgresClient = new Client({
  connectionString
});

postgresClient.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Could not connect to PostgreSQL', err));

const redisHost = 'redis';
const redisPort = 6379;

const redisClient = redis.createClient({
  url: `redis://${redisHost}:${redisPort}`
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

redisClient.connect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  redisClient.set('products', 'products data');
  console.log(`Traffic from : ${os.hostname}`);
  
  res.send('Hello World!!s!!Hassan');
}); 

app.get('/data', async (req, res) => {
  const products = await redisClient.get('products');
  res.send(products);
}); 