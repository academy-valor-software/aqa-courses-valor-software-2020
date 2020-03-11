type NumOrSrt = number | string;
class MyClass implements User {
    constructor(public name: string) {
    }
}
let foo = new MyClass('Anton');
console.log(foo.name);
interface User {
    readonly age?: number;
    name: string;
}
/*
interface Uxzser {
    lastName: string;
}
*/
//let myUser = NumOrSrt;
/*
let objUser: User = { name: 'Anton' };
objUser.name = 'test';
*/
/*
function myFunction(str1: string): number  {
    return 0;
}
let fun: myFun = myFunction;
*/
