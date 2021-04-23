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
        this._initStartGame();
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

    set score(val) {
        var obj = {
            value: this._score
        }
        TweenLite.to(obj, 0.3, {
            value: val,
            roundProps: {
                value: 10
            },
            onUpdate: () => {
                this._score = obj.value;
                this.children[2].text = this._score;
                this._elementGameOver();
            },
        })

    }

    get math() {
        return this._math;
    }

    set math(value) {
        this._math = value;
        this._math = this._math;
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
                card.x = 100;
                card.y = 350;
                linetime.to(card, { duration: 0.3, ease: "back.out(2.5)", x: j * 200 + 320, y: i * 230 + 25});
                this.addChild(card);
                index++;
                card.onClick("mousedown", this.onClickCard.bind(this));
            }
        }
    }

    onClickCard(evt) {
        let card = evt.target.node;
        if (this.countClick === 0 && card.isFlip === false) {
            this.countClick++;
            this.firstClick = card;
            this.firstClick.isFlip = true;
            card.children[0].scaleX = 0;
            this.flipOpen(card.children[1], card.children[0]);
        }
        else if (this.countClick === 1 && card.isFlip === false) {
            this.countClick++;
            this.secondClick = card;
            this.secondClick.isFlip = true;
            card.children[0].scaleX = 0;
            this.flipOpen(card.children[1], card.children[0]);
            if (this.firstClick._value === this.secondClick._value) {
                gsap.to(this.firstClick.children[0], { duration: 1, opacity: 0, scale: 2, delay: 0.5 });
                gsap.to(this.secondClick.children[0], { duration: 1, opacity: 0, scale: 2, delay: 0.5 });
                setTimeout(() => {
                    this.score += 50;
                    this.reSetup(this.firstClick, this.secondClick);
                    this.math++;
                }, 500);
            }
            else {
                this.flipClose(this.firstClick.children[1], this.firstClick.children[0]);
                this.flipClose(this.secondClick.children[1], this.secondClick.children[0]);
                setTimeout(() => {
                    this.score -= 100;
                    this.reSetup(this.firstClick, this.secondClick);
                }, 500);
            }
        } else {
            return;
        }
    }

    flipOpen(card1, card2) {
        let linetime = gsap.timeline();
        linetime.to(card1, { duration: 0.2, scaleX: 0 });
        linetime.to(card2, { duration: 0.2, scaleX: 1 });
    }

    flipClose(card1, card2) {
        gsap.to(card1, { duration: 0.3, scaleX: 1, delay: 1 });
        gsap.to(card2, { duration: 0.3, scaleX: 0, delay: 1 });
    }

    reSetup(card1, card2) {
        card1.isFlip = false;
        card2.isFlip = false;
        this.countClick = 0;
    }

    _elementScore() {
        var textScore = new Label("Score", 70, "Black");
        textScore.x = 90;
        textScore.y = 40;
        this.addChild(textScore);
    }

    _elementCountScore() {
        var countScore = new Label(this.score, 70, "Black");
        countScore.x = 105;
        countScore.y = 130;
        this.addChild(countScore);
    }

    _elementGameOver() {
        var gameOver = new Sprite("../img/game-over.jpeg");
        this.setUpSprite(gameOver, 350, 90, 950, 750, false);
        this.addChild(gameOver);
        if (this.score <= 0) {
            gameOver.active = true;
            for (let i = 1; i < 26; i++) {
                this.children[i].active = false;
            }
        }
        var winner = new Sprite("../img/winner.jpeg");
        this.setUpSprite(winner, 525, 200, 600, 400, false);
        this.addChild(winner);
        if (this._math === 10) {
            winner.active = true;
        }
    }

    _initStartGame() {
        var startGame = new Sprite("../img/StartGame.png");
        this.setUpSprite(startGame, 350, 100, 900, 750, true);
        this.addChild(startGame);
        startGame.onClick("mousedown", this.onPlayGame.bind(this));
    }

    setUpSprite(sprite, left, top, width, height, active){
        sprite.x = left;
        sprite.y = top;
        sprite.width = width;
        sprite.height = height;
        sprite.active = active;
    }

    onPlayGame(evt) {
        evt.target.style.display = 'none';
        this._elementCountScore();
        this._elementScore();
        this._elementCard();
        this._elementGameOver();
        this._initRestartGame();
    }

    _initRestartGame() {
        var reStartGame = new Sprite("../img/replay.png");
        this.setUpSprite(reStartGame, 1400, 350, 200, 200, true);
        this.addChild(reStartGame);
        reStartGame.onClick("mousedown", this.onRePlayGame.bind(this));
    }

    onRePlayGame(evt) {
        location.reload();
    }
}