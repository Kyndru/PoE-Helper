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
  if (!_.isNil(tableName) && _.isString(tableName) && !_.isNil(conn)) {
    r.tableList().run(conn).then(function(tableNames) {
      if (_.includes(tableNames, tableName)) {
        return r.tableCreate(tableName).run(conn);
      } else {
        return;
        }
    });
  }
};

r.connect({ host: '104.248.18.211', port: 28015, user: 'admin', password: '' }, function(err, conn) {
  if(err) throw err;
  const databaseName = 'poehelper';
  const tableNames = ['items', 'stashes'];
  setupDatabase(conn, databaseName, tableNames).then(() => {
    r.db('poehelper').table('items').insert({ name: 'Default One Hand Axe' }).run(conn, function(err, res)
    {
      if(err) throw err;
      console.log(res);
    });
  })
});

mongoose.connect('mongodb+srv://lukas:' + process.env.MONGO_ATLAS_PW + '@cluster0-gsvo3.mongodb.net/node-angular?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch(() => {
    console.log('Error while connecting to DB!');
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
