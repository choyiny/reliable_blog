const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const redis = require("redis");

const queryStoreUrl = 'mongodb://root:example@localhost:27017';
const clickMapUrl = 'mongodb://root:example@localhost:27018';

const dbName = 'myproject';
const subscriber = redis.createClient();
 
const query_id = "asdfasdfasdfasdf"
const ad_id = "asdfasdfasdfasdfasdf"
const time = new Date().getTime()

// shared state
var Share = function() {
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

MongoClient.connect(queryStoreUrl, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
  // on new click logs, join with a query and send to clickmap
  share.on('newclicklog', data => {
    db.collection('querystore').findOne({_id: data.query_id}).then(res => {
      console.log(res)
      console.log(data)
      console.log(data.query_id)
      if (res == null) return
      share.emit('pushtoclickmap', {query: res, clicklog: data})
    })
  })

  // release the client when the stream is finished
  share.on('end', () => {client.close()})
});

MongoClient.connect(clickMapUrl, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);

  // on new joined click+query send to click map
  share.on('pushtoclickmap', data => {
    db.collection('clickmap').updateOne(
      {
        _id: {
          post_id: data.clicklog.post_id,
          search_term: data.query.search_term
        }
      },
      {$addToSet: {queries: data.query}},
      {upsert: true}  
    )
    .then(res => {
      console.log("Inserted " + JSON.stringify(res.result) + " to ")
    })
    .catch(console.error)
  })

  // release the client when the stream is finished
  share.on('end', () => {client.close()})
});

subscriber.on("message", function (channel, message) {
  console.log("Message: " + message + " on channel: " + channel + " is arrive!");
  share.emit('newclicklog', JSON.parse(message))
});
subscriber.subscribe("click_logs");



