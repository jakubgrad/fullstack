//React useful techniques 
var animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro',       species: 'dog' },
    { name: 'Hamilton',   species: 'dog' },
    { name: 'Harold',     species: 'fish' },
    { name: 'Ursula',     species: 'cat' },
    { name: 'Jimmy',      species: 'fish' }
  ]

  //map is a function on an array. It doesnt work on objects??
var names = animals.map(function(animal) { return animal.name })
names = animals.map((animal) => { return animal.name })
names = animals.map((animal) => animal.name )

var names = animals.map((x) => x.name)

const t = [1, 2, 3]

const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

var orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
  ]
  
  var totalAmount = orders.reduce(function(sum, order) {
    return sum + order.amount
  }, 0)
  
//arrays
const t = [1, -1, 3]

//concat is better than push because immutability
t.push(5)
const t2 = t.concat(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})          


//You want to shallow copy an object? This might sometimes work:

const changedNote = { ...note, important: !note.important }

//Where a single note in an array looks like this in json:

{
  "content": "Some text ive written",
  "date": "2022-12-25T18:34:31.384Z",
  "important": true,
  "id": 4
}

//it also changes the important property's value.