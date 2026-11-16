import WorkParticles from "./WorkParticles";
import { useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lightbulb, Network, Code2, ShieldCheck } from "lucide-react";
import { useLanguage } from "../i18n/Language";
const phases = [
 {icon:Lightbulb,en:"Understand",fr:"Comprendre",text:["Start with the business need and the people using the solution.","Partir du besoin métier et des personnes qui utilisent la solution."]},
 {icon:Network,en:"Structure",fr:"Structurer",text:["Connect the data, define the model and map the application flow.","Relier les données, définir le modèle et organiser le fonctionnement."]},
 {icon:Code2,en:"Build",fr:"Construire",text:["Build the solution with suitable AI, data and enterprise tools.","Construire la solution avec les outils IA, data et métier adaptés."]},
 {icon:ShieldCheck,en:"Verify",fr:"Vérifier",text:["Test the behavior, document the limits and improve the result.","Tester le fonctionnement, documenter les limites et améliorer le résultat."]}
];
export default function HowIWork(){const [active,setActive]=useState(0);const {language}=useLanguage();const fr=language==="fr";const reduced=useReducedMotion();const phase=phases[active];
const px=useMotionValue(0),py=useMotionValue(0);
const sx=useSpring(px,{stiffness:130,damping:22}),sy=useSpring(py,{stiffness:130,damping:22});
const rotateX=useTransform(sy,[-1,1],[9,-9]),rotateY=useTransform(sx,[-1,1],[-12,12]);
const x=useTransform(sx,[-1,1],[-12,12]),y=useTransform(sy,[-1,1],[-9,9]);
const track=e=>{if(reduced||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();px.set((e.clientX-r.left)/r.width*2-1);py.set((e.clientY-r.top)/r.height*2-1)};
return <section onPointerMove={track} onPointerLeave={()=>{px.set(0);py.set(0)}} className="how-i-work" aria-labelledby="how-work-title"><div className="how-heading"><h2 id="how-work-title">{fr?"Ma méthode":"How I work"}</h2><span>0{active+1} / 04</span></div><div className="how-diagram" aria-hidden="true"><motion.div className="how-scene" style={reduced?{}:{rotateX,rotateY,x,y}}><WorkParticles phase={active} reduced={reduced}/></motion.div></div><p className="how-phase">{fr?"ÉTAPE":"PHASE"} 0{active+1} / 04</p><p className="how-description" aria-live="polite">{phase.text[fr?1:0]}</p><div className="how-steps" role="group" aria-label={fr?"Étapes de travail":"Working phases"}>{phases.map((item,index)=><button type="button" key={item.en} onClick={()=>setActive(index)} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} aria-pressed={active===index}><span>0{index+1}</span>{fr?item.fr:item.en}</button>)}</div></section>}
