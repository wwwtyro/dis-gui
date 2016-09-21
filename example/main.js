'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import mat4 from 'gl-mat4';
import REGL from 'regl';

import createFractal from './fractal';
import createSmooth from './smooth';
import * as gradient from './gradient';
import Demo from './demo.jsx';

window.onload = function() {

  // Initialize the canvas.
  let canvas = document.getElementById('demo');
  canvas.width = canvas.clientWidth/2;
  canvas.height = canvas.clientHeight/2;

  // Initialize the REGL context.
  const regl = REGL(canvas);
  window.regl = regl;

  // Initialize the renderers.
  let drawSmooth = createSmooth(regl);
  let drawFractal = createFractal(regl);

  // Initialize the control variables.
  let text = 'dis-gui';
  let textColor = {red: 255, green: 255, blue: 255};
  let scale = 3.0;
  let initialStops = gradient.random();
  let noise = 'Smooth';
  let speed = 0.005;
  let translate = false;

  // Initialize the time.
  let time = 0.0;

  // Initialize the gradient texture.
  let gradientCanvas = document.createElement('canvas');
  Object.assign(gradientCanvas, {width: 512, height: 1});
  gradient.updateCanvas(initialStops, gradientCanvas);
  let gradientTexture = regl.texture();
  gradientTexture({ data: gradientCanvas });

  // Create the dis-gui event handlers.
  function onChangeScale(value) {
    scale = value;
  }

  function onChangeSpeed(value) {
    speed = value;
  }

  function onChangeGradient(value) {
    gradient.updateCanvas(value, gradientCanvas);
    gradientTexture({ data: gradientCanvas });
  }

  function onChangeText(value) {
    document.getElementById('text').innerText = value;
  }

  function onChangeTextColor(value) {
    let style = document.getElementById('text').style;
    let color = `rgb(${value.red}, ${value.green}, ${value.blue})`;
    style.color = color;
    style.textShadow = `${color} 0 0 128px, ${color} 0 0 64px, ${color} 0 0 32px, ${color} 0 0 16px, ${color} 0 0 8px`;
  }

  function onChangeTranslate(value) {
    translate = value;
  }

  function onChangeNoise(value) {
    noise = value;
  }

  // Render the dis-gui controls.
  ReactDOM.render(
    <Demo
      text={text}
      onChangeText={onChangeText}
      textColor={textColor}
      onChangeTextColor={onChangeTextColor}
      scale={scale}
      onChangeScale={onChangeScale}
      speed={speed}
      onChangeSpeed={onChangeSpeed}
      translate={translate}
      onChangeTranslate={onChangeTranslate}
      gradient={initialStops}
      onChangeGradient={onChangeGradient}
      noise={noise}
      onChangeNoise={onChangeNoise}
    />,
    document.getElementById('gui')
  );

  // Initialize the transforms.
  let model = mat4.create();
  let view = mat4.create();
  let projection = mat4.create();

  // Rendering function.
  function renderFrame() {
    canvas.width = canvas.clientWidth/2;
    canvas.height = canvas.clientHeight/2;

    time += speed;
    regl.clear({
      color: [0, 0, 0, 0],
      depth: 1
    });
    let renderFunction = {'Smooth': drawSmooth, 'Fractal': drawFractal}[noise];
    renderFunction({
      uScale: scale,
      uTime: time,
      uTexture: gradientTexture,
      uOffset: translate ?
               [Math.cos(time/10) * 100.0, Math.sin(time/10) * 100.0] :
               [0, 0],
      width: canvas.width,
      height: canvas.height
    });
    requestAnimationFrame(renderFrame);
  };

  // Kick off the render loop.
  renderFrame();

}
