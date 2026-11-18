import land from "../data/earthLand.json";

const vertexSource = `
 attribute vec3 aPosition; attribute float aLand;
 uniform float uRotation,uAspect,uPixelRatio;
 varying vec3 vPosition; varying float vLand;
 void main(){float c=cos(uRotation),s=sin(uRotation);
 vec3 p=vec3(c*aPosition.x+s*aPosition.z,aPosition.y,-s*aPosition.x+c*aPosition.z);
 float tilt=.12;p=vec3(p.x,cos(tilt)*p.y-sin(tilt)*p.z,sin(tilt)*p.y+cos(tilt)*p.z);
 vPosition=p;vLand=aLand;gl_Position=vec4(p.x*.83/uAspect,p.y*.83,-p.z*.2,1.0);
 gl_PointSize=(aLand>.5?2.6:1.1)*uPixelRatio*(.72+.28*max(p.z,0.0));}
`;
const fragmentSource = `
 precision mediump float;varying vec3 vPosition;varying float vLand;uniform float uPoints;
 void main(){float depth=max(vPosition.z,0.0);
 if(uPoints<.5){float rim=pow(1.0-depth,3.0);gl_FragColor=vec4(vec3(.027,.051,.061)+vec3(.025,.06,.075)*rim,1.0);return;}
 if(vPosition.z<0.0)discard;
 float r=length(gl_PointCoord-vec2(.5))*2.0;if(r>1.0)discard;
 vec3 color=mix(vec3(.24,.54,.73),vec3(.72,.91,.62),clamp(vPosition.y*.6+.5,0.0,1.0));
 float opacity=(1.0-smoothstep(.65,1.0,r))*(.5+.5*depth);
 if(vLand<.5){color=vec3(.24,.43,.51);opacity*=.24;}
 gl_FragColor=vec4(color,opacity);}
`;

