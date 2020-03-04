type AnimalArr = Animal [];



class Animal implements User {
    constructor(public name: string) {
    }
    makeSound() {
        console.log(this.name);
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(`${name} + cat`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(`${name} + dog`);
    }
}

function makeAnimalSound(arrAnimal: AnimalArr ) {
    for (const animal of arrAnimal) {
        animal.makeSound();
    }
}

makeAnimalSound([new Animal('AAA'), new Cat('BBB'), new Dog('CCC')]);


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
