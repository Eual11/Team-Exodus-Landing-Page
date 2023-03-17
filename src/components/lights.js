import {DirectionalLight,AmbientLight,HemisphereLight } from "../../build/three.module.js";
// import {  } from "../../build/three.module.js";
function createLight()
{
    const directionalLight = new DirectionalLight("white",9);
    // console.log(directionalLight);
    let hemisphereLight = new HemisphereLight("white","grey",5);
    let ambientLight = new AmbientLight("white",3)
    directionalLight.position.set(10,10,0);
    console.log(hemisphereLight)
    return [directionalLight ,hemisphereLight,ambientLight]
}
export {createLight}