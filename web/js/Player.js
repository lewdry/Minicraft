import Entity from './Entity.js';

export default class Player extends Entity {
  constructor(game) {
    super();
    this.game = game;
    this.input = game.input;
    this.x = 24; this.y = 24;
    this.color = 200; // palette index
  }

  tick() {
    const speed = 1;
    let xa = 0; let ya = 0;
    if (this.input.up.down) ya--;
    if (this.input.down.down) ya++;
    if (this.input.left.down) xa--;
    if (this.input.right.down) xa++;
    this.x += xa * speed;
    this.y += ya * speed;
    // keep inside level
    if (this.x < 8) this.x = 8;
    if (this.y < 8) this.y = 8;
    if (this.x > (this.level.w*16 - 8)) this.x = this.level.w*16 - 8;
    if (this.y > (this.level.h*16 - 8)) this.y = this.level.h*16 - 8;
  }

  render(screen) {
    const xo = this.x - 8; const yo = this.y - 11;
    // draw 2x2 tiles for player body (8x8 sprites, we draw two tiles)
    for (let yy=0; yy<2; yy++){
      for (let xx=0; xx<2; xx++){
        for (let ty=0; ty<8; ty++){
          for (let tx=0; tx<8; tx++){
            const px = xo + xx*8 + tx;
            const py = yo + yy*8 + ty;
            if (px>=0 && px<screen.w && py>=0 && py<screen.h)
              screen.pixels[px + py*screen.w] = this.color;
          }
        }
      }
    }
  }
}
