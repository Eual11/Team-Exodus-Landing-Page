// import { AdditiveBlending } from "three";
import { Mesh,MeshStandardMaterial,Group,MathUtils,SphereGeometry,AxesHelper, TextureLoader, AdditiveBlending, SubtractiveBlending} from "../../build/three.module.js";

function createMeshGroup()
{
const tl = new TextureLoader();
    
    
    let group = new Group();

    let sun_texture = tl.load("../img/2k_sun.jpg");
    let texture_data =["2k_mercury.jpg","2k_venus_surface.jpg","earth.jpg","2k_mars.jpg","2k_jupiter.jpg","2k_saturn.jpg","2k_uranus.jpg","2k_neptune.jpg"  ]
    
    let material = new MeshStandardMaterial({
        // color:'indigo',
        map:sun_texture,
        // blending: AdditiveBlending
    });

    let protoShereGeometry = new SphereGeometry(5,30,30);
    let sun = new Mesh(protoShereGeometry,material);
    sun.isSun = true;
    console.log(sun.isSun);
    sun.position.set(0,0,0)
    let helper = new AxesHelper(4);
    let rad = MathUtils.degToRad(50);
    group.tick = (delta)=>{
        if(!group.isSun)
            group.rotation.y+=delta*rad;
    }
    let planetGeometry = new SphereGeometry(1.5,30.30);
    // planetGeometry.scale(0.5)
  
    for( let i=0; i <8; i+=1)
    {
        let normal_map = null
        let planet_texture = tl.load("../img/"+texture_data[i]);
        if(i==2)
            {
                let normal_map = tl.load("../img/earth.tif")
            }
        let planetMaterial = new MeshStandardMaterial({
            // color:"cyan"
            map:planet_texture,
            normalMap: normal_map
        })
        let planet = new Mesh(planetGeometry,planetMaterial)

        let theta = 2*Math.PI*Math.random();
        let offset = (16+i)*(Math.random())+9;
        let x =offset*Math.cos(theta);
        let y = 0 //Math.cos(theta);
        let z = offset*Math.sin(theta);
        planet.position.set(x,y,z);
        planet.isSun = false;
        group.add(planet)
    }
    // group.add(sun);
    // group.add(helper)

    return [group,sun];


}

export {createMeshGroup}