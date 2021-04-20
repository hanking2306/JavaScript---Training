import { Sprite } from "../Lib/Sprite.js";
import { Node } from "../Lib/Node.js"
import { Card } from "./Card.js";
import { Label } from "../Lib/Label.js";

var listCard = [
    {
        src: "../img/trucxanh0.jpg",
        value: 0,
        available: 2,
    },

    {
        src: "../img/trucxanh1.jpg",
        value: 1,
        available: 2,
    },

    {
        src: "../img/trucxanh2.jpg",
        value: 2,
        available: 2,
    },

    {
        src: "../img/trucxanh3.jpg",
        value: 3,
        available: 2,
    },

    {
        src: "../img/trucxanh4.jpg",
        value: 4,
        available: 2,
    },

    {
        src: "../img/trucxanh5.jpg",
        value: 5,
        available: 2,
    },

    {
        src: "../img/trucxanh6.jpg",
        value: 6,
        available: 2,
    },

    {
        src: "../img/trucxanh7.jpg",
        value: 7,
        available: 2,
    },
    
    {
        src: "../img/trucxanh8.jpg",
        value: 8,
        available: 2,
    },

    {
        src: "../img/trucxanh9.jpg",
        value: 9,
        available: 2,
    },
]

export class Game extends Node {
    init() {
        this._elementBackground();
        this._elementCard();
        this._elementScore();
        this.countClick = 0;
        this.arrValue = [];
    }
    _elementBackground() {
        var bg = new Sprite("../img/trucxanh_bg.jpg");
        bg.width = 1650;
        bg.height = 950;
        this.addChild(bg);
    }


    _elementCard(){
        var index = 1;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 5; j++){
                do{
                    var randomCard = Math.floor(Math.random() * listCard.length);
                }while(listCard[randomCard].available == 0){
                    listCard[randomCard].available--;
                }
                var card = new Card(listCard[randomCard].src, index, listCard[randomCard].value)
                card.x = j * 200 + 250;
                card.y = i * 200 + 20;
                this.addChild(card);
                index++;
                card.onClick("mousedown", this.onClickCard.bind(this));
            }
        }
    }

    onClickCard(evt) {
        let card = evt.target.node;
        card.children[1]._active=false;
        this.countClick++;
        if(this.countClick <= 2){
            this.arrValue.push(card._value);
            console.log(this.arrValue);
            // if(this.arrValue[0] === this.arrValue[1]){
            //     card._active = false;
            }
        // }else if(this.countClick === 2){
            
        // }
        console.log(card.children[1]._active)
        
    }

    _elementScore(){
        var textScore = new Label("Score: ", 40, "blue");
        textScore.x = 50;
        textScore.y = 50;
        this.addChild(textScore);
    }
}