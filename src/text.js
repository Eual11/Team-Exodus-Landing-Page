import * as THREE from "three"
import {TTFLoader} from "three/addons/loaders/TTFLoader.js"
import {Font} from "three/addons/loaders/FontLoader.js"
import {TextGeometry} from "three/addons/geometries/TextGeometry.js"// import { text } from "express";
// import { Object3D } from "../build/three.module";

const loader = new TTFLoader();


function createText(text_data, font_path,size, height,curveSegments)
{
    let textGeo = new THREE.Object3D()

    loader.load(font_path, function (json)
{
    let font = new Font(json);
    createTextGeo(text_data,font,size,height,curveSegments,textGeo)
})
console.log(textGeo)
return textGeo
}




function createTextGeo(text,font,size,height,curveSegments,textGeo)
{
    let textobj = new TextGeometry(text,{
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments
    })

    let textmesh = new THREE.Mesh(textobj,new THREE.MeshNormalMaterial())

    textGeo.add(textmesh)
}
export {createText}