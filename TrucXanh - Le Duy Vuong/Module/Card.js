import { Label } from "../Lib/Label.js";
import { Node } from "../Lib/Node.js";   
import { Sprite } from "../Lib/Sprite.js";


export class Card extends Node{
    constructor(src, index, value) {
        super();
        this._src = src;
        this._index = index;
        if(index) this._index = index;
        this._value = value;
        if(value) this._value = value;
        this._width = 150;
        this._height = 150;   
        this._iniImg();
        this._initCover();
    }
    
    get src(){
        return this._src;
    }

    set src(val){
        this._src = val;
    }

    _initCover(){
        var cover = new Sprite("../img/pokemonBack.jpeg");
        cover.width = 150;
        cover.height = 150;
        cover.x = 100;
        cover.y = 100;
        cover.elm.node = this;
        this.addChild(cover);
    }

        
    _iniImg(){
        var img = new Sprite(this.src);
        img.width = 150;
        img.height = 150;
        img.x = 100;
        img.y = 100;
        this.addChild(img);
    }
}