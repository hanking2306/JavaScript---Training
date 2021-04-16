var game = document.createElement("div");
game.style.left = "auto";
game.style.top = "auto";
document.body.appendChild(game);
game.style.position = "relative";



var bg = createImage("./img/trucxanh_bg.jpg", 0, 0, 1100, 900);

var ArrayImg = [];
for(let i = 0; i < 10; i++){
    ArrayImg.push(i);
    ArrayImg.push(i);
}
function randomIndex(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
randomIndex(ArrayImg);

function createImage(src, top, left, width, height, index, value) {
    var image = document.createElement("img");
    image.src = src;
    image.id = index;
    image.value = value;
    image.style.position = "absolute";
    width && (image.style.width = width +"px");
    height && (image.style.height = height+ "px");
    image.style.top = top + "px";
    image.style.left = left + "px";
    game.appendChild(image);

    return image;
}

function createCover(top, left, width, height, index){
    var cover = document.createElement('div');
    cover.style.border = "3px solid";
    cover.style.backgroundImage = "url('./img/cover.jpeg')"
    cover.style.position = "absolute";
    cover.innerHTML = index;    
    cover.style.lineHeight = "100px";
    cover.style.textAlign = "center";
    cover.style.fontSize = "30px";
    cover.id = "cover" + index;
    cover.addEventListener('click', () => {
        clickCover(cover);
    })
    width && (cover.style.width = width +"px");
    height && (cover.style.height = height + "px");
    cover.style.top = top + "px";
    cover.style.left = left + "px";
    game.appendChild(cover);
    return cover;
}

var imageArr = [];
var imageValue = [];

function addImg(){
    for(let i = 0, index = 0; i < 4; i++){
        for(let j = 0; j < 5; j++){
            let nameImg = "./img/trucxanh" + ArrayImg[index] + ".jpg";
            var valueImage = ArrayImg[index];
            imageValue.push(valueImage);
            imageArr[index] = createImage(nameImg, i * 150 + 200, j * 150 + 200, 100, 100, index + 1, valueImage);
            var cover = createCover(i * 150 + 200, j * 150 + 200, 100, 100, index + 1);
            index++;
        }
    }
    console.log(imageValue);
}
addImg();

var clickedImg = [];
var clickedCover = [];
var img_value = [];
var win = 0

function clickCover(cover){
    cover.style.display = 'none';
    clickedCover.push(cover.id);
    var string = cover.id;
    var number = string.substr(5, 2);
    clickedImg.push(imageValue[number - 1]);
    console.log(clickedCover);
    console.log(clickedImg);
    if(clickCover.length < 2){
        cover.style.display = 'none';
    }
    else if(clickCover.length == 2){
        setTimeout(function(){
            if(clickedImg[0] !== clickedImg[1]){
                document.getElementById(clickedCover[0].id).style.display = 'flex';
                document.getElementById(clickedCover[1].id).style.display = 'flex';
            }
            else {
                document.getElementById(clickedImg[0].id).style.display = 'none';
                document.getElementById(clickedImg[1].id).style.display = 'none';
            }
        }, 1000)
    }
}

