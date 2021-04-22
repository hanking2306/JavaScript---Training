import { Sprite } from "../Lib/Sprite.js";
import { Node } from "../Lib/Node.js"
import { Card } from "./Card.js";
import { Label } from "../Lib/Label.js";

var listCard = [];
for (let i = 0; i < 10; i++) {
    listCard.push({
        src: "../img/pokemon" + i + ".png",
        value: i,
        available: 2,
    })
}

export class Game extends Node {
    init() {
        this._elementBackground();
        // this._elementScore();
        // this._elementCountScore();
        // this._elementCard();
        this._initStartGame();
        // this._initRestartGame();
        // this._elementGameOver();
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

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
        this.children[2].text = this._score;
    }

    get math() {
        return this._math;
    }

    set math(value) {
        this._math = value;
        this._math = this._math;
    }

    _initRestartGame() {
        var startGame = new Label("Restart Game", 80, "White");
        startGame.width = 200;
        startGame.height = 200;
        startGame.x = 1350;
        startGame.y = 720;
        this.addChild(startGame);
    }

    _elementCard() {
        var arrRandom = [];
        var index = 1;
        var linetime = gsap.timeline(index);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                do {
                    var randomCard = Math.floor(Math.random() * listCard.length);
                    arrRandom.push(randomCard);
                } while (listCard[randomCard].available == 0) {
                    listCard[randomCard].available--;
                }
                var card = new Card(listCard[randomCard].src, index, listCard[randomCard].value);
                card.x = -10;
                card.y = 300;
                linetime.to(card, { duration: 0.2, x: j * 200 + 250, y: i * 230 - 70 });
                this.addChild(card);
                index++;
                card.onClick("mousedown", this.onClickCard.bind(this));
            }
        }
    }

    onClickCard(evt) {
        var linetime = gsap.timeline();
        let card = evt.target.node;
        if (this.countClick === 0 && card.isFlip === false) {
            this.countClick++;
            this.firstClick = card;
            this.firstClick.isFlip = true;
            card.children[0].scaleX = 0;
            linetime.to(card.children[1], { duration: 0.2, scaleX: 0 });
            linetime.to(card.children[0], { duration: 0.2, scaleX: 1 });
        }
        else if (this.countClick === 1 && card.isFlip === false) {
            this.countClick++;
            this.secondClick = card;
            this.secondClick.isFlip = true;
            card.children[0].scaleX = 0
            linetime.to(card.children[1], { duration: 0.2, scaleX: 0 });
            linetime.to(card.children[0], { duration: 0.2, scaleX: 1 });
            if (this.firstClick._value === this.secondClick._value) {
                gsap.to(this.firstClick.children[0], { duration: 1, opacity: 0, scale: 2, delay: 0.5 });
                gsap.to(this.secondClick.children[0], { duration: 1, opacity: 0, scale: 2, delay: 0.5 });
                setTimeout(() => {
                    this.firstClick.isFlip = false;
                    this.secondClick.isFlip = false;
                    this.countClick = 0;
                    this.score += 50;
                    this.math++;
                    this._elementGameOver();
                }, 1000);
            }
            else {
                gsap.to(this.firstClick.children[1], { duration: 0.3, scaleX: 1, delay: 1 });
                gsap.to(this.firstClick.children[0], { duration: 0.3, scaleX: 0, delay: 1 });
                gsap.to(this.secondClick.children[1], { duration: 0.3, scaleX: 1, delay: 1 });
                gsap.to(this.secondClick.children[0], { duration: 0.3, scaleX: 0, delay: 1 });
                setTimeout(() => {
                    this.firstClick.isFlip = false;
                    this.secondClick.isFlip = false;
                    this.countClick = 0;
                    this.score -= 100;
                    this._elementGameOver();
                }, 1000);
            }
        } else {
            return;
        }
    }

    _elementScore() {
        var textScore = new Label("Score", 70, "White");
        textScore.x = 95;
        textScore.y = 70;
        this.addChild(textScore);
    }

    _elementCountScore() {
        var countScore = new Label(1000, 70, "White");
        countScore.x = 110;
        countScore.y = 170;
        this.addChild(countScore);
    }
    
    _initStartGame() {
        var startGame = new Sprite("../img/StartGame.png");
        startGame.width = 900;
        startGame.height = 750;
        startGame.x = 350;
        startGame.y = 100;
        this.addChild(startGame);
        startGame.onClick("mousedown", this.onPlayGame.bind(this));
    }

    onPlayGame(evt) {
        evt.target.style.display = 'none';
        this._elementCountScore();
        this._elementScore();
        this._elementCard();
        this._elementGameOver();
    }

    _elementGameOver() {
        var gameOver = new Sprite("../img/game-over.jpeg");
        gameOver.x = 350;
        gameOver.y = 120;
        gameOver.width = 900;
        gameOver.height = 700;
        gameOver.active = false;
        this.addChild(gameOver);
        if (this.score <= 0) {
            gameOver.active = true;
            for(let i = 1; i < 26; i++){
                this.children[i].active = false;
            }
        }
        var winner = new Sprite("../img/winner.jpeg");
        winner.x = 525;
        winner.y = 200;
        winner.width = 600;
        winner.height = 400;
        winner.active = false;
        this.addChild(winner);
        if (this._math === 10) {
            winner.active = true;
        }
    }

    // _initRestartGame(){
    //     var startGame = new Sprite("../img/StartGame.png");
    //     startGame.width = 900;
    //     startGame.height = 650;
    //     startGame.x = 350;
    //     startGame.y = 200;
    //     this.addChild(startGame);
    //     startGame.onClick("mousedown", this.onPlayGame.bind(this));
    // }

    // onPlayGame(evt){
    //     evt.target.style.display = 'none';
    //     this._elementScore();
    //     this._elementCountScore();
    //     this._elementCard();
    // }
}
