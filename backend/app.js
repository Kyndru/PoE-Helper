const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const settingsRoutes = require('./routes/user-settings');

const app = express();

const r = require('rethinkdb');

const setupDatabase = (conn, databaseName, tableNames) => {
  r(tableNames)
      .difference(r.db(databaseName).tableList())
      .forEach(table => r.db(databaseName).tableCreate(table))
      .run(conn);
};

r.connect({ host: '104.248.18.211', port: 28015, user: 'admin', password: '' }, function(err, conn) {
  if(err) throw err;
  const databaseName = 'poehelper';
  const tableNames = ['items', 'stashes'];
  setupDatabase(conn, databaseName, tableNames);
  r.db('poehelper').table('items').insert({ name: 'Default One Hand Axe' }).run(conn, function(err, res)
  {
    if(err) throw err;
    console.log(res);
  });
});

mongoose.connect('mongodb+srv://lukas:' + process.env.MONGO_ATLAS_PW + '@cluster0-gsvo3.mongodb.net/node-angular?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch((err) => {
    console.log('Error while connecting to DB!');
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/settings', settingsRoutes);

module.exports = app;
