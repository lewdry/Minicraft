import Tile from './Tile.js';
import Entity from './Entity.js';

export default class Level {
  constructor(w,h) {
    this.w = w; this.h = h;
    this.tiles = new Array(w * h).fill(0);
    this.data = new Array(w * h).fill(0);
    this.entities = [];

    // simple tile types: grass and dirt
    this.tileTypes = [new Tile(0, 141), new Tile(1, 322)];

    for (let i=0;i<w*h;i++) {
      this.tiles[i] = (Math.random() < 0.05) ? 1 : 0;
    }

    this.entitiesInTiles = new Array(w*h);
    for (let i=0;i<w*h;i++) this.entitiesInTiles[i] = [];
  }

  add(entity) {
    entity.removed = false; this.entities.push(entity); entity.init(this);
    const xt = entity.x >> 4; const yt = entity.y >> 4;
    this.entitiesInTiles[xt + yt * this.w].push(entity);
  }

  tick() {
    for (let i=0;i<this.entities.length;i++){
      this.entities[i].tick();
    }
  }

  renderBackground(screen, xScroll, yScroll) {
    const xo = xScroll >> 4; const yo = yScroll >> 4;
    const w = (screen.w + 15) >> 4; const h = (screen.h + 15) >> 4;
    screen.setOffset(xScroll, yScroll);
    for (let y=yo; y<=h+yo; y++){
      for (let x=xo; x<=w+xo; x++){
        if (x<0||y<0||x>=this.w||y>=this.h) continue;
        const t = this.tileTypes[this.tiles[x + y * this.w]];
        t.render(screen, this, x, y);
      }
    }
    screen.setOffset(0,0);
  }

  renderSprites(screen, xScroll, yScroll) {
    screen.setOffset(xScroll, yScroll);
    for (let e of this.entities) e.render(screen);
    screen.setOffset(0,0);
  }
}
