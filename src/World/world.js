import {createCamera} from "../components/camera.js"
import {createCube} from "../components/cube.js";
import {createScene} from "../components/scene.js"
import {createRenderer} from "../components/renderer.js";
import {Resizer} from "../components/Resizer.js"
import {createLight} from "../components/lights.js";
import { Loop } from "../components/Loops.js";
// import { Light } from "../../build/three.module.js";
import {createMeshGroup} from "../components/meshGroup.js"
import { PointLight } from "../../build/three.module.js";
// import { createControls } from "../components/controls.js";
let camera
let scene;
let renderer;
let cube;
let light;
let loop;
class World
{
    constructor(container)
    {
        camera = createCamera(container);
         cube = createCube(container);
        renderer = createRenderer()
        scene = createScene()
        let Lights= createLight();
        let directionalLight = Lights[0];
        let hemiLight = Lights[1];
        let ambientLight = Lights[2];
        let pLight = new PointLight("white",5)
        // console.log(ambientLight)
        let group = createMeshGroup();
        scene.add(group[0],group[1],ambientLight)
        container.append(renderer.domElement)
        const resizer = new Resizer(container,camera,renderer);
        loop = new Loop(scene,camera,renderer);
       loop.animatables.push(group[0])
        // console.log(scene.children)

    }


    render()
    {
        renderer.render(scene,camera);
    }
    start()
    {
        loop.start()
    }
    stop()
    {
        loop.stop();
    }
    
    
    // animate()
    // {
    //     renderer.setAnimationLoop((time)=>
    //     {
    //         cube.rotation.x = time/2000;
    //         cube.rotation.y = time/3000;
    //         this.render();

    //     })
    // }
}
export {World}