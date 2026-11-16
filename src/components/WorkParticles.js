import { useEffect, useRef } from "react";

// Original vector outlines sampled into particles; no remote assets or tracking.
const outlines = [
 ["M115 165 C115 143 80 133 80 94 A70 70 0 1 1 220 94 C220 133 185 143 185 165 Z", "M118 176H182 M121 187H179 M130 198H170 M139 207H161", "M135 164V118L125 101L139 114L150 97L161 114L175 101L165 118V164", ...Array.from({length:11},(_,i)=>{const a=(i*25+145)*Math.PI/180;return `M${150+Math.cos(a)*87} ${94+Math.sin(a)*87}L${150+Math.cos(a)*105} ${94+Math.sin(a)*105}`;})],
 ["M34 30H266V200H34Z M34 58H266 M48 44H51 M61 44H64 M74 44H77", "M48 75H112V130H48Z M125 75H252V130H125Z M48 145H178V186H48Z M192 145H252V186H192Z", "M59 115L72 99L84 105L101 87 M137 89H225 M137 100H236 M137 112H204 M60 160H150 M60 172H135", "M210 153L233 165L210 178Z"],
 ["M30 40H270V192H30Z M30 66H270 M45 53H48 M58 53H61 M71 53H74", "M109 91L76 122L109 153 M191 91L224 122L191 153 M164 84L137 161", "M43 205H257 M66 192L56 205 M234 192L244 205"],
 ["M35 198H270 M50 198V172H74V198 M90 198V150H114V198 M130 198V125H154V198 M170 198V92H194V198 M210 198V52H234V198", "M37 160C110 155 179 112 258 25 M234 30L258 25L254 49", "M44 74A31 31 0 1 1 106 74 M75 74L92 55 M57 73H59 M73 50V53 M93 73H95"]
];
const colors = [[245,171,72],[105,169,249],[75,211,180],[205,134,231]];
function samplePaths(paths) {
 const ns="http://www.w3.org/2000/svg";
 const points=[];
 paths.forEach(d=>{const path=document.createElementNS(ns,"path");path.setAttribute("d",d);const length=path.getTotalLength();for(let distance=0;distance<length;distance+=1.9){const p=path.getPointAtLength(distance);points.push({x:p.x,y:p.y});}});
 // A stable ordering keeps morphs reproducible across renders.
 return Array.from({length:1100},(_,i)=>points[(i*137)%points.length]);
}
export default function WorkParticles({ phase, reduced }) {
 const canvas=useRef(null), currentPhase=useRef(phase), motionReduced=useRef(reduced);
 currentPhase.current=phase;motionReduced.current=reduced;
 useEffect(()=>{
  if(typeof CanvasRenderingContext2D === "undefined")return;
  const element=canvas.current,ctx=element.getContext("2d");if(!ctx)return;
  const shapes=outlines.map(samplePaths);
  const particles=shapes[0].map((point,i)=>({x:point.x,y:point.y,vx:0,vy:0,seed:i*.71}));
  const pointer={x:-999,y:-999};let width=0,height=0,frame=0,visible=true,previous=0,lastPhase=-1,settled=0;
  const resize=()=>{const r=element.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(window.devicePixelRatio||1,2);element.width=Math.round(width*dpr);element.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);settled=0;start();};
  const position=e=>{if(e.pointerType==='touch'||motionReduced.current)return;const r=element.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width*300;pointer.y=(e.clientY-r.top)/r.height*230;settled=0;start();};
  const leave=()=>{pointer.x=-999;pointer.y=-999;settled=0;start();};
  function draw(time){frame=0;if(!visible||document.hidden)return;const dt=previous?Math.min((time-previous)/16.67,2):1;previous=time;
   const target=shapes[currentPhase.current],rgb=colors[currentPhase.current],reduce=motionReduced.current;
   if(lastPhase!==currentPhase.current){settled=0;lastPhase=currentPhase.current;}
   ctx.clearRect(0,0,width,height);ctx.save();ctx.scale(width/300,height/230);
   const glow=ctx.createRadialGradient(150,110,5,150,110,125);glow.addColorStop(0,`rgba(${rgb.join(',')},.09)`);glow.addColorStop(1,`rgba(${rgb.join(',')},0)`);ctx.fillStyle=glow;ctx.fillRect(0,0,300,230);
   ctx.strokeStyle=`rgba(${rgb.join(',')},.075)`;ctx.lineWidth=.5;[100,125].forEach(r=>{ctx.beginPath();ctx.ellipse(150,113,r,r*.78,-.25,0,Math.PI*2);ctx.stroke();});
   let energy=0;
   particles.forEach((p,i)=>{const t=target[i];if(reduce){p.x=t.x;p.y=t.y;p.vx=0;p.vy=0;}else{
    const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);let fx=0,fy=0;
    if(dist<39){const strength=(1-dist/39)*2.5;fx=dx/(dist||1)*strength;fy=dy/(dist||1)*strength;}
    p.vx=(p.vx+(t.x-p.x)*.026*dt+fx*dt)*Math.pow(.84,dt);p.vy=(p.vy+(t.y-p.y)*.026*dt+fy*dt)*Math.pow(.84,dt);p.x+=p.vx*dt;p.y+=p.vy*dt;energy+=Math.abs(p.vx)+Math.abs(p.vy);
   }
   // Small static offsets give the outlines the texture of a particle cloud.
   const jitter=Math.sin(p.seed*5)*.75;ctx.fillStyle=`rgba(${rgb.join(',')},${.3+(i%7)*.09})`;ctx.beginPath();ctx.arc(p.x+jitter,p.y+Math.cos(p.seed)*.7,i%11===0?1:.48,0,Math.PI*2);ctx.fill();
   });ctx.restore();settled=energy<.5?settled+1:0;
   // Stop drawing after settling; restart on interaction or a phase change.
   if(!reduce&&settled<12)frame=requestAnimationFrame(draw);
  }
  function start(){if(!frame&&visible&&!document.hidden){previous=0;frame=requestAnimationFrame(draw);}}
  const observer=new ResizeObserver(resize);observer.observe(element);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){settled=0;start();}else{cancelAnimationFrame(frame);frame=0;} });intersection.observe(element);
  const visibility=()=>{if(!document.hidden){settled=0;start();}};document.addEventListener('visibilitychange',visibility);
  element.addEventListener('pointermove',position);element.addEventListener('pointerleave',leave);
  // Phase changes wake a settled canvas without an idle animation loop.
  const wake=()=>{settled=0;start();};element.addEventListener('work-phase',wake);
  resize();return()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);element.removeEventListener('pointermove',position);element.removeEventListener('pointerleave',leave);element.removeEventListener('work-phase',wake);};
 },[]);
 useEffect(()=>{canvas.current?.dispatchEvent(new Event('work-phase'));},[phase,reduced]);
 return <canvas ref={canvas} className="work-particle-canvas" aria-hidden="true"/>;
}

