const obj = {
    first: 1,
    second: 2,
}

const firstA = obj.first
const secondA = obj.second
console.log(firstA)
console.log(secondA)

const { first: firstL, second } = obj
console.log(firstL)
console.log(second)
