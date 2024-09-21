import {Vector2} from "./modules/Vector2.js"
import {MazeManager} from "./modules/MazeManager.js"

window.onload = main;


function main() {

    initialize();


    var canvasDim = new Vector2(256, 256);
    var mazeDim = new Vector2(128, 128);
    
    var canvas = document.getElementById("cnvs");
    var ctx = canvas.getContext("2d");
    
    var image = document.querySelector("img");
    
    ctx.drawImage(image, 0, 0, canvasDim.x, canvasDim.y);
    var imgData = ctx.getImageData(0, 0, canvasDim.x, canvasDim.y);
    

    var mask = new Array(mazeDim.x*mazeDim.y);

    var factor = canvasDim.x / mazeDim.x;

    for (let i = 0; i < mask.length; i++) {
        if (imgData.data[4*i*factor] > 127) {
            mask[i] =  true;
        } else {
            mask[i] =  false;

        }
    }


    ctx.putImageData(imgData, 0, 0);
    
    var mazeManager = new MazeManager(mazeDim, mask);
    console.log(imgData);
    console.log(mazeManager.mask);

    ctx.fillStyle = "#00ff00";
    for (let i = 0; i < mask.length; i++) {
        if (mask[i]) {
            let x = (i % mazeDim.x) * factor;
            let y = Math.floor(i / mazeDim.x) * factor;
            ctx.fillRect(x, y, factor, factor);
        }
    }

}










function initialize() {
    
    // adding a swap method to Array prototype for ease
    Array.prototype.swap = function(i, j) {
        var temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }


}













