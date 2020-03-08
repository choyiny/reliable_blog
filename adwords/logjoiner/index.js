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

function makeClick() {
  return {
    query_id: query_id,
    time: new Date().getTime(),
    ad_id: ad_id
  }
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

MongoClient.connect(queryStoreUrl, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
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

  // on new joined click+query send to click map
  share.on('pushtoclickmap', data => {
    db.collection('asdf').updateOne(
      {
        query_id: data.query._id,
        search_term: data.query.search_term
      },
      {$addToSet: {clicklogs: data.clicklog}},
      {upsert: true}  
    )
  })

  // release the client when the stream is finished
  share.on('end', () => {client.close()})
});

subscriber.on("message", function (channel, message) {
  console.log("Message: " + message + " on channel: " + channel + " is arrive!");
  share.emit('newclicklog', JSON.parse(message))
});
subscriber.subscribe("notification");









