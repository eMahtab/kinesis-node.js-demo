var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var kinesis = new AWS.Kinesis({apiVersion: '2013-12-02'});
kinesis.putRecord({
  Data: '{"Country": "Mexico", "Values": ["t2.micro", "m1.medium"]}',
  PartitionKey: '98762375762',
  StreamName: 'demo-stream'
}, function(err, data) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    console.log(data); // successful response
    addMoreRecords();
  }
});



var d1 = {Data: '{"Country": "India", "Values": ["t1.micro", "m1.medium"]}}', PartitionKey: '14564321992'}
var d2 = {Data: '{"Country": "Singapore", "Values": ["m1.small", "m1.medium"]}',PartitionKey: '99999999999'}

var records = [d1,d2];

function addMoreRecords(){
    kinesis.putRecords({Records: records, StreamName: 'demo-stream'},function(err,data){
    	if(err){
    		console.log(err, err.stack);
    	}else{
    	  console.log(data); 	
    	}
    })
}