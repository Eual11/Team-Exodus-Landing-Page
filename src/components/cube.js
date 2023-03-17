import { MathUtils } from "../../build/three.module.js";
import { Mesh, MeshStandardMaterial } from "../../build/three.module.js";
import { BoxGeometry } from "../../build/three.module.js";
import { MeshNormalMaterial } from "../../build/three.module.js";
import { TextureLoader } from "../../build/three.module.js";
// import { SRGBColorSpace } from "";

function createMaterial()
{
    const textureloder = new TextureLoader();//TextureLoader.load()
    let texture = textureloder.load("../src/assets/textures/lava.jpeg")
    const material =  new MeshStandardMaterial({
        map: texture
    })
    return material;
    
}

function createCube(container)
{
    const geometry = new BoxGeometry(2,2,2);
    const material =  createMaterial();//new MeshNormalMaterial();//new MeshStandardMaterial({color:0x800020});
    const cube = new Mesh(geometry,material);
    cube.rotation.set(-0.5,1,5);
    let rads = MathUtils.degToRad(30);
    let velocity = 1.2;
   cube.tick = (delta)=>
   {
   
    
  
    cube.rotation.x += rads*delta;
    cube.rotation.y += rads*delta;
    cube.rotation.z += rads*delta;
    if(velocity < 0 && cube.position.x <-4.5)
    {
        velocity = 1.2;
    }
    else if(velocity > 0 && cube.position.x >5.5)
    {
        velocity = -1.2;
}
    cube.position.x +=velocity*delta;

   
    
}
return cube;
}
export {createCube};