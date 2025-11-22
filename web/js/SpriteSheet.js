export default class SpriteSheet {
  constructor(url){
    this.image = new Image();
    this.image.src = url;
    this.width = 0; this.height = 0; this.pixels = [];
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
      const canvas = document.createElement('canvas');
      canvas.width = this.width; canvas.height = this.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(this.image, 0, 0);
      const data = ctx.getImageData(0,0,this.width,this.height).data;
      const tmp = new Uint8Array(this.width*this.height);
      for (let i=0;i<this.width*this.height;i++){
        const r = data[i*4];
        const g = data[i*4+1];
        const b = data[i*4+2];
        // approximate conversion used in Java version: (rgb & 0xff)/64
        tmp[i] = Math.floor((r & 0xff)/64);
      }
      this.pixels = tmp;
    }
  }
}
