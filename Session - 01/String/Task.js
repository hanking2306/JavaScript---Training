
function formatMoney(stringMoney){
    var transMoney = new Intl.NumberFormat('en-US');
    console.log(transMoney.format(stringMoney));
}

function shortMoney(money){
    if(money.length <= 6){
        if(money % 1000 == 0)
            money = money.slice(0, money.length - 3) + "K";
        else {
            money = money.slice(0, money.length - 3) + "." + money.slice(money.length - 3, money.length - 1) + "K";
        }
        console.log(money);
    }
    else if(money.length > 6 && money.length <= 9){
        if(money % 1000000 == 0)
            money = money.slice(0, money.length - 6) + "M";
        else {
            money = money.slice(0,money.length - 6) + "." + money.slice(money.length - 6, money.length - 4) + "M";
        }
        console.log(money);
    }
    else if(money.length > 9){
        if(money % 1000000000 == 0)
            money = money.slice(0, money.length - 9) + "B";
        else {
            money = money.slice(0,money.length - 9) + "." + money.slice(money.length - 9, money.length - 7) + "B";
        }
        console.log(money);
    }
}

function countWorld(stringWorld){
    var count = 1;
    for(var i = 0; i < stringWorld.length; i++)
        if(stringWorld[i].toUpperCase() == stringWorld[i])
            count++;
    console.log(count);
}

function getExtension(file){
    var exten = file.slice(file.indexOf(".") + 1, file.length);
    console.log(exten);
}

formatMoney("123450.98");
shortMoney("1342222");
countWorld("oneTwoThreeFour");
getExtension("hello.mp3");