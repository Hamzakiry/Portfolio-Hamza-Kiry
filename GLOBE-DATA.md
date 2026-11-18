# Globe geographic data

`src/data/earthLand.json` contains rounded land-polygon coordinates from Natural Earth, 1:110m land, public domain.

Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson

Terms: https://www.naturalearthdata.com/about/terms-of-use/

The contact globe renders locally with browser WebGL, without external requests or added libraries. Land coordinates are sampled into a local point cloud; oceans use a sparse, dimmer set of dots. The mint-to-blue shading and slow rotation match the selected point-globe concept. Rotation pauses outside the viewport, when the tab is hidden, or using the visible pause control. Reduced-motion preferences show a static globe.
