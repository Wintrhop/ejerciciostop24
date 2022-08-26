const cars= require("./cars");
/*import cars from "cars.js"*/
/*Ejercicio 1
const arr = [1, 2, 3, 4, 5, 6];

// utilizar el método map de los arreglos para duplicar cada elemento
// [2, 4, 6, 8, 10, 12]

// utilizar el método filter para filtrar los números pares de arr
// [2, 4, 6]

// utilizar el método reduce para sumar todos los elementos
// 21 */

const arr = [1, 2, 3, 4, 5, 6];

const newarr = arr.map(item => item *2);

console.log(newarr);

const filterarray = arr.filter(item => {
    if(item % 2 === 0) return item
})
console.log(filterarray);

const reducearray = arr.reduce((a,b)=> a+b);
console.log(reducearray);

/*Ejercicio 2
For this exercise use the filter , map, y reduce methods to generate some reports.

Create a cars.js file with the following content:


Create a function ferraris that returns all the cars of the Ferrari brand.

Create a function nineties that returns all the cars with models between 1980 and 1990.

Create a function list that returns an array of strings with the same number of cars. 
Each element should contain the string “This from costs $” (e.g. for the first element 
    it should say “This Mazda from 1989 costs $5241”).

Create a function bmwSum that returns the sum of all prices of the BMW cars. */




function ferraris(cars) {
    const filterferrari = cars.filter(item => {
        if(item.brand === 'Ferrari') return item;
    })
    return filterferrari;
}

function nineties(cars) {
    const filtermodel= cars.filter(item=>{
        if(item.model > 1980 && item.model < 1990) return item;
    })
    return filtermodel;
}
console.log(nineties(cars));

function list(cars) {
    const listcars= cars.map(item=>`this ${item.brand} from ${item.model} costs $${item.price}`)
    return listcars;
}
console.log(list(cars));

function bmwSum(cars) {
    const filterBmw = cars.filter(item=>{
        if (item.brand==='BMW') return item.price;
    })
   return filterBmw;
    
}

function bmwSum(cars) {
    const filterBmw = cars.filter(item=>{
        if (item.brand==='BMW') return item;
    })
    const mapBmw =filterBmw.map(item=> item.price);
    const reduceBmw = mapBmw.reduce((a,b)=> a+b);
    return reduceBmw;
    
   
    
}
console.log(bmwSum(cars));