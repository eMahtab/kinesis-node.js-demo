var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});

var params = {
  ShardCount: 2, /* required */
  StreamName: 'demo-stream' /* required */
};

kinesis.createStream(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});