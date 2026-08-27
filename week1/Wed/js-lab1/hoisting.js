// 1.
const cube = function (x) {
  return x * x * x;
};

// 2.
const fullName = function (first, last) {
  return first + " " + last;
};

// 3.
const power = function (base, exp) {
  if (exp === 0) {
    return 1;
  }
  return base * power(base, exp - 1);
};

// 4.
const sumCubes = function (numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + cube(numbers[i]);
  }
  return total;
};

// Step 2: Mechanics of hoisting

// 1. var is hoisted and starts as undefined. Its value is assigned later.

// 2. let cannot be used before it is declared, so it gives a ReferenceError.

// 3. showMessage uses const, so it cannot be called before it is created.

// 4. Function declarations are hoisted, so we can call them before they appear.

// Step 3: Code restructuring

// Exercise 1: Declare values before using it in the loop.
const values = [10, 20, 30];

for (let i = 0; i < values.length; i++) {
  console.log(values[i]);
}

// Exercise 2: Initialize lastLogin and welcome before calling welcome.
const lastLogin = "1/1/1970";

const welcome = function (first, last) {
  return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`;
};

console.log(welcome("Charlie", "Munger"));
