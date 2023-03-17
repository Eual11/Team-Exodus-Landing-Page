import * as THREE from "three"
let clock = new THREE.Clock();

function random(min,max)
{
    return min+Math.random()*(max-min);
}

let gu =
{
    time: {value: 0},
    point_texture: {value: null},
    w: {value: 100},
    h: {value: 100}

}




function createRocks(rocksCount,rocksDetail,rockRadius,position,particlesCount,particlesRadius )
{
    let group = new THREE.Group();
    const normal_material = new THREE.MeshNormalMaterial({
        blending: THREE.AdditiveBlending
    });
    let count = rocksCount||200;
for (let i =0; i<count; i++)
{
    let radius = random(0.07,0,rockRadius);
    let detail = Math.floor(0,rocksDetail|4);

    let geo= new THREE.OctahedronGeometry(radius,detail);

    let mesh = new THREE.Mesh(geo,normal_material);
    radius = rockRadius || 3.2
    let v = new THREE.Vector3().randomDirection().multiplyScalar(radius);

    mesh.position.set(v.x,v.y,v.z);
    group.add(mesh);
    
}
    let offset = new THREE.Vector3(0,0,0);
    offset = position || offset;
group.position.set(offset.x,offset.y,offset.z);
let pts= []
let pCount = particlesCount||1500
for(let i =0; i <pCount; i++)
{
    let v = new THREE.Vector3().randomDirection().multiplyScalar(random(0,(particlesRadius||2.3)));
    pts.push(v);
    
}
let pts_geomtry = new THREE.BufferGeometry().setFromPoints(pts);
const shading_material = new THREE.ShaderMaterial(
    {
        uniforms:gu,
      
        vertexShader:document.getElementById("rocks_vertexshader").textContent,
        fragmentShader: document.getElementById("rocks_fragmentshader").textContent,
        depthTest:true,
        transparent: true,
        blending:THREE.AdditiveBlending,
        // map:texure
    }
)
let points = new THREE.Points(pts_geomtry,shading_material);
group.rotation.z-=Math.random();

points.position.set(offset.x,offset.y,offset.z);
return {group,points}

}

export {createRocks}