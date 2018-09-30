var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});
kinesis.describeStream({
  StreamName: 'demo-stream'
}, function(err, streamData) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    streamData.StreamDescription.Shards.forEach(shard => {
      kinesis.getShardIterator({
        ShardId: shard.ShardId,
        ShardIteratorType: 'TRIM_HORIZON',
        StreamName: 'demo-stream'
      }, function(err, shardIteratordata) {
        if (err) {
          console.log(err, err.stack); // an error occurred
        } else {
          kinesis.getRecords({
            ShardIterator: shardIteratordata.ShardIterator
          }, function(err, records) {
            if (err) {
              console.log(err, err.stack); // an error occurred
            } else {
              if(records['Records'].length > 0){
                 records['Records'].forEach(function(record,index) {
                   var payload = new Buffer(record['Data'], 'base64').toString('ascii');
                   console.log('Record '+(index+1)+' => '+payload);
                })
              }  
            }
          });
        }
      });
    });
  }
});