export default class Color {
  static get(d) {
    if (d < 0) return 255;
    const r = Math.floor(d / 100 % 10);
    const g = Math.floor(d / 10 % 10);
    const b = Math.floor(d % 10);
    return r * 36 + g * 6 + b;
  }
  static get4(a,b,c,d){
    return (Color.get(d) << 24) + (Color.get(c) << 16) + (Color.get(b) << 8) + (Color.get(a));
  }
}
