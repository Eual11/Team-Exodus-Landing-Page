import { TextureLoader,Color, Scene } from "../../build/three.module.js";
function createScene()
{
    const scene = new Scene();
    const Tloader = new TextureLoader();
    let texture = Tloader.load("../img/space.jpg");
    const color = new Color("black");
    scene.background = texture;
    return scene
}
export {createScene};