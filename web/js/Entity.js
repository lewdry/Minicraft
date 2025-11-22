export default class Entity {
  constructor() {
    this.x = 0; this.y = 0; this.removed = false; this.level = null;
  }
  init(level) { this.level = level; }
  tick() {}
  render(screen) {}
  intersects(x0,y0,x1,y1) { return false; }
}
