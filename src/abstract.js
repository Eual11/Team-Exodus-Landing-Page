import * as THREE from "three";
import { MeshBasicMaterial, MeshNormalMaterial, Object3D } from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {EffectComposer} from "three/addons/postprocessing/EffectComposer.js"
import {RenderPass} from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import {AfterimagePass} from "three/addons/postprocessing/AfterimagePass.js";
// import {ShaderPass} from "three/addons/postprocessing/ShaderPass.js"
// import {DotScreenShader} from "three/addons/shaders/DotScreenShader.js"
// import {RGBShiftShader} from "three/addons/shaders/RGBShiftShader.js";
// import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
// import {AfterimagePass} from "three/addons/postprocessing/AfterimagePass.js"

let clock = new THREE.Clock()
let canvas = document.body
let w = window.innerWidth;
let h = window.innerHeight;
const camera = new THREE.PerspectiveCamera(70,w/h,0.1,100);
camera.position.z = 10;
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
let controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
renderer.setPixelRatio(window.devicePixelRatio);
let target = new THREE.WebGLRenderTarget(w,h);
canvas.appendChild(renderer.domElement);
let object = new THREE.Object3D(); //object 
scene.add(object)
let ambientLight = new THREE.AmbientLight("white",0.16);
let directLight = new THREE.DirectionalLight("white");
let pointLight = new THREE.PointLight("white",8,5,2);
directLight.position.set(1,1,1);
canvas.addEventListener("resize",()=>
{
    camera.aspect = w/h;
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize(w,h);
renderer.setPixelRatio(window.devicePixelRatio);
})
let geometry = new THREE.IcosahedronGeometry(0.3,0);
let material = new THREE.MeshPhongMaterial({
    color: "white",
    flatShading: true
});
let theta_spacing = THREE.MathUtils.degToRad(13);
for (let theta = 0; theta < 2*Math.PI; theta+=theta_spacing)
{
    let mesh = new THREE.Mesh(geometry,material)
    mesh.rotation.x = Math.random()*0.5
    mesh.rotation.y = Math.random()*0.5
    mesh.rotation.z = Math.random()*0.5

        let vec = new THREE.Vector3().setFromCylindricalCoords(3.5,theta,0)
    mesh.position.set(vec.x,vec.y,vec.z);
    object.add(mesh);
}
let object1 = new THREE.Object3D();
for (let theta =0; theta<2*Math.PI; theta+=theta_spacing)
{
    let mesh = new THREE.Mesh(geometry,material)
    mesh.rotation.x = Math.random()*0.5
    mesh.rotation.y = Math.random()*0.5
    mesh.rotation.z = Math.random()*0.5

        let vec = new THREE.Vector3().setFromCylindricalCoords(4,theta,0)
    mesh.position.set(vec.x,vec.y,vec.z);
    object1.add(mesh);

}
let object2 = new THREE.Object3D();
for (let theta =0; theta<2*Math.PI; theta+=theta_spacing)
{
    let mesh = new THREE.Mesh(geometry,material)
    mesh.rotation.x = Math.random()*0.5
    mesh.rotation.y = Math.random()*0.5
    mesh.rotation.z = Math.random()*0.5

        let vec = new THREE.Vector3().setFromCylindricalCoords(3.5,theta,0)
    mesh.position.set(vec.x,vec.y,vec.z);
    object2.add(mesh);

}


// let test_mesh = new THREE.Mesh(test_geomtry,test_material);
// for ( let i = 0; i < 100; i ++ ) {

//     const mesh = new THREE.Mesh( geometry, material );
//     mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
//     mesh.position.multiplyScalar( Math.random() * 40 );
//     mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
//     mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random();
//     object.add( mesh );

// }
// const effectComposer = new EffectComposer(renderer);
// const renderpass = new RenderPass(scene,camera);
// const bloom = new UnrealBloomPass(new Vector2(w,h),0.5,0.5,0.2);
// effectComposer.addPass(renderpass);
// effectComposer.addPass(bloom)
// let glitch = new AfterimagePass();
// glitch.uniforms["damp"].value =0.7;
// // glitch.goWild = true;
// effectComposer.addPass(glitch)

// let effect1 = new ShaderPass(DotScreenShader);
// effect1.uniforms["scale"].value = 3;
// // effectComposer.addPass(effect1);
// let effect2 = new ShaderPass(RGBShiftShader);
// effect2.uniforms["amount"].value =0.0045;
// // effectComposer.addPass(effect2);

let test_material = new THREE.MeshPhongMaterial({
    color: "red",
    flatShading: true
});
const effectComposer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene,camera);
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),0.8,0.1,0.8);
effectComposer.addPass(renderPass);
effectComposer.addPass(new AfterimagePass(0.72))

effectComposer.addPass(bloom);

let test_geomtry = new THREE.IcosahedronGeometry(2,0);
let test_mesh = new THREE.Mesh(test_geomtry,test_material);
let orbit = new Object3D()
orbit.rotation.x = 0.05;
orbit.rotation.y = 0.103;
orbit.rotation.z = -0.02;

let center_piece = new THREE.Mesh(new THREE.TetrahedronGeometry(2,0),new THREE.MeshBasicMaterial(
    {
        color: "white"
    }
))
orbit.add(center_piece)
orbit.add(object,object1,object2)
scene.add(orbit,pointLight,ambientLight);

object.rotation.z = 0.8;
// object.position.set(0,0,-10)
object.rotation.x = -0.2
object2.rotation.z = -0.8;

object.rotation.order = "ZXY"
object2.rotation.order = "ZXY"
let rot_rad = THREE.MathUtils.degToRad(20)
renderer.setAnimationLoop(()=>
{
    let delta = clock.getDelta()
   object.rotation.y+=rot_rad*delta;
   object1.rotation.y+=rot_rad*delta;
   object2.rotation.y+=rot_rad*delta;
   center_piece.rotation.x+=rot_rad*2*delta;
   center_piece.rotation.y+=rot_rad*2*delta;
   center_piece.rotation.z+=rot_rad*2*delta;



    effectComposer.render()
    // renderer.render(scene,camera);
})
