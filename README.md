# EchoVR-Overlay

## Build from source
```
git clone https://github.com/DavidDriessen/EchoVR-Overlay.git
cd EchoVR-Overlay
npm install
npm run build
```

## Usage

Put `file:///C/location/of/build/index.html` in a browser component of OBS.

For options append the link with `?` and the options you want.
Separate the options with `&`.

For example: `file:///C/location/of/build/index.html?miniMap&mapSize=0.5`.

### Options
- #### miniMap
    Enable mini-map.
- #### mapSize
    Sets the size of the mini-map. Example: `0.3`.
- #### mapPos
    Sets the position of the mini-map. Available values are:
    - `bl` Bottom Left.
    - `br` Bottom Right. Default
- #### blue
    Name of the blue team.
- #### orange
    Name of the orange team.
