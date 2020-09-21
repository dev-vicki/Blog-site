const fs = require('fs');

const readstream = fs.createReadStream('./docs/blog2.txt', {encoding: 'utf-8'});
const writestream = fs.createWriteStream('./docs/blog3.txt');

// readstream.on('data', (chunk) => {
//   console.log('----------NEW CHUNK ---------');
//   console.log(chunk);
//   writestream.write('\nNEW CHUNK\n');
//   writestream.write(chunk);
// });

// piping
readstream.pipe(writestream);