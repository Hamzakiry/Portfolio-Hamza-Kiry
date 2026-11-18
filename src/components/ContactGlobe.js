import { useEffect, useRef, useState } from "react";
import { Pause, Play, MapPin } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/Language";
import land from "../data/earthLand.json";

const vertexSource = `
 attribute vec3 aPosition; attribute vec3 aNormal; attribute vec2 aUv;
 uniform float uRotation; uniform float uTilt; uniform float uAspect;
 varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv;
 vec3 rotate(vec3 p) {
  float c=cos(uRotation),s=sin(uRotation); p=vec3(c*p.x+s*p.z,p.y,-s*p.x+c*p.z);
  c=cos(uTilt);s=sin(uTilt);return vec3(p.x,c*p.y-s*p.z,s*p.y+c*p.z);
 }
 void main(){vec3 p=rotate(aPosition);vNormal=rotate(aNormal);vPosition=p;vUv=aUv;gl_Position=vec4(p.x*.72/uAspect,p.y*.72,-p.z*.2,1.0);}
`;
const fragmentSource = `
 precision mediump float;
 varying vec3 vNormal; varying vec3 vPosition; varying vec2 vUv;
 uniform sampler2D uMap; uniform float uRibbon;
 void main(){vec3 normal=normalize(vNormal);float light=max(dot(normal,normalize(vec3(-.65,.8,1.4))),0.0);
 vec3 color=texture2D(uMap,vUv).rgb;
 if(uRibbon>.5)color=mix(vec3(.13,.26,.37),vec3(.60,.75,.66),clamp(vPosition.y*.45+.55,0.0,1.0));
 color*=.28+light*.8;
 float rim=pow(1.0-abs(normal.z),3.0);color+=vec3(.17,.35,.44)*rim*(1.0-uRibbon)*.7;
 gl_FragColor=vec4(color,1.0);}
`;
function createTexture() {
 const canvas=document.createElement("canvas");canvas.width=1024;canvas.height=512;
 const ctx=canvas.getContext("2d");ctx.fillStyle="#142633";ctx.fillRect(0,0,1024,512);
 ctx.fillStyle="#739879";ctx.strokeStyle="#8faf8a";ctx.lineWidth=.6;
 land.forEach(polygon=>{ctx.beginPath();polygon.forEach(ring=>{ring.forEach(([lon,lat],i)=>{const x=(lon+180)/360*1024,y=(90-lat)/180*512;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.closePath();});ctx.fill('evenodd');ctx.stroke();});
 ctx.strokeStyle="rgba(170,208,204,.10)";ctx.lineWidth=.6;
 for(let x=0;x<=1024;x+=1024/12){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,512);ctx.stroke();}
 for(let y=0;y<=512;y+=512/6){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(1024,y);ctx.stroke();}
 return canvas;
}
function sphereMesh(){const vertices=[],indices=[];const rows=48,cols=80;
 for(let row=0;row<=rows;row++){const lat=-Math.PI/2+row/rows*Math.PI;for(let col=0;col<=cols;col++){const lon=col/cols*Math.PI*2;const x=Math.cos(lat)*Math.cos(lon),y=Math.sin(lat),z=Math.cos(lat)*Math.sin(lon);vertices.push(x,y,z,x,y,z,col/cols,1-row/rows);}}
 for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){const a=row*(cols+1)+col,b=a+cols+1;indices.push(a,b,a+1,b,b+1,a+1);}return{vertices,indices};
}
function ribbonMesh(){const vertices=[],indices=[];const count=100;
 for(let band=0;band<7;band++){const lat=-.91+band*.3,base=vertices.length/8;
 for(let i=0;i<=count;i++){const lon=i/count*Math.PI*2;for(let side=0;side<2;side++){const a=lat+(side-.5)*.064;const x=Math.cos(a)*Math.cos(lon)*1.21,y=Math.sin(a)*1.21,z=Math.cos(a)*Math.sin(lon)*1.21;const turn=.27;const nx=x*Math.cos(turn)-y*Math.sin(turn),ny=x*Math.sin(turn)+y*Math.cos(turn);const ry=ny*Math.cos(.58)-z*Math.sin(.58),rz=ny*Math.sin(.58)+z*Math.cos(.58);vertices.push(nx,ry,rz,nx/1.21,ry/1.21,rz/1.21,i/count,side);}}
 for(let i=0;i<count;i++){if(i%33>28)continue;const a=base+i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}}
 return{vertices,indices};}
