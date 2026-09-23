const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const W = 1024;
const H = 1024;
const pixels = Buffer.alloc(W * H * 4);

const offWhite = [230, 219, 198, 255];
const courtyard = [71, 88, 66, 255];
const brownedSugar = [194, 131, 95, 255];

function setPixel(x, y, rgba) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  pixels[i] = rgba[0];
  pixels[i + 1] = rgba[1];
  pixels[i + 2] = rgba[2];
  pixels[i + 3] = rgba[3];
}

function fillRect(x0, y0, x1, y1, rgba) {
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) setPixel(x, y, rgba);
  }
}

function drawD(cx, cy, scale, rgba) {
  const stemW = Math.floor(48 * scale);
  const stemH = Math.floor(360 * scale);
  const stemX = Math.floor(cx - 140 * scale);
  const stemY = Math.floor(cy - stemH / 2);
  fillRect(stemX, stemY, stemX + stemW, stemY + stemH, rgba);

  const outerR = Math.floor(180 * scale);
  const innerR = Math.floor(132 * scale);
  const centerX = Math.floor(stemX + stemW);
  const centerY = cy;

  for (let y = centerY - outerR; y <= centerY + outerR; y++) {
    for (let x = centerX; x <= centerX + outerR; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const d = dx * dx + dy * dy;
      if (d <= outerR * outerR && d >= innerR * innerR) setPixel(x, y, rgba);
    }
  }
}

function drawStar(cx, cy, longR, shortR, rgba) {
  for (let y = cy - longR; y <= cy + longR; y++) {
    for (let x = cx - longR; x <= cx + longR; x++) {
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      if ((dx <= shortR && dy <= longR - dx * 0.7) ||
          (dy <= shortR && dx <= longR - dy * 0.7)) {
        setPixel(x, y, rgba);
      }
    }
  }
}

for (let i = 0; i < W * H; i++) {
  const o = i * 4;
  pixels[o] = offWhite[0];
  pixels[o + 1] = offWhite[1];
  pixels[o + 2] = offWhite[2];
  pixels[o + 3] = 255;
}

drawD(470, 535, 1.0, courtyard);
drawStar(710, 300, 74, 16, brownedSugar);

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

const scan = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) {
  const row = y * (W * 4 + 1);
  scan[row] = 0;
  pixels.copy(scan, row + 1, y * W * 4, (y + 1) * W * 4);
}

const signature = Buffer.from([137,80,78,71,13,10,26,10]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 6;

const png = Buffer.concat([
  signature,
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(scan, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);

const out = path.join(__dirname, '..', 'assets', 'icon.png');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, png);
console.log('Generated', out);
