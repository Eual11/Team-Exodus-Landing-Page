// import * as THREE from  "https://unpkg.com/three@0.150.0/build/three.module.js";//"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.js";

import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls"


let gu = 
{
    time :{value: 0}
}


function createTorus(xOffset,yOffset,zOffset,interiorRadius,exteriorRaius,thetaSpacing,phiSpacing)
{
    const theta_spacing = thetaSpacing ||0.7  ;
    const phi_spacing = phiSpacing || 0.02;

    let r = interiorRadius; //interior radius
    let R =exteriorRaius; //exterior radius 
    let pts = [];
    let theta =0;
    let phi =0;
    for (let theta=0; theta <2*Math.PI; theta+=theta_spacing)
    {
        let x0 =R+ r*Math.cos(theta);
        let y0 =r*Math.sin(theta); 
        let z0 = 0;
        for(let phi=0; phi <2*Math.PI; phi+=phi_spacing)
        {
            let x = x0*Math.cos(phi) - (z0*Math.sin(phi));
            let y;
            y=y0;
            let z = -x0*Math.sin(phi)+z0*Math.cos(phi)
            let vec = new THREE.Vector3(x,y,z);
            pts.push(vec);
        }
        let x = x0*Math.cos(phi) - (z0*Math.sin(phi));
        let y = y0;
        let z = -x0*Math.sin(phi)+z0*Math.cos(phi)
        
        let vec = new THREE.Vector3(x,y,z);
        pts.push(vec);
    }
    let ptsp =[];


let donut_buffer = new THREE.BufferGeometry().setFromPoints(pts);

let donut_material = new THREE.PointsMaterial(
    {
        size: 0.05,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        color: "red",
        onBeforeCompile: shader=>
        {
            // shader.uniforms.time = gu.time,
            shader.vertexShader= `
            uniform float time;
            attribute float sizes;
            attribute vec4 shift;
            varying vec3 vColor;
            ${shader.vertexShader}
            `.replace('gl_PointSize = size;','gl_PointSize = size*2.;').replace("#include <color_vertex>",`#include <color_vertex>
            // float d = length(abs(position)/vec3(30.,30.,90.));
            // clamp(d,0.,1.);
            // vColor = mix(vec3(62.,46.,166.), vec3	(255,228,242),d)/255.;
            float d = length(abs(position) / vec3(50., 20., 5.));
        d = clamp(d, 0., 1.);
        vColor = mix(vec3( 252., 70., 107.), vec3(63., 94.,251.), d) / 255.;
        
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
);
let donut_points = new THREE.Points(donut_buffer,donut_material)
donut_points.position.set(xOffset,yOffset,zOffset);
return donut_points;

}


export {createTorus};