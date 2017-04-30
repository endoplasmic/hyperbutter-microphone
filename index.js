'use strict';

const EventEmitter = require('events');
const record = require('node-record-lpcm16');
const util = require('util');

function Microphone(config, settings) {
  this.init = () => {
    this.emit('subscribe', {
      'audio-input': {
        start: this.start,
        stop: this.stop,
      },
    });
  };

  let mic;

  this.start = (callback) => {
    mic = record.start(config);
    mic.on('data', (data) => {
      if (callback) callback(null, data);
      this.emit('data', data);
    });
  };

  this.stop = (callback) => {
    record.stop();
    mic = undefined;
    if (callback) callback(null);
  };

  return this;
}

util.inherits(Microphone, EventEmitter);
module.exports = Microphone;
