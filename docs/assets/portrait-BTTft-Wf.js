import{W as b,S as L,O as E,b as F,M as H,e as S,T as P,L as U}from"./three.module-Deb1WiIl.js";const z="varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",A=`
precision mediump float;
uniform sampler2D uTex;
uniform float uTime, uHover, uReveal;
uniform vec2 uMouse;
varying vec2 vUv;
float hash(float n){ return fract(sin(n * 91.345) * 47453.5453); }
void main(){
  vec2 uv = vUv;
  vec2 d = uv - uMouse;
  float r = length(d);
  float ripple = sin(r * 26.0 - uTime * 5.0) * exp(-r * 5.0) * uHover;
  uv += normalize(d + 1e-5) * ripple * 0.012;
  uv.x += sin(uv.y * 9.0 + uTime * 0.9) * 0.0014;
  float n = hash(floor(vUv.y * 36.0));
  float rv = smoothstep(0.0, 1.0, uReveal * 1.7 - n * 0.7);
  uv.x += (1.0 - rv) * (n - 0.5) * 0.6;
  float ca = ripple * 0.006 + (1.0 - rv) * 0.03;
  vec3 col = vec3(texture2D(uTex, uv + vec2(ca, 0.0)).r, texture2D(uTex, uv).g, texture2D(uTex, uv - vec2(ca, 0.0)).b);
  col += vec3(1.0, 0.75, 0.5) * 0.07 * exp(-r * r * 14.0) * uHover;
  gl_FragColor = vec4(col, rv);
}`;function D(n,M,c){let i;try{i=new b({canvas:n,alpha:!0,antialias:!1,premultipliedAlpha:!1})}catch{return null}i.setPixelRatio(Math.min(window.devicePixelRatio||1,2));const m=new L,R=new E(-1,1,1,-1,0,1),t={uTex:{value:null},uTime:{value:0},uHover:{value:0},uReveal:{value:0},uMouse:{value:{x:.5,y:.5}}},d=new F({vertexShader:z,fragmentShader:A,uniforms:t,transparent:!0});m.add(new H(new S(2,2),d));let p=!0,v=0,o=0,l=0,f=!1,s=!1;const h=()=>{const e=n.getBoundingClientRect();e.width&&i.setSize(e.width,e.height,!1)},x=new ResizeObserver(h);x.observe(n);const g=new IntersectionObserver(([e])=>{p=e.isIntersecting,a()});g.observe(n);function y(e){o=0;const r=Math.min(.05,Math.max(.001,(e-l)/1e3||.016));l=e,t.uTime.value+=r,t.uReveal.value=Math.min(1,t.uReveal.value+r/1.5),t.uHover.value+=(v-t.uHover.value)*Math.min(1,r*4),i.render(m,R),a()}function a(){!o&&f&&p&&!document.hidden&&!s&&(l=performance.now(),o=requestAnimationFrame(y))}const u=n.parentElement,T=e=>{const r=n.getBoundingClientRect();t.uMouse.value.x=(e.clientX-r.left)/r.width,t.uMouse.value.y=1-(e.clientY-r.top)/r.height,v=1},w=()=>{v=0};return u.addEventListener("pointermove",T),u.addEventListener("pointerleave",w),document.addEventListener("visibilitychange",a),new P().load(M,e=>{s||(e.minFilter=U,e.generateMipmaps=!1,t.uTex.value=e,f=!0,h(),c&&c(),a())}),()=>{s=!0,cancelAnimationFrame(o),x.disconnect(),g.disconnect(),u.removeEventListener("pointermove",T),u.removeEventListener("pointerleave",w),document.removeEventListener("visibilitychange",a),t.uTex.value&&t.uTex.value.dispose(),d.dispose(),i.dispose()}}export{D as createPortrait};
