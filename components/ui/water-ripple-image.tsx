'use client';

/**
 * WaterRippleImage — WebGL-эффект водной ряби поверх изображения.
 *
 * Адаптировано из исходного компонента:
 *  - холст заполняет родителя (ResizeObserver), а не весь экран через fixed;
 *  - режим fit="cover" для фоновых изображений (исходный — "contain");
 *  - рендер на паузе, когда блок вне экрана (IntersectionObserver);
 *  - prefers-reduced-motion → один статичный кадр;
 *  - фолбэк: CSS-фон, если WebGL или загрузка картинки недоступны;
 *  - убраны скрытый file-input и неиспользуемый проп showControls.
 */

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type RippleParams = {
  blueish: number;
  scale: number;
  illumination: number;
  surfaceDistortion: number;
  waterDistortion: number;
};

export type WaterRippleImageProps = Partial<RippleParams> & {
  /** Изображение (должно отдаваться с CORS-заголовками). */
  src?: string;
  /** cover — заполнить блок; contain — вписать целиком (как в оригинале). */
  fit?: 'contain' | 'cover';
  /** Масштаб UV: <1 приближает картинку, >1 отдаляет. */
  zoom?: number;
  /** Ограничение devicePixelRatio ради производительности. */
  maxDpr?: number;
  className?: string;
};

const DEFAULT_SRC =
  'https://cdn.21st.dev/assets/mirror/e7/e702fd6cb0650a2b72ccae34504b088191f3e2c2919e96041979779573843b67.jpg';

const DEFAULT_ZOOM = { contain: 1.4, cover: 0.9 } as const;

const VERT = `
precision mediump float;
varying vec2 vUv;
attribute vec2 a_position;
void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

varying vec2 vUv;
uniform sampler2D u_image_texture;
uniform float u_time;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_blueish;
uniform float u_scale;
uniform float u_illumination;
uniform float u_surface_distortion;
uniform float u_water_distortion;
uniform float u_cover;
uniform float u_zoom;

vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
  m = m*m;
  m = m*m;
  vec3 x = 2. * fract(p * C.www) - 1.;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130. * dot(m, g);
}

mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float surface_noise(vec2 uv, float t, float scale) {
  vec2 n = vec2(.1);
  vec2 N = vec2(.1);
  mat2 m = rotate2D(.5);
  for (int j = 0; j < 10; j++) {
    uv *= m;
    n *= m;
    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
    n += sin(q);
    N += cos(q) / scale;
    scale *= 1.2;
  }
  return (N.x + N.y + .1);
}

void main() {
  vec2 uv = vUv;
  uv.y = 1. - uv.y;
  uv.x *= u_ratio;

  float t = .002 * u_time;
  vec3 color = vec3(0.);
  float opacity = 0.;

  float outer_noise = snoise((.3 + .1 * sin(t)) * uv + vec2(0., .2 * t));
  vec2 surface_noise_uv = 2. * uv + (outer_noise * .2);

  float surf = surface_noise(surface_noise_uv, t, u_scale);
  surf *= pow(uv.y, .3);
  surf = pow(surf, 2.);

  vec2 img_uv = vUv - .5;
  if (u_cover > .5) {
    if (u_ratio > u_img_ratio) { img_uv.y *= u_img_ratio / u_ratio; }
    else { img_uv.x *= u_ratio / u_img_ratio; }
  } else {
    if (u_ratio > u_img_ratio) { img_uv.x *= u_ratio / u_img_ratio; }
    else { img_uv.y *= u_img_ratio / u_ratio; }
  }
  img_uv *= u_zoom;
  img_uv += .5;
  img_uv.y = 1. - img_uv.y;

  img_uv += (u_water_distortion * outer_noise);
  img_uv += (u_surface_distortion * surf);

  vec4 img = texture2D(u_image_texture, img_uv);
  img *= (1. + u_illumination * surf);

  color += img.rgb;
  color += u_illumination * vec3(1. - u_blueish, 1., 1.) * surf;
  opacity += img.a;

  float edge_width = .02;
  float edge_alpha = smoothstep(0., edge_width, img_uv.x) * smoothstep(1., 1. - edge_width, img_uv.x);
  edge_alpha *= smoothstep(0., edge_width, img_uv.y) * smoothstep(1., 1. - edge_width, img_uv.y);
  color *= edge_alpha;
  opacity *= edge_alpha;

  gl_FragColor = vec4(color, opacity);
}
`;

type Uniforms = Record<string, WebGLUniformLocation | null>;

type RippleContext = {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  buffer: WebGLBuffer | null;
  uniforms: Uniforms;
};

