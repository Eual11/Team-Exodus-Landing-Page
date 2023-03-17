// import {OrbitControls} from "../../ex10";
import {OrbitControls} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls"; 


function createControls(camera, renderer)
{
    let controls = new OrbitControls(camera,renderer);
    controls.enablePan = false;
    controls.enableDamping = true;

    return controls;
}
export {createControls};