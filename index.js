'use strict';

const EventEmitter = require('events');
const record = require('node-record-lpcm16');
const util = require('util');

function Microphone(config, settings) {
  this.init = () => {
    this.emit('subscribe', {
      start: this.start,
      stop: this.stop,
    });
  };

  // if threshold isn't set, we set it to 0
  if (config.threshold === undefined) config.threshold = 0;

  // if no sample rate, we set it 16000
  if (config.sampleRate === undefined) config.sampleRate = 16000;

  let mic;
  let streaming = false; // this helps with not sending data after we stop

  this.start = (callback) => {
    if (mic !== undefined) record.stop();
    mic = record.start(config);

    streaming = true;
    
    this.emit('started');
    
    mic.on('data', (data) => {
      if (!streaming) return;
      if (callback) callback(null, data);
      this.emit('data', data);
    });
  };

  this.stop = (callback) => {
    if (mic !== undefined) record.stop();
    mic = undefined;

    streaming = false;
    
    if (callback) callback(null);
    this.emit('stopped');
  };

  return this;
}

util.inherits(Microphone, EventEmitter);
module.exports = Microphone;
