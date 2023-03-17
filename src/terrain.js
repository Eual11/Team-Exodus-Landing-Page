
// right is posetive X asis
//up is posetive Z axis
//front is posetive Y axis
import * as THREE from "three";
import { createTorus } from "./donut.js";
import {OrbitControls} from "three/addons/controls/OrbitControls"
import {createNoise2D} from "https://cdn.skypack.dev/simplex-noise@4.0.0";
import { createParticles } from "./particles.js";

import { createRocks } from "./rocks.js";
import { createText } from "./text.js";
import { createSuperNova } from "./nova.js";
let textGeo
let clock = new THREE.Clock();
const height = 20,
size = 70,
hover = 30,
curveSegments = 4,
bevelThickness = 2,
bevelSize = 1.5;
let camVelocity = 0;
let movingForward =true;
const noise2D = createNoise2D();
let canvas = document.body;
let w = window.innerWidth;
let h = window.innerHeight;
let xZoom = 6;
let yZoom = 18
let noiseStrength = 2;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,w/h,0.1,80)
camera.position.set(0,-20,1);
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w,h);
renderer.setPixelRatio(window.devicePixelRatio);
let gu = 
{
    time: {
        value:0
    },
    pointTexture: { value: new THREE.TextureLoader().load( '../img/shit 2.png' ) },
    w:{
        value: 50
    },
    h:
    {
        value:500
    }
    
}

canvas.addEventListener("resize",()=>
{
    w = window.innerWidth;
    h = window.innerHeight;

    camera.aspect = w/h;
    camera.updateProjectionMatrix();

    renderer.setSize(w,h);
})


let controls = new OrbitControls(camera,renderer.domElement);
canvas.appendChild(renderer.domElement);


controls.enableDamping=true;
controls.enablePan = false;

let test_geo = new THREE.BoxGeometry(1,1,1);
let plane_geo = new THREE.PlaneGeometry(40,60,90,60)
let test_material = new THREE.MeshBasicMaterial({
    side:THREE.DoubleSide,
    wireframe: true,
    color: "#fffffff"
});
let shit = new THREE.MeshNormalMaterial();
let test_mesh = new THREE.Mesh(test_geo,test_material)
let plane = new THREE.Mesh(plane_geo,test_material)
let vertex_arr = plane.geometry.attributes.position.array
let text = createText("Team Exodus","fonts/kenpixel.ttf",1,2,12);
let text2 = createText("Crafting The Future","fonts/kenpixel.ttf",0.6,0.8,12);
text2.rotation.set(Math.PI/2-0.2,0,0);
for(let i =0; i < plane.geometry.attributes.position.count*3-2; i+=3)
{
    let vert_x = vertex_arr[i];
    let vert_y = vertex_arr[i+1];
    noiseStrength = Math.random()*2

    let noise = noise2D(vert_x/xZoom,vert_y/yZoom)*noiseStrength;
    // console.log(noise)
    // vert_z+=i;
    if(Math.abs(vert_x) >3)
        vertex_arr[i+2]=noise;


  
}

let test_particles = createParticles(1000,new THREE.Vector2(-90,90),new THREE.Vector2(-100,100),new THREE.Vector2(8,40),7)

scene.add(plane);
scene.add(test_particles)
text.rotation.set(Math.PI/2-0.2,0,0)
text.position.set(-3.8,-4,1.3)
text2.position.set(-3.8,6,1.3)

scene.add(text,text2)
let abstract_rocks_group = new THREE.Group();
let abstract_torus_group = new THREE.Group();
for (let i=0; i <20; i++)
{
    let abstract_rock = createRocks(250*Math.random(),4,0.5,new THREE.Vector3(random(-50,50),random(4,20),random(0,15)),2000,0.3);
    abstract_rocks_group.add(abstract_rock.group,abstract_rock.points)
    // .add(abstract_rock);
}
for (let i=0; i <20; i++)
{
    let abstract_torus = createTorus(random(-50,50),random(4,50),random(0,15),Math.random()*2,Math.random()*3)
    // scene.add(abstract_torus)
    abstract_torus_group.add(abstract_torus);

}
let nova = createSuperNova(12,40,50000,120000,0.12)
let supernova = new THREE.Points(nova.g,nova.m);

supernova.rotation.set(Math.PI/2,0,1)
supernova.position.set(15,120,5)
supernova.rotation.z=0.3
supernova.rotation.order = "XZY";

scene.add(supernova)
scene.add(abstract_rocks_group,abstract_torus_group)
renderer.setAnimationLoop(()=>
{
    let delta = clock.getDelta();
    renderer.render(scene,camera)
    // plane.position.y-=0.8*delta;
    supernova.rotation.y+=0.2*delta
    if(camVelocity>0)
    {camera.position.y+=camVelocity*delta
    camVelocity-=0.03;
    }
   else if(!movingForward && camVelocity<0)
   {
    camera.position.y+=camVelocity*delta
     if(camVelocity+0.03<0)   
        camVelocity+=0.03;
 
   }

})

document.addEventListener("keydown",function(e)
{
    // console.log(e)
    if(e.key=="ArrowUp")
    {
        camVelocity = 3.3
        movingForward = true
    }
    else if(e.key == "ArrowDown")
    {
        camVelocity = -3.3
        movingForward = false  
        console.log("square up") 
        
    }
})

    

// }
function random(min,max)
{
    let diff = max-min;

    return min+(Math.random()*diff)
}