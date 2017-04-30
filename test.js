const Microphone = require('./index');
const mic = new Microphone({ sampleRate: 16000, threshold: 0 });
mic.on('data', console.log);

console.log('Opening the mic for 5 seconds with 0 threshold');
mic.start();
setTimeout(() => {
  mic.stop();
  console.log('\n\nTest passed!');
  process.exit();
}, 5000);