function compileShader(gl: WebGLRenderingContext, src: string, type: number): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Не удалось создать шейдер');
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Ошибка компиляции шейдера: ${info || 'unknown'}`);
  }
  return shader;
}

function createRippleContext(canvas: HTMLCanvasElement): RippleContext {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
  if (!gl) throw new Error('WebGL не поддерживается');
  if (gl.isContextLost()) throw new Error('WebGL-контекст потерян');

  const vertex = compileShader(gl, VERT, gl.VERTEX_SHADER);
  const fragment = compileShader(gl, FRAG, gl.FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error('Не удалось создать программу WebGL');
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Ошибка линковки программы: ${info || 'unknown'}`);
  }
  gl.useProgram(program);

  const uniforms: Uniforms = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  return { gl, program, buffer, uniforms };
}

function applyParams({ gl, uniforms }: RippleContext, params: RippleParams) {
  gl.uniform1f(uniforms['u_blueish'], params.blueish);
  gl.uniform1f(uniforms['u_scale'], params.scale);
  gl.uniform1f(uniforms['u_illumination'], params.illumination);
  gl.uniform1f(uniforms['u_surface_distortion'], params.surfaceDistortion);
  gl.uniform1f(uniforms['u_water_distortion'], params.waterDistortion);
}

function uploadTexture({ gl, uniforms }: RippleContext, image: HTMLImageElement): WebGLTexture | null {
  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(uniforms['u_image_texture'], 0);
  gl.uniform1f(uniforms['u_img_ratio'], image.naturalWidth / image.naturalHeight);
  return texture;
}

export default function WaterRippleImage({
  blueish = 0.6,
  scale = 7,
  illumination = 0.15,
  surfaceDistortion = 0.07,
  waterDistortion = 0.03,
  src = DEFAULT_SRC,
  fit = 'contain',
  zoom,
  maxDpr = 2,
  className = '',
}: WaterRippleImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<RippleContext | null>(null);
  const paramsRef = useRef<RippleParams>({ blueish, scale, illumination, surfaceDistortion, waterDistortion });

  // Параметры → uniforms (эффект объявлен первым, чтобы инициализация ниже видела свежие значения).
  useEffect(() => {
    paramsRef.current = { blueish, scale, illumination, surfaceDistortion, waterDistortion };
    if (ctxRef.current) applyParams(ctxRef.current, paramsRef.current);
  }, [blueish, scale, illumination, surfaceDistortion, waterDistortion]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    let ctx: RippleContext;
    try {
      ctx = createRippleContext(canvas);
    } catch (error) {
      console.error('[WaterRippleImage]', error);
      return; // остаётся CSS-фон
    }
    ctxRef.current = ctx;
    const { gl, uniforms } = ctx;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    let texture: WebGLTexture | null = null;
    let ready = false;
    let visible = true;
    let frame = 0;
    let disposed = false;

    gl.uniform1f(uniforms['u_cover'], fit === 'cover' ? 1 : 0);
    gl.uniform1f(uniforms['u_zoom'], zoom ?? DEFAULT_ZOOM[fit]);
    applyParams(ctx, paramsRef.current);

    const draw = (time: number) => {
      gl.uniform1f(uniforms['u_time'], time);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      if (disposed || !visible) {
        frame = 0;
        return;
      }
      draw(performance.now());
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!ready || disposed) return;
      if (reduceMotion) draw(0);
      else if (!frame) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      const w = Math.max(1, Math.floor(width * dpr));
      const h = Math.max(1, Math.floor(height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform1f(uniforms['u_ratio'], w / h);
      if (ready && reduceMotion) draw(0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    visibilityObserver.observe(wrapper);

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.decoding = 'async';
    image.onload = () => {
      if (disposed) return;
      texture = uploadTexture(ctx, image);
      ready = true;
      canvas.dataset.ready = 'true';
      start();
    };
    image.onerror = () => {
      console.error(`[WaterRippleImage] Не удалось загрузить изображение: ${src}`);
    };
    image.src = src;

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      image.onload = null;
      image.onerror = null;
      if (texture) gl.deleteTexture(texture);
      if (ctx.buffer) gl.deleteBuffer(ctx.buffer);
      gl.deleteProgram(ctx.program);
      // loseContext() не вызываем: в StrictMode тот же canvas монтируется повторно.
      ctxRef.current = null;
      delete canvas.dataset.ready;
    };
  }, [src, fit, zoom, maxDpr]);

  return (
    <div
      ref={wrapperRef}
      className={cn('relative h-full w-full overflow-hidden bg-cover bg-center', className)}
      style={{ backgroundImage: `url("${src}")` }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 ease-out data-[ready=true]:opacity-100"
      />
    </div>
  );
}

export { WaterRippleImage };
