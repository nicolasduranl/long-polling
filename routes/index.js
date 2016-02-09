var express = require('express');
var router = express.Router();

const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();

setInterval(function(){
        console.log(myEmitter.listenerCount('message'))
        console.log(myEmitter._events)
    }, 1000)


router.get('/messages', function(req, res, next) {
	var addMessageListener = function(res){
        myEmitter.once('message', function(data){
            res.json(data);
        })
    }
    addMessageListener(res);
});

router.get('/push', function(req, res, next) {
	myEmitter.emit('message', { hola : 'hola'})
    res.status(200).end()
});

module.exports = router;
