var matrixGarden = [ [0,1,1], [0,1,1], [0,1,1], [0,1,1], [0,0,1]];
var safeWay = [];
function findSafeWay(arr, colum, row){
    if(colum == arr.length){
        console.log(safeWay);
        return false;
    }
    for(var i = 0; i < arr[colum].length; i ++){
        if(arr[colum][i] == 0){
            safeWay.push(i);
            if(findSafeWay(arr, colum + 1, row))
                return false;
            safeWay.pop();
        }
    }
    return false;
}

findSafeWay(matrixGarden, 0, 0 );