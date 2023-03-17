import * as THREE from  "three" 
const PI = Math.PI
const textureLoader = new THREE.TextureLoader();

let texure = textureLoader.load("../img/shit 2.png")
texure.wrapS = texure.wrapT = THREE.RepeatWrapping
let particles_count = 6000;
let particles= []//
let colors = [];
let sizes = [];

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

function random(min,max)
{
    let diff = max-min;

    return min+(Math.random()*diff)
}


function createParticles(count, xRange, yRange,zRange,size)
{
    
    let texure = textureLoader.load("../img/shit 2.png")
    texure.wrapS = texure.wrapT = THREE.RepeatWrapping
    let particles_count = count || 200
    let particles= []//
    let colors = [];
    let sizes = [];
    let geometry = new THREE.BufferGeometry()
    let color = new THREE.Color();
    for (let i =0; i < particles_count; i++)
    {
        let x = random(xRange.x||-100,xRange.y||100);
        let y = random(yRange.x||-50,yRange.y||50);

        let z = random(zRange.x||-70,zRange.y||50);
        

        particles.push(x,y,z);

        color.r = random(0,1.2);
        color.b = random(0,1.2);
        color.g = random(0,1.1);
        
        colors.push(color.r-0.1,color.g-0.5,color.b-0.3);
        

        sizes.push(size||15);

    }

    let material = new THREE.PointsMaterial(
        {
            color:"red",
            size:0.3,
            transparent:true,
            blending: THREE.AdditiveBlending,
            depthTest:true,
        }
    )
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(particles,3));
geometry.setAttribute( "color", new THREE.Float32BufferAttribute( colors, 3 ) );
geometry.setAttribute("size",new THREE.Float32BufferAttribute(sizes,1).setUsage(THREE.DynamicDrawUsage));


const shading_material = new THREE.ShaderMaterial(
    {
        uniforms:gu,
      
        vertexShader:document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent,
        depthTest:true,
        transparent: true,
        blending:THREE.AdditiveBlending,
    }
)
let particleSystem = new THREE.Points(geometry,shading_material);

return particleSystem

    

}


export {createParticles}