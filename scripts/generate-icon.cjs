const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const W = 1024;
const H = 1024;
const pixels = Buffer.alloc(W * H * 4);

const bg = [245, 240, 230, 255];
const pine = [32, 63, 44, 255];
const gold = [180, 149, 85, 255];
const goldSoft = [216, 199, 155, 255];

function setPixel(x, y, rgba) {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  pixels[i] = rgba[0];
  pixels[i + 1] = rgba[1];
  pixels[i + 2] = rgba[2];
  pixels[i + 3] = rgba[3];
}

function fillCircle(cx, cy, r, rgba) {
  const r2 = r * r;
  for (let y = Math.max(0, cy - r); y < Math.min(H, cy + r); y++) {
    for (let x = Math.max(0, cx - r); x < Math.min(W, cx + r); x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= r2) setPixel(x, y, rgba);
    }
  }
}

function fillRect(x0, y0, x1, y1, rgba) {
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) setPixel(x, y, rgba);
  }
}

function drawRing(cx, cy, outer, inner, rgba) {
  const o2 = outer * outer;
  const i2 = inner * inner;
  for (let y = cy - outer; y < cy + outer; y++) {
    for (let x = cx - outer; x < cx + outer; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const d = dx * dx + dy * dy;
      if (d <= o2 && d >= i2) setPixel(x, y, rgba);
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
  pixels[o] = bg[0];
  pixels[o + 1] = bg[1];
  pixels[o + 2] = bg[2];
  pixels[o + 3] = 255;
}

fillCircle(512, 512, 355, pine);
drawRing(512, 512, 355, 341, gold);
drawRing(425, 500, 138, 108, goldSoft);
fillRect(302, 360, 340, 640, goldSoft);
drawRing(585, 525, 126, 98, gold);
fillRect(474, 397, 510, 653, gold);
drawStar(690, 685, 58, 13, goldSoft);

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
