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
        this._isFlip = false;
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

    get isFlip(){
        return this._isFlip;
    }

    set isFlip(value){
        this._isFlip = value;
    }

    _initCover(){
        var cover = new Sprite("../img/pokemonCard.png");
        cover.width = 150;
        cover.height = 200;
        cover.elm.node = this;
        this.addChild(cover);
    }

        
    _iniImg(){
        var img = new Sprite(this.src);
        img.width = 150;
        img.height = 200;
        this.addChild(img);
    }
}