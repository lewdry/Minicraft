# Minicraft (JS rewrite)

This workspace contains a minimal JavaScript rewrite of Minicraft crawling from the original Java sources (for reference).

Features in this first pass:
- Basic game loop (60Hz tick) and rendering via an 8-bit palette-based `Screen` class
- Sprite sheet loader
- Keyboard input mapping (WASD/arrow + attack + menu)

How to run locally:

1. Install `serve` or use npx to run the built-in static server:

```bash
npm install -g serve
# or
npm start
```

2. Open http://localhost:8080 in your browser

Next steps:
- Port `Level`, `Tile`, `Player` and entity logic from Java
- Port `LevelGen` and other game mechanics
- Add sound and resource handling (WAV files in `/res`)

If you want me to continue and port individual classes, tell me which modules you want first (LevelGen / Tiles / Player / Entities / Inventory / Crafting / GUI etc.).

Planned next steps:
- Port `LevelGen` and `Tile` set (underground, rock, stairs)
- Port `Entity` types (Zombie, Slime, AirWizard) and `Player` mechanics (attack, items, inventory)
- Port crafting and GUI screens to recreate game experience
Feel free to pick a prioritized feature and I'll continue the port with tests and documentation.
