import { Clock } from "../../build/three.module.js";
import { createControls } from "../components/controls.js"

let clock = new Clock();
let controls
class Loop
{
    constructor(scene,camera,renderer)
    {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.animatables =[];
        controls = createControls(camera,renderer.domElement);

    }


    start()
    {
        this.renderer.setAnimationLoop(()=>
        {
            this.tick();
            this.renderer.render(this.scene,this.camera); //render bois
            controls.update();
        })
    }

    stop()
    {
        this.renderer.setAnimationLoop(null);
    }

    tick()
    {
        let delta = clock.getDelta();
        for(const object of this.animatables)
        {
            object.tick(delta);
        }
    }
}
export {Loop}