let cachedPoints;
export function globePoints(){
 if(cachedPoints)return cachedPoints;
 const map=document.createElement('canvas');map.width=1024;map.height=512;
 const ctx=map.getContext('2d');ctx.fillStyle='#fff';
 land.forEach(polygon=>{ctx.beginPath();polygon.forEach(ring=>{ring.forEach(([lon,lat],i)=>{const x=(lon+180)/360*1024,y=(90-lat)/180*512;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.closePath();});ctx.fill('evenodd');});
 const pixels=ctx.getImageData(0,0,1024,512).data,points=[];
 for(let i=0;i<22000;i++){
  const lat=Math.asin(1-2*(i+.5)/22000),lon=((i*2.399963229728653)%(2*Math.PI))-Math.PI;
  const x=Math.min(1023,Math.floor((lon+Math.PI)/(2*Math.PI)*1024)),y=Math.min(511,Math.floor((Math.PI/2-lat)/Math.PI*512));
  const isLand=pixels[(y*1024+x)*4+3]>128;
  if(!isLand&&i%19!==0)continue;
  points.push(Math.cos(lat)*Math.sin(lon),Math.sin(lat),Math.cos(lat)*Math.cos(lon),isLand?1:0);
 }
 cachedPoints=new Float32Array(points);return cachedPoints;
}
function sphere(){const vertices=[],indices=[],rows=32,cols=64;
 for(let r=0;r<=rows;r++){const lat=-Math.PI/2+r/rows*Math.PI;for(let c=0;c<=cols;c++){const lon=c/cols*Math.PI*2;vertices.push(Math.cos(lat)*Math.sin(lon),Math.sin(lat),Math.cos(lat)*Math.cos(lon),0);}}
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const a=r*(cols+1)+c,b=a+cols+1;indices.push(a,b,a+1,b,b+1,a+1);}return{vertices:new Float32Array(vertices),indices:new Uint16Array(indices)};
}
export function mountPointGlobe(canvas,status){
 const gl=canvas.getContext('webgl',{alpha:true,antialias:true,powerPreference:'low-power'});if(!gl)throw Error('WebGL unavailable');
 const resources=[];
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);resources.push(()=>gl.deleteShader(s));if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Globe shader unavailable');return s;}
 const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertexSource));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragmentSource));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Globe unavailable');gl.useProgram(program);resources.push(()=>gl.deleteProgram(program));
 const position=gl.getAttribLocation(program,'aPosition'),landAttribute=gl.getAttribLocation(program,'aLand');
 const uniforms=Object.fromEntries(['uRotation','uAspect','uPixelRatio','uPoints'].map(name=>[name,gl.getUniformLocation(program,name)]));
 const data=sphere(),points=globePoints();
 function buffer(type,values){const b=gl.createBuffer();gl.bindBuffer(type,b);gl.bufferData(type,values,gl.STATIC_DRAW);resources.push(()=>gl.deleteBuffer(b));return b;}
 const surface=buffer(gl.ARRAY_BUFFER,data.vertices),indices=buffer(gl.ELEMENT_ARRAY_BUFFER,data.indices),dots=buffer(gl.ARRAY_BUFFER,points);
 let frame=0,resizeFrame=0,last=0,angle=-.12,drag=0,visible=false,width=1,height=1,disposed=false;
 function vertices(b){gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,3,gl.FLOAT,false,16,0);gl.enableVertexAttribArray(landAttribute);gl.vertexAttribPointer(landAttribute,1,gl.FLOAT,false,16,12);}
 function draw(now){frame=0;if(disposed||!visible||document.hidden||gl.isContextLost())return;if(last&&status.current.running)angle+=Math.min(now-last,50)*.00009;last=now;
  gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.uniform1f(uniforms.uRotation,angle+drag);gl.uniform1f(uniforms.uAspect,width/height);gl.uniform1f(uniforms.uPixelRatio,canvas.width/width);
  gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);vertices(surface);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indices);gl.uniform1f(uniforms.uPoints,0);gl.drawElements(gl.TRIANGLES,data.indices.length,gl.UNSIGNED_SHORT,0);
  gl.disable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);vertices(dots);gl.uniform1f(uniforms.uPoints,1);gl.drawArrays(gl.POINTS,0,points.length/4);
  if(status.current.running)frame=requestAnimationFrame(draw);
 }
 const wake=()=>{last=0;if(!frame&&!disposed&&visible&&!document.hidden)frame=requestAnimationFrame(draw);};
 const resize=new ResizeObserver(()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>{const rect=canvas.getBoundingClientRect();width=rect.width||1;height=rect.height||1;const ratio=Math.min(window.devicePixelRatio||1,1.75);const w=Math.round(width*ratio),h=Math.round(height*ratio);if(canvas.width!==w)canvas.width=w;if(canvas.height!==h)canvas.height=h;wake();});});resize.observe(canvas);
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;last=0;}},{rootMargin:'30px'});intersection.observe(canvas);
 const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else wake();};document.addEventListener('visibilitychange',visibility);
 let down=false,startX=0,startDrag=0;
 const pointerdown=e=>{down=true;startX=e.clientX;startDrag=drag;};const pointermove=e=>{if(down){drag=startDrag+(e.clientX-startX)*.009;wake();}};const pointerup=()=>{down=false;};
 canvas.addEventListener('pointerdown',pointerdown);canvas.addEventListener('pointermove',pointermove);window.addEventListener('pointerup',pointerup);canvas.addEventListener('pointercancel',pointerup);canvas.addEventListener('globe-state',wake);
 return()=>{disposed=true;cancelAnimationFrame(frame);cancelAnimationFrame(resizeFrame);resize.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);canvas.removeEventListener('pointerdown',pointerdown);canvas.removeEventListener('pointermove',pointermove);window.removeEventListener('pointerup',pointerup);canvas.removeEventListener('pointercancel',pointerup);canvas.removeEventListener('globe-state',wake);resources.reverse().forEach(release=>release());};
}
