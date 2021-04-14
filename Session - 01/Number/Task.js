function factorialNumber(number){
    var factorial  = 1;
    for(var i = 1; i <= number; i++)
        factorial *= i;
    console.log(factorial); 
}

function randomNumber(min, max){
    var random = Math.floor(Math.random()* max) + min;
    console.log(random);
}

function randomElement(arr){
    var i = Math.floor(Math.random() * arr.length);
    console.log(arr[i]);
}

function missingElement(arr1, arr2){
    for(var i = 0; i < arr1.length; i++){
        for(var j = 0; j < arr2.length; j++){
            if(arr1[i] == arr2[j]){
                arr2.splice(j,1);
            }
        }
    }
    console.log(arr2);
}

factorialNumber(7);
randomNumber(2, 10);
randomElement([6,7,8,9]);
missingElement([1,3,4,5], [5,6,7,2]);