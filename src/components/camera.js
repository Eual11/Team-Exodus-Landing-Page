import {PerspectiveCamera} from "../../build/three.module.js"

function createCamera(contanier)
{
   let aspect = contanier.clientWidth/contanier.clientHeight;
    let camera = new PerspectiveCamera(35,aspect,0.1,100);
    camera.position.z = 50;

    return camera;
}
export {createCamera};