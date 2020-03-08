const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const pg = require('pg')
const QueryStream = require('pg-query-stream')
const JSONStream = require('JSONStream')

const queryStoreUrl = 'mongodb://root:example@localhost:27017';
const clickMapUrl = 'mongodb://root:example@localhost:27018';

const dbName = 'myproject';

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const query_id = makeid(20)
const ad_id = makeid(20)
const time = new Date().getTime()

const fakeQuery = {
  _id: query_id,
  time: time,
  ad_id: ad_id,
  search_term: "haha what a search am i right?",
  other_data: {
    first_name: "jordan",
    last_name: "liu",
    attr1: "attr1",
    attr2: "attr2"
  }
}
const fakeClick = {
  query_id: query_id,
  time: time,
  ad_id: ad_id
}
// shared state
var Share = function() {
  this.things = []
  listeners = {}
  this.on = (event, fn) => {
    if (listeners[event]) {
      listeners[event].push(fn)
    } else {
      listeners[event] = [fn]
    }
  }
  this.emit = (event, data) => {
    (listeners[event] || []).forEach(fn => fn(data));
  }
}
const share = new Share()

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'clicks',
  password: 'example',
  port: 5432,
})

MongoClient.connect(queryStoreUrl, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  db.collection('asdf').findPne
  // on new click logs, join with a query and send to clickmap
  share.on('newclicklog', data => {
    share.emit('pushtoclickmap', {query: fakeQuery, clicklog: data})
  })

  // release the client when the stream is finished
  share.on('end', () => {client.close()})
});

MongoClient.connect(clickMapUrl, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  let collection = db.collection('asdf')

  // on new joined click+query send to click map
  share.on('pushtoclickmap', data => {
    db.collection('asdf').findOneAndUpdate(
      {
        query_id: data.query._id,
        search_term: data.query.search_term
      },
      [['ad_id','asc']],
      {$addToSet: {clicklogs: data.clicklog}},
      {upsert: true}  
    )
  })

  // release the client when the stream is finished
  share.on('end', () => {client.close()})
});

client.connect((err) => {
  if (err) throw err;
  const query = new QueryStream('SELECT * FROM generate_series(0, $1) num', [1000])
  const stream = client.query(query)

  // release the client when the stream is finished
  stream.on('end', () => {
    client.end()
    share.emit('end')
  })

  // emit all new data
  stream.on('data', data => {
    share.emit('newclicklog', fakeClick)
  })
})









