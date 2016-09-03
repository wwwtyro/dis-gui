
import noise3d from './noise3d';

export default function createFractal(regl) {

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

      float noise(vec3 p) {
        float scale = 1.0;
        float mag = 1.0;
        float total = 1.0;
        float n = 0.0;
        for (int i = 0; i < 7; i++) {
          n += mag * (0.5 * snoise(p * scale) + 0.5);
          total += mag;
          mag *= 0.5;
          scale *= 2.0;
        }
        return n/total;
      }

      void main() {
        float v = noise(vec3(vUV * uRes * uScale + uOffset, uTime));
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
      uOffset: regl.prop('uOffset'),
      uRes: function (context, props) {return [props.width/1000, props.height/1000]}
    },

    count: 6,

    viewport: {x: 0, y: 0, width: regl.prop('width'), height: regl.prop('height')}
  });

  return drawScene;

}