function mountGlobe(canvas, status) {
 const gl=canvas.getContext("webgl",{alpha:true,antialias:true,powerPreference:"low-power"});
 if(!gl)throw Error("WebGL unavailable");
 const resources=[];
 const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Shader unavailable');resources.push(()=>gl.deleteShader(s));return s;};
 const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertexSource));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragmentSource));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Globe unavailable');gl.useProgram(program);resources.push(()=>gl.deleteProgram(program));
 const attributes=['aPosition','aNormal','aUv'].map(name=>gl.getAttribLocation(program,name));
 const uniforms=Object.fromEntries(['uRotation','uTilt','uAspect','uMap','uRibbon'].map(name=>[name,gl.getUniformLocation(program,name)]));
 function mesh(data){const vertex=gl.createBuffer(),index=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vertex);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data.vertices),gl.STATIC_DRAW);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data.indices),gl.STATIC_DRAW);resources.push(()=>{gl.deleteBuffer(vertex);gl.deleteBuffer(index);});return{vertex,index,count:data.indices.length};}
 const earth=mesh(sphereMesh()),ribbons=mesh(ribbonMesh());
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,createTexture());gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);resources.push(()=>gl.deleteTexture(texture));gl.uniform1i(uniforms.uMap,0);gl.enable(gl.DEPTH_TEST);
 let frame=0,last=0,angle=.45,drag=0,visible=false,width=1,height=1,disposed=false;
 function draw(now){frame=0;if(disposed||!visible||document.hidden||gl.isContextLost())return;if(last&&status.current.running)angle+=Math.min(now-last,50)*.00013;last=now;
 gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform1f(uniforms.uRotation,angle+drag);gl.uniform1f(uniforms.uTilt,-.14);gl.uniform1f(uniforms.uAspect,width/height);
 function render(item,ribbon){gl.bindBuffer(gl.ARRAY_BUFFER,item.vertex);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,item.index);attributes.forEach((location,i)=>{gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,i===2?2:3,gl.FLOAT,false,32,i===0?0:i===1?12:24);});gl.uniform1f(uniforms.uRibbon,ribbon);gl.drawElements(gl.TRIANGLES,item.count,gl.UNSIGNED_SHORT,0);}
 render(earth,0);render(ribbons,1);if(status.current.running)frame=requestAnimationFrame(draw);
 }
 const wake=()=>{last=0;if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(draw);};
 const resize=new ResizeObserver(()=>{const rect=canvas.getBoundingClientRect();width=rect.width||1;height=rect.height||1;const ratio=Math.min(window.devicePixelRatio||1,1.75);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);wake();});resize.observe(canvas);
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;last=0;}},{rootMargin:'30px'});intersection.observe(canvas);
 const changeVisibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};document.addEventListener('visibilitychange',changeVisibility);
 let down=false,startX=0,startDrag=0;
 const pointerdown=e=>{down=true;startX=e.clientX;startDrag=drag;};
 const pointermove=e=>{if(down){drag=startDrag+(e.clientX-startX)*.009;wake();}};
 const pointerup=()=>{down=false;};
 canvas.addEventListener('pointerdown',pointerdown);canvas.addEventListener('pointermove',pointermove);window.addEventListener('pointerup',pointerup);canvas.addEventListener('pointercancel',pointerup);canvas.addEventListener('globe-state',wake);
 return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',changeVisibility);canvas.removeEventListener('pointerdown',pointerdown);canvas.removeEventListener('pointermove',pointermove);window.removeEventListener('pointerup',pointerup);canvas.removeEventListener('pointercancel',pointerup);canvas.removeEventListener('globe-state',wake);resources.reverse().forEach(release=>release());};
}
function StaticGlobe() {
 const paths=land.flatMap(polygon=>polygon.map(ring=>{let d='',pen=false;ring.forEach(([lon,lat])=>{const a=(lon-10)*Math.PI/180,b=lat*Math.PI/180,z=Math.cos(b)*Math.cos(a);if(z>0){const x=150+Math.cos(b)*Math.sin(a)*110,y=135-Math.sin(b)*110;d+=`${pen?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;pen=true;}else pen=false;});return d;}));
 return <svg viewBox="0 0 300 270" aria-hidden="true"><defs><radialGradient id="static-earth"><stop stopColor="#294756"/><stop offset="1" stopColor="#101e28"/></radialGradient></defs><circle cx="150" cy="135" r="111" fill="url(#static-earth)" stroke="#456a75"/>{paths.map((d,i)=><path key={i} d={d} stroke="#94b796" strokeWidth="1" fill="none"/>)}<ellipse cx="150" cy="135" rx="130" ry="45" fill="none" stroke="#759c91" strokeWidth="5" transform="rotate(-20 150 135)"/></svg>;
}
export default function ContactGlobe(){
 const {language}=useLanguage();const fr=language==='fr';const reduced=useReducedMotion();const [paused,setPaused]=useState(false);const [fallback,setFallback]=useState(false);const canvas=useRef(null);const status=useRef({running:false});const running=!paused&&!reduced;status.current.running=running;
 useEffect(()=>{if(fallback)return;if(typeof WebGLRenderingContext==='undefined'){setFallback(true);return;}const element=canvas.current;const lost=event=>{event.preventDefault();setFallback(true);};element.addEventListener('webglcontextlost',lost);let cleanup;try{cleanup=mountGlobe(element,status);}catch{setFallback(true);}return()=>{cleanup?.();element.removeEventListener('webglcontextlost',lost);};},[fallback]);
 useEffect(()=>{canvas.current?.dispatchEvent(new Event('globe-state'));},[running]);
 return <section className="contact-globe" aria-label={fr?'Globe terrestre animé':'Rotating Earth globe'}><div className="globe-heading"><span className="eyebrow">{fr?'DEPUIS AGADIR, OUVERT AUX ÉCHANGES':'BASED IN AGADIR, OPEN TO CONNECT'}</span>{!reduced&&!fallback&&<button type="button" className="globe-toggle" aria-label={fr?(paused?'Reprendre la rotation':'Mettre la rotation en pause'):(paused?'Resume rotation':'Pause rotation')} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>}</div><div className="globe-stage">{fallback?<div className="globe-fallback"><StaticGlobe/></div>:<canvas ref={canvas} aria-hidden="true"/>}</div><p className="globe-location"><MapPin size={13}/><span>Agadir, {fr?'Maroc':'Morocco'}</span><span className="globe-availability">{fr?'PFE · Mars 2027':'PFE · March 2027'}</span></p></section>;
}
