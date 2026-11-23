import{W as ce,S as de,P as ue,B as me,a as S,b as fe,A as ve,c as pe,V as te}from"./three.module-B2Vfmuxd.js";import{S as L}from"./index-Dv-JkEfu.js";const he=`
attribute vec4 aFrom;
attribute vec4 aTo;
attribute vec4 aRand;
uniform float uMix, uTime, uSize, uAlpha;
uniform vec2 uMouse;
varying float vGlow;
varying vec3 vCol;
void main() {
  float m = uMix;
  vec3 p = mix(aFrom.xyz, aTo.xyz, m);
  // scatter while travelling between shapes
  float mid = sin(3.14159 * m);
  p += (aRand.xyz - 0.5) * mid * 1.6;
  p += 0.035 * vec3(sin(uTime * 0.7 + aRand.x * 40.0), cos(uTime * 0.6 + aRand.y * 40.0), sin(uTime * 0.5 + aRand.z * 40.0));
  float flow = mix(aFrom.w, aTo.w, m);
  float pulse = pow(0.5 + 0.5 * sin(6.28318 * (flow * 3.0 - uTime * 0.22)), 18.0);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  // pointer pushes particles aside
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 d = ndc - uMouse;
  float f = exp(-dot(d, d) * 14.0);
  gl_Position.xy += normalize(d + 1e-5) * f * 0.09 * gl_Position.w;

  float c = fract(aRand.w * 0.45 + flow * 0.55 + uTime * 0.015);
  vec3 c1 = vec3(0.34, 0.36, 1.0), c2 = vec3(1.0, 0.30, 0.62), c3 = vec3(1.0, 0.72, 0.30);
  vCol = c < 0.5 ? mix(c1, c2, c * 2.0) : mix(c2, c3, (c - 0.5) * 2.0);
  vCol = mix(vCol, vec3(1.0, 0.9, 0.75), pulse * 0.45);
  vGlow = (0.42 + 0.5 * aRand.w + pulse * 0.55) * uAlpha;
  gl_PointSize = uSize * (0.5 + aRand.w * 0.9 + pulse * 0.8 + f * 1.2) / -mv.z;
}`,we=`
precision mediump float;
varying float vGlow;
varying vec3 vCol;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(vCol, a * a * vGlow * 0.72);
}`,xe=(p,r,s)=>{const h=Math.min(1,Math.max(0,(s-p)/(r-p)));return h*h*(3-2*h)};function ge(p,r){let s;try{s=new ce({canvas:p,antialias:!1,alpha:!0,powerPreference:"high-performance"})}catch{return null}const h=Math.min(window.innerWidth,window.innerHeight)<720,w=h?7e3:18e3;let m=Math.min(window.devicePixelRatio||1,h?1.5:2);s.setPixelRatio(m),s.setClearColor(0,0);const $=new de,f=new ue(45,1,.1,50);f.position.z=7;const M=L.map(e=>e.make(w)),x=new me,P=new S(new Float32Array(w*4),4),C=new S(new Float32Array(w*4),4),W=new Float32Array(w*4);for(let e=0;e<W.length;e++)W[e]=Math.random();x.setAttribute("position",new S(new Float32Array(w*3),3)),x.setAttribute("aFrom",P),x.setAttribute("aTo",C),x.setAttribute("aRand",new S(W,4));const c=new fe({vertexShader:he,fragmentShader:we,transparent:!0,depthTest:!1,depthWrite:!1,blending:ve,uniforms:{uMix:{value:0},uTime:{value:0},uSize:{value:1},uAlpha:{value:1},uMouse:{value:{x:9,y:9}}}}),d=new pe(x,c);d.frustumCulled=!1,$.add(d);const G=[];for(const[e,n]of Object.entries(r.labels||{}))for(const u of n){const o=document.createElement("div");o.className="gl-label",o.innerHTML=u.html,r.labelLayer.appendChild(o),G.push({el:o,idx:+e,pos:new te(...u.pos),shown:!1})}let y=0,a=0,b=1,g=!0;function A(){y=window.innerWidth,a=window.innerHeight,b=y/a,g=y>=960,s.setPixelRatio(m),s.setSize(y,a,!1),f.aspect=b,f.updateProjectionMatrix(),c.uniforms.uSize.value=a*m*.021,D()}let v=[];function D(){v=[...document.querySelectorAll("[data-scene]")].map(e=>{const n=e.getBoundingClientRect();return{i:+e.dataset.scene,top:n.top+window.scrollY}}).sort((e,n)=>e.i-n.i)}function ne(){if(!v.length)return 0;const e=window.scrollY+a*.5;for(let n=0;n<v.length-1;n++){const u=v[n],o=v[n+1];if(e<o.top+a*.15)return u.i+xe(o.top-a*.55,o.top+a*.15,e)*(o.i-u.i)}return v[v.length-1].i}let _=-1;function oe(e){e!==_&&(P.array.set(M[e]),C.array.set(M[Math.min(e+1,M.length-1)]),P.needsUpdate=!0,C.needsUpdate=!0,_=e)}const t={x:9,y:9,sx:0,sy:0};function I(e){t.x=e.clientX/y*2-1,t.y=-(e.clientY/a)*2+1}function X(){t.x=9,t.y=9}let l=0,z=0,B=0,V=0,E=!1,j=0,R=0,q=60;const H=new te;function O(e){const n=Math.min(.05,Math.max(.001,(e-B)/1e3||.016));B=e;const u=ne();r.reduced?l=Math.round(u):(l+=(u-l)*Math.min(1,n*5),z+=n),l=Math.min(M.length-1,Math.max(0,l));const o=Math.min(Math.floor(l),M.length-1);oe(o);const K=l-o,Q=L[o],ie=L[Math.min(o+1,L.length-1)],F=i=>Q[i]+(ie[i]-Q[i])*K,ae=g?1:Math.max(.5,b*.95),re=Math.tan(f.fov*Math.PI/360)*f.position.z*b;c.uniforms.uMix.value=K,c.uniforms.uTime.value=z,c.uniforms.uAlpha.value=F("a")*(g?1:.42);const se=t.x>2?0:t.x,le=t.y>2?0:t.y;t.sx+=(se-t.sx)*.05,t.sy+=(le-t.sy)*.05,c.uniforms.uMouse.value.x=t.x,c.uniforms.uMouse.value.y=t.y;const Z=F("spin");d.position.x=g?F("x")*re:0,d.scale.setScalar(F("s")*ae),d.rotation.y=Math.sin(z*.16)*.22*Math.min(Z,1)+z*.06*Math.max(0,Z-1)+t.sx*.25,d.rotation.x=-t.sy*.12,d.updateMatrixWorld(),s.render($,f);for(const i of G){const ee=g?Math.max(0,1-Math.abs(l-i.idx)*3):0;if(ee<=.01){i.shown&&(i.el.style.opacity=0,i.shown=!1);continue}H.copy(i.pos).applyMatrix4(d.matrixWorld).project(f),i.el.style.opacity=ee,i.el.style.transform=`translate3d(${(H.x+1)/2*y}px, ${(1-H.y)/2*a}px, 0)`,i.shown=!0}j+=n,R++,R>=90&&(q=R/j,j=0,R=0,q<42&&m>1&&(m=Math.max(1,m-.5),A())),E&&(V=requestAnimationFrame(O))}function U(){E||r.reduced||document.hidden||(E=!0,B=performance.now(),V=requestAnimationFrame(O))}function Y(){E=!1,cancelAnimationFrame(V)}function k(){document.hidden?Y():U()}let N=0;function T(){cancelAnimationFrame(N),N=requestAnimationFrame(O)}const J=new ResizeObserver(()=>{D(),r.reduced&&T()});return J.observe(document.body),window.addEventListener("resize",A),document.addEventListener("visibilitychange",k),p.addEventListener("webglcontextlost",e=>{e.preventDefault(),Y()}),p.addEventListener("webglcontextrestored",()=>{_=-1,U()}),r.reduced?window.addEventListener("scroll",T,{passive:!0}):(window.addEventListener("pointermove",I,{passive:!0}),document.documentElement.addEventListener("pointerleave",X)),A(),r.reduced?T():U(),{stats:()=>({fps:Math.round(q),pixelRatio:m,particles:w,t:l}),dispose(){Y(),cancelAnimationFrame(N),J.disconnect(),window.removeEventListener("resize",A),window.removeEventListener("scroll",T),window.removeEventListener("pointermove",I),document.documentElement.removeEventListener("pointerleave",X),document.removeEventListener("visibilitychange",k),G.forEach(e=>e.el.remove()),x.dispose(),c.dispose(),s.dispose()}}}export{ge as createField};
