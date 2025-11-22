import InputHandler from './InputHandler.js';
import Screen from './Screen.js';
import SpriteSheet from './SpriteSheet.js';
import Color from './Color.js';
import Level from './Level.js';
import Player from './Player.js';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.sheet = new SpriteSheet('/res/icons.png');
    this.screen = new Screen(this.width, this.height, this.sheet);

    this.input = new InputHandler();

    this.running = false;
    this.tickRate = 60;
    this._tickAccumulator = 0;
    this._lastTime = 0;

    this.tickCount = 0;
    this.gameTime = 0;

    this.init();
  }

  init() {
    // Minimal init: some background
    this.colors = [];
    let pp = 0;
    for (let r=0;r<6;r++) for (let g=0;g<6;g++) for (let b=0;b<6;b++) {
      const rr = Math.floor(r * 255 / 5);
      const gg = Math.floor(g * 255 / 5);
      const bb = Math.floor(b * 255 / 5);
      const mid = Math.floor((rr*30 + gg*59 + bb*11)/100);
      const r1 = Math.floor(((rr + mid) / 2) * 230 / 255 + 10);
      const g1 = Math.floor(((gg + mid) / 2) * 230 / 255 + 10);
      const b1 = Math.floor(((bb + mid) / 2) * 230 / 255 + 10);
      this.colors[pp++] = (r1 << 16) | (g1 << 8) | b1;
    }

    // Create level and player
    this.level = new Level(128, 128);
    this.player = new Player(this);
    this.player.x = 24;
    this.player.y = 24;
    this.level.add(this.player);
    this.setMenu(null);
  }

  setMenu(menu) {
    this.menu = menu;
    // future: menu.init(this, input);
  }

  start() {
    this.running = true;
    this._lastTime = performance.now();
    const loop = (time) => {
      if (!this.running) return;
      const dt = (time - this._lastTime) / 1000;
      this._lastTime = time;
      // accumulate ticks
      this._tickAccumulator += dt;
      const tickLen = 1/this.tickRate;
      while (this._tickAccumulator >= tickLen) {
        this.tick();
        this._tickAccumulator -= tickLen;
      }
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
  }

  tick() {
    this.tickCount++;
    this.input.tick();
    if (!this.menu) {
      this.gameTime++;
      if (this.level) this.level.tick();
    }
  }

  render() {
    this.screen.clear(0);
    // render level
    if (this.level) {
      const xScroll = this.player.x - this.screen.w / 2;
      const yScroll = this.player.y - (this.screen.h - 8) / 2;
      this.level.renderBackground(this.screen, xScroll, yScroll);
      this.level.renderSprites(this.screen, xScroll, yScroll);
    }
    // copy screen pixels to canvas
    const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    const buf = new Uint32Array(imageData.data.buffer);
    for (let i=0;i<this.screen.pixels.length;i++) {
      const v = this.screen.pixels[i];
      // v is 0-255 palette index; map through colors
      const color = this.colors[v] || 0;
      buf[i] = 0xff000000 | color; // alpha + rgb
    }
    this.ctx.putImageData(imageData, 0, 0);
  }
}
