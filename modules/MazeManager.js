import {Vector2} from "./Vector2.js";

export class MazeManager {
    dimension;  // Vector2

    // array of booleans indicating whether the corresponding coordinate is part of maze
    mask;

    constructor (dimension, mask) {
        this.dimension = dimension;
        this.mask = mask;
    }
    
    
    getNeighbors(vec) {
        var arr = [null, null, null, null];
        if (vec.x > 0) {
            arr[0] = new Vector2(vec.x-1, vec.y);
        }
        if (vec.y > 0) {
            arr[1] = new Vector2(vec.x, vec.y-1);
        }
        if (vec.x < (this.dimension.x - 1)) {
            arr[2] = new Vector2(vec.x+1, vec.y);
        }
        if (vec.y < (this.dimension.y - 1)) {
            arr[3] = new Vector2(vec.x, vec.y+1);
        }
        return arr;
    }

    // randomize array by swapping random elements 2 times
    static randomizeNeighborsArray(arr) {
        var rands = [];
        for (let i = 0; i < 4; i++) {
            rands[i] = Math.floor(Math.random() * 4);
        }
        arr.swap(rands[0], rands[1]);
        arr.swap(rands[2], rands[3]);
    }


    // returns a unique index to assign to the node in graph
    getIndexOf(node) {

        return (node.x + (node.y * this.dimension.x));

    }

    get size(){
        return (this.dimension.x * this.dimension.y);
    }

}