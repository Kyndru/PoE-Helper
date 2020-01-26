import { Component, OnInit } from '@angular/core';
import config from '../config';
// import { r } from 'rethinkdb';
var r = require('rethinkdb');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() { 

  }

  ngOnInit() {
    // r.connect({ host: '157.230.17.78', port: 28015 }, function(err, conn) {
    //   if(err) throw err;
    //   r.db('test').tableCreate('tv_shows').run(conn, function(err, res) {
    //     if(err) throw err;
    //     console.log(res);
    //     r.table('tv_shows').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res)
    //     {
    //       if(err) throw err;
    //       console.log(res);
    //     });
    //   });
    // });
    // var options: RConnectionOptions = {};
    // options.user = 'admin';
    // options.password = '';
    // options.host = '104.248.18.211';
    // options.port = 28015;
    // options.db = 'test';
    // options.buffer = 2;
    // options.max = 5;
    // console.log(options);
    console.log('trying');
    var connection = null;
    const conn = r.connect({ db: 'test', host: 'poehelper.mooo.com'});
    console.log(conn);
    conn.then(res => {
      console.log('OK');
    }, error => {
      console.log('ERROR');
      console.log(error);
    })
    console.log('end');
    // r.connect(options).then(conn => {
    //   console.log(conn);
    // }, error => {
    //   console.error(error);
    // });
  }

  async go() {
    await r.connectPool(config);

   
    // const conn = await r.connect(config);
    // r.db('test').tableCreate('tv_shows');
    // r.table('tv_shows').insert([{ name: 'Star Trek TNG', episodes: 178 }, { name: 'Battlestar Galactica', episodes: 75 }]);
    // console.log(r.table('tv_shows').count());
  }

  async openConnection() {
    await r.connectPool(config);

  }

}
