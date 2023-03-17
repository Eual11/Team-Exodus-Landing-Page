import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls"

import { MathUtils } from "three";

let gu = 
{
    time :{value: 0}
}
let sizes = []
let shift = [];

function pushShift()
{
    shift.push(
        Math.random() * Math.PI, 
        Math.random() * Math.PI * 2, 
        (Math.random() * 0.9 + 0.1) * Math.PI * 0.1,
        Math.random() * 0.9 + 0.1
    );
}
function createSuperNova(innerRadius,outerRadius,centerParticles,outerParticles,size1,size2)
{

    let cp =centerParticles||5000
    let op = outerParticles||10000
    let pts = new Array(cp).fill().map((p)=>
{
    sizes.push(Math.random()*1.3+2);
    pushShift();

    return new THREE.Vector3().randomDirection().multiplyScalar(Math.random()*1.5+10);
})
for(let i =0; i < op; i++)
{
    
    let r = innerRadius||12;let  R = outerRadius|| 40;
    let rand = Math.pow(Math.random(),1.5);
    sizes.push(Math.random()*(size1||1.5)+0.5);
    let radius = Math.sqrt(R*R*rand + (1-rand)* r*r);
    
    let p = new THREE.Vector3().setFromCylindricalCoords(radius,Math.random()*2*Math.PI,2*Math.random()-1);
    pts.push(p);
    pushShift()

}
let g = new THREE.BufferGeometry().setFromPoints(pts);
g.setAttribute("sizes",new THREE.Float32BufferAttribute(sizes,1));
g.setAttribute("shift",new THREE.Float32BufferAttribute(shift,4));
let m = new THREE.PointsMaterial(
    {
        size:size1||0.12,
        transparent:true,
        depthTest:false,
        blending: THREE.AdditiveBlending,
        // color : "#c53307",
        onBeforeCompile: shader=>
        {
            shader.uniforms.time = gu.time,
            shader.vertexShader= `
            uniform float time;
            attribute float sizes;
            attribute vec4 shift;
            varying vec3 vColor;
            ${shader.vertexShader}
            `.replace('gl_PointSize = size;','gl_PointSize = size*sizes;').replace("#include <color_vertex>",`#include <color_vertex>
            // float d = length(abs(position)/vec3(30.,30.,90.));
            // clamp(d,0.,1.);
            // vColor = mix(vec3(62.,46.,166.), vec3	(255,228,242),d)/255.;
            float d = length(abs(position) / vec3(42., 8., 50));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3(227., 155., 50.), vec3(100., 50., 255.), d) / 255.;
        
            `)
            .replace("#include <begin_vertex>",`#include <begin_vertex>
            float t = time;
            float MoveL = mod(shift.x+shift.z*t,PI2);
            float MoveS = mod(shift.y+shift.z*t,PI2);
            transformed+=1.2*vec3(sin(MoveL)*cos(MoveS),cos(MoveL),sin(MoveS)*cos(MoveL))*shift.w;
    //         float moveT = mod(shift.x + shift.z * t, PI2);
    //     float moveS = 1.2*mod(shift.y + shift.z * t, PI2);
    //  transformed += vec3(sin(moveS) * sin(moveT), cos(moveT), sin(moveS) * sin(moveT)) * shift.w;

    
            `);

        shader.fragmentShader = `
        varying vec3 vColor;
        ${shader.fragmentShader}
        `.replace("#include <clipping_planes_fragment>",`
        #include <clipping_planes_fragment>

        float d = length(gl_PointCoord.xy-0.5);
        if(d > 0.9) discard;
        `).replace(`vec4 diffuseColor = vec4( diffuse, opacity )`,`
        vec4 diffuseColor = vec4( vColor, smoothstep(0.5,0.3,d) )
        `)

            
        }

    }
)
return {g,m};



}

export {createSuperNova}