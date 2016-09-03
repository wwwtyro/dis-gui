
export function updateCanvas(stops, canvas) {
  let ctx = canvas.getContext('2d');
  for (var x = 0; x < canvas.width; x++) {
    let frac = x/(canvas.width - 1);
    let c = getValue(stops, frac);
    ctx.fillStyle = `rgb(${c.red}, ${c.green}, ${c.blue})`;
    ctx.fillRect(x, 0, 1, 1);
  }
}

export function random() {
  let count = Math.round(Math.random() * 8 + 16);
  let stops = [];
  for (let i = 0; i < count; i++) {
    let red = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    let stop = i/(count - 1);
    stops.push({ red: red, green: green, blue: blue, stop: stop });
  }
  return stops;
}

function getValue(stops, frac) {
  for (let i = 0; i < stops.length - 1; i++) {
    if (frac >= stops[i].stop && frac <= stops[i + 1].stop) {
      let left = stops[i];
      let right = stops[i + 1];
      let ifrac = (frac - left.stop)/(right.stop - left.stop);
      return {
        red: Math.round(left.red + ifrac * (right.red - left.red)),
        green: Math.round(left.green + ifrac * (right.green - left.green)),
        blue: Math.round(left.blue + ifrac * (right.blue - left.blue)),
      }
    }
  }
}
