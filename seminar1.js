const arr = [1,2]
console.log(arr)

arr.push(3)
console.log(arr)

console.log(varv)
var varv = 1


const obj ={
    a: 1, 
    b: 2,
    c: null,
    d: {
        dd: 1,
        cc: 2
    }
}

console.log(obj.d.dd)
//console.log(obj.f.d)
if(obj) console.log("obj exists")

const fl = 0
if(fl){
    console.log("fl exists")
}

const t = obj && obj.f ? obj.f.d : null
console.log(t)

const a = obj.a != 1 ? 3 : 5

let b 
if (obj.a != 1){
    b = 3
}
else{
    b = 5
}


let one = 1
let str = '1'
let two = 2
console.log(one+two)
one = true
console.log(one+two)
one = '1'
console.log(one+two)
two = true
console.log(one+two)

const student ={
    name: 'Иван',
    surname: 'Иванов'
}
console.log('Имя: ' + student.name + ', Фамилия: ' + student.surname)
console.log(`Имя: ${student.name}, Фамилия: ${student.surname}`)

const t1 = 1
const t2 = '1'
if(t1 === t2){
    console.log('Its equal')
}
else{
    console.log('It isn equal')
}

const arr1 = [1,2,3,4,56,7]
const obj1 = {
    a: 'test',
    p: 'test1'
}
for (const i of arr1) {
    console.log(i)
}
for (const [i, v] of arr1.entries()) {
    console.log(i)
    console.log(v)
}
arr1.forEach(elem => {
    console.log(elem)
})
for (const key in obj1) {
    console.log(key)
    console.log(obj1[key])
}

const arr2 = [1,3,6,3,4,5,9,2,1]
const arr3 = []
for (const i of arr2){
    if (i <= 3) arr3.push(i)
 //   if (i <= 3) arr3 = [...arr3, i]
}
console.log(arr3)

let arr4 = arr2.filter(item => item <= 3)
console.log(arr4)