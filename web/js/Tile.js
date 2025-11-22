import Color from './Color.js';
export default class Tile {
  constructor(id, color) {
    this.id = id; this.color = color;
  }
  render(screen, level, x, y) {
    // Render a simple 8x8 block of a palette color
    const xp = x*8; const yp = y*8;
    for (let yy=0; yy<8; yy++){
      for (let xx=0; xx<8; xx++){
        screen.pixels[xp + xx + (yp+yy)*screen.w] = this.color;
      }
    }
  }
}
