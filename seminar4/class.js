const student = {
    name: 'Ivan',
    surname: 'Ivanov',
    sayMySurname: function() {
        console.log(this.surname)
    }
}

// student.sayMyName() = function() {
//     console.log(name)
// }

student.sayMySurname()

class People {
    constructor(name, surname) {
        this.name = name
        this.surname=surname
    }

    introduce() {
        console.log(`I am ${this.name} ${this.surname}`)
    }

    get age() {
        return this._age
    }

    set age(value){
        if (value <= 16) {
            console.error('not valid age')
            return
        }
        this._age = value
    }
}


const ivan = new People('Ivan', 'Ivanov')
ivan.introduce()

ivan.age = 18
console.log(ivan.age)

class Student extends People{
    get score(){
        return this._score
    }

    set score(value){
        this._score = value
    }
}

const stud = new Student('Alex', 'Petrov')
stud.score = {
    math: 5,
    english: 4
}

console.log(stud)