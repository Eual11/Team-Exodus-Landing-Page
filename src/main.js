
import { World } from "./World/world.js";
function main()
{
	let container = document.getElementById("bg")
let world = new World(container);
world.render();
world.start();
// world.animate();
}
// let bg = document.getElementById("bg")
main();
