import { Sprite } from "../Lib/Sprite.js";
import { Node } from "../Lib/Node.js"
import { Card } from "./Card.js";
import { Label } from "../Lib/Label.js";

var listCard = [];
for(let i = 0; i < 10; i++){
    listCard.push({
        src: "../img/trucxanh" + i + ".jpg",
        value: i,
        available: 2,
    })
}

export class Game extends Node {
    init() {
        this._elementBackground();
        this._elementScore();
        this._elementCountScore();
        this._elementCard();
        this._elementGameOver();
        this.countClick = 0;
        this.arrValue = [];
        this.firstClick = null;
        this.secondClick = null;
        this._score = 1000;
        this._math = 0;
    }
    _elementBackground() {
        var bg = new Sprite("../img/trucxanh_bg.jpg");
        bg.width = 1650;
        bg.height = 950;
        this.addChild(bg);
    }

    get score(){
        return this._score;
    }

    set score(value){
        this._score = value;
        this.children[2].text = this._score;
    }

    get math(){
        return this._math;
    }

    set math(value){
        this._math = value;
        console.log(this._math);
        this._math = this._math;
    }

    _elementCard(){
        var arrRandom = [];
        var index = 1;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 5; j++){
                do{
                    var randomCard = Math.floor(Math.random() * listCard.length);
                    arrRandom.push(randomCard);
                }while(listCard[randomCard].available == 0){
                    listCard[randomCard].available--;
                }
                var card = new Card(listCard[randomCard].src, index, listCard[randomCard].value);
                card.x = j * 200 + 250;
                card.y = i * 200 - 10;;
                this.addChild(card);
                index++;
                card.onClick("mousedown", this.onClickCard.bind(this));
            }
        }
    }

    flipAnimation(cover, img){
        let timeline = gsap.timeline();
        timeline.to(cover, {duration: 0.5, scaleX: 0});
        timeline.to(img, {duration: 0.5, scaleX: 1});
    }

    onClickCard(evt) {
        let card = evt.target.node;
        this.countClick++;
        if(this.countClick === 1){
            this.firstClick = card;
            // flipAnimation(this.firstClick.children[0], this.firstClick.children[1]);
            this.firstClick.children[1].active = false;
        }
        else if(this.countClick === 2){
            this.secondClick = card;
            this.secondClick.children[1].active = false;
            if(this.firstClick._value === this.secondClick._value){
                setTimeout(() => {
                    this.firstClick.children[0].active = false;
                    this.secondClick.children[0].active = false;
                    this.countClick = 0;
                    this.score += 50;
                    this.math++;
                    this._elementGameOver();
                }, 500)
            }
            else {
                setTimeout(()=>{
                this.firstClick.children[1].active = true;
                this.secondClick.children[1].active = true;
                this.countClick = 0;
                this.score -= 100;
                this._elementGameOver();
                }, 500)
            }
        }
    }

    _elementScore(){
        var textScore = new Label("Score", 70, "Red");
        textScore.x = 95;
        textScore.y = 300;
        this.addChild(textScore);
    }

    _elementCountScore(){
        var countScore = new Label(1000, 70, "Red");
        countScore.x = 100;
        countScore.y = 400;
        this.addChild(countScore);
    }

    _elementGameOver(){
        var gameOver = new Sprite("../img/game-over.jpeg");
        gameOver.x = 350;
        gameOver.y = 90;
        gameOver.width = 950;
        gameOver.height = 750;
        gameOver.active = false;
        this.addChild(gameOver);
        if(this.score <= 0){
            gameOver.active = true;
        }
        var winner = new Sprite("../img/winner.jpeg");
        winner.x = 525;
        winner.y = 200;
        winner.width = 600;
        winner.height = 400;
        winner.active = false;
        this.addChild(winner);
        if(this._math === 10){
            winner.active = true;
        }
    }
}