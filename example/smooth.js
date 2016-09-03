
import noise3d from './noise3d';

export default function createSmooth(regl) {

  const drawScene = regl({
    vert: `
      precision mediump float;
      attribute vec2 aPosition;
      varying vec2 vUV;

      void main() {
        gl_Position = vec4(aPosition, 0, 1);
        vUV = aPosition;
      }`,

    frag: `
      precision mediump float;

      uniform float uScale;
      uniform float uTime;
      uniform sampler2D uTexture;
      uniform vec2 uOffset;
      uniform vec2 uRes;
      varying vec2 vUV;

      ${noise3d}

      void main() {
        float v = 0.5 * snoise(vec3(vUV * uRes * uScale + uOffset, uTime)) + 0.5;
        vec3 rgb = texture2D(uTexture, vec2(v, 0.0)).rgb;
        gl_FragColor = vec4(rgb, 1.0);
      }`,

    attributes: {
      aPosition: regl.buffer([-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1])
    },

    uniforms: {
      uScale: regl.prop('uScale'),
      uTime: regl.prop('uTime'),
      uTexture: regl.prop('uTexture'),
      uAspect: regl.prop('uAspect'),
      uOffset: regl.prop('uOffset'),
      uRes: function (context, props) {return [props.width/1000, props.height/1000]}
    },

    count: 6,

    viewport: {x: 0, y: 0, width: regl.prop('width'), height: regl.prop('height')}
  });

  return drawScene;

}
