export default class Screen {
  constructor(w,h,sheet){
    this.w = w; this.h = h; this.sheet = sheet;
    this.pixels = new Uint8Array(w*h);
    this.xOffset = 0; this.yOffset = 0;
  }

  clear(col){
    this.pixels.fill(col);
  }

  setOffset(x,y){this.xOffset = x; this.yOffset = y;}

  render(xp, yp, tile, cols, bits){
    xp -= this.xOffset; yp -= this.yOffset;
    const mirrorX = (bits & 0x01) !== 0;
    const mirrorY = (bits & 0x02) !== 0;
    const xTile = tile % 32; const yTile = Math.floor(tile/32);

    const toffs = xTile*8 + yTile*8*this.sheet.width;
    for (let y=0;y<8;y++){
      let ys = mirrorY ? 7-y : y;
      if (y + yp < 0 || y + yp >= this.h) continue;
      for (let x=0;x<8;x++){
        if (x + xp < 0 || x + xp >= this.w) continue;
        let xs = mirrorX ? 7-x : x;
        const col = (cols >> (this.sheet.pixels[xs + ys*this.sheet.width + toffs] * 8)) & 255;
        if (col < 255) this.pixels[(x + xp) + (y + yp)*this.w] = col;
      }
    }
  }

  overlay(screen2, xa, ya){
    const o = screen2.pixels; const dither = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
    let i=0;
    for (let y=0;y<this.h;y++){
      for (let x=0;x<this.w;x++){
        if ( (o[i] / 10) <= dither[((x+xa)&3) + ((y+ya)&3)*4] ) this.pixels[i] = 0;
        i++;
      }
    }
  }

  renderLight(x,y,r){
    x -= this.xOffset; y -= this.yOffset;
    let x0 = Math.max(0, x-r), x1 = Math.min(this.w, x+r);
    let y0 = Math.max(0, y-r), y1 = Math.min(this.h, y+r);
    for (let yy=y0; yy<y1; yy++){
      const yd = (yy-y)*(yy-y);
      for (let xx=x0; xx<x1; xx++){
        const xd = (xx-x)*(xx-x);
        const dist = xd + yd;
        if (dist <= r*r){
          const br = 255 - (dist * 255 / (r*r));
          if (this.pixels[xx + yy*this.w] < br) this.pixels[xx + yy*this.w] = br;
        }
      }
    }
  }
}
