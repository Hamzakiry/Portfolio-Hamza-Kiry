import { useEffect, useRef, useState } from "react";
import { Pause, Play, MapPin } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "../i18n/Language";
import { mountPointGlobe } from "./pointGlobe";
import land from "../data/earthLand.json";

function StaticGlobe() {
 const paths=land.flatMap(polygon=>polygon.map(ring=>{let d='',pen=false;ring.forEach(([lon,lat])=>{const a=(lon-10)*Math.PI/180,b=lat*Math.PI/180,z=Math.cos(b)*Math.cos(a);if(z>0){const x=150+Math.cos(b)*Math.sin(a)*110,y=135-Math.sin(b)*110;d+=`${pen?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;pen=true;}else pen=false;});return d;}));
 return <svg viewBox="0 0 300 270" aria-hidden="true"><defs><radialGradient id="static-earth"><stop stopColor="#294756"/><stop offset="1" stopColor="#101e28"/></radialGradient></defs><circle cx="150" cy="135" r="111" fill="url(#static-earth)" stroke="#456a75"/>{paths.map((d,i)=><path key={i} d={d} stroke="#94b796" strokeWidth="1.5" strokeDasharray=".2 3" strokeLinecap="round" fill="none"/>)}</svg>;
}
export default function ContactGlobe(){
 const {language}=useLanguage();const fr=language==='fr';const reduced=useReducedMotion();const [paused,setPaused]=useState(false);const [fallback,setFallback]=useState(false);const canvas=useRef(null);const status=useRef({running:false});const running=!paused&&!reduced;status.current.running=running;
 useEffect(()=>{if(fallback)return;if(typeof WebGLRenderingContext==='undefined'){setFallback(true);return;}const element=canvas.current;const lost=event=>{event.preventDefault();setFallback(true);};element.addEventListener('webglcontextlost',lost);let cleanup;try{cleanup=mountPointGlobe(element,status);}catch{setFallback(true);}return()=>{cleanup?.();element.removeEventListener('webglcontextlost',lost);};},[fallback]);
 useEffect(()=>{canvas.current?.dispatchEvent(new Event('globe-state'));},[running]);
 return <section className="contact-globe contact-globe-points" aria-label={fr?'Globe terrestre animé':'Rotating Earth globe'}><div className="globe-heading"><span className="eyebrow">{fr?'DEPUIS AGADIR, OUVERT AUX ÉCHANGES':'BASED IN AGADIR, OPEN TO CONNECT'}</span>{!reduced&&!fallback&&<button type="button" className="globe-toggle" aria-label={fr?(paused?'Reprendre la rotation':'Mettre la rotation en pause'):(paused?'Resume rotation':'Pause rotation')} aria-pressed={paused} onClick={()=>setPaused(value=>!value)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>}</div><div className="globe-stage">{fallback?<div className="globe-fallback"><StaticGlobe/></div>:<canvas ref={canvas} aria-hidden="true"/>}</div><p className="globe-location"><MapPin size={13}/><span>Agadir, {fr?'Maroc':'Morocco'}</span><span className="globe-availability">{fr?'PFE · Mars 2027':'PFE · March 2027'}</span></p></section>;
}
