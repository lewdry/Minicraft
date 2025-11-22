export default class InputHandler {
  constructor() {
    this.keys = [];
    this.up = this._createKey();
    this.down = this._createKey();
    this.left = this._createKey();
    this.right = this._createKey();
    this.attack = this._createKey();
    this.menu = this._createKey();

    this._onKeyDown = (e) => this._toggle(e.code, true);
    this._onKeyUp = (e) => this._toggle(e.code, false);
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
  }

  _createKey(){
    const key = {presses:0, absorbs:0, down:false, clicked:false};
    this.keys.push(key);
    return key;
  }

  _toggle(code, pressed){
    if (['KeyW','ArrowUp','Numpad8'].includes(code)) this.up = this._set(this.up, pressed);
    if (['KeyS','ArrowDown','Numpad2'].includes(code)) this.down = this._set(this.down, pressed);
    if (['KeyA','ArrowLeft','Numpad4'].includes(code)) this.left = this._set(this.left, pressed);
    if (['KeyD','ArrowRight','Numpad6'].includes(code)) this.right = this._set(this.right, pressed);
    if (['Space','ControlLeft','ControlRight','Numpad0','Insert'].includes(code)) this.attack = this._set(this.attack, pressed);
    if (['Tab','AltLeft','AltRight','Enter','KeyX'].includes(code)) this.menu = this._set(this.menu, pressed);
  }

  _set(key, pressed) {
    if (pressed !== key.down) key.down = pressed;
    if (pressed) key.presses++;
    return key;
  }

  tick(){
    for (const k of this.keys){
      if (k.absorbs < k.presses) { k.absorbs++; k.clicked = true; } else k.clicked = false;
    }
  }

  releaseAll(){
    for (const k of this.keys) k.down = false;
  }
}
