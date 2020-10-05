# Vectors.js
#### Vectors.js is a library to make working with vectors in Node JS easy, including all standard vector operations and properties for n-dimension vectors

## Installation
`npm install vectorsjs`

## Example
```
let { Vector, VectorConstants } = require("./index.js");

//Exampe: Creating vectors
let a = new Vector(-1,-1); //Create a new vector with components <-1, -1>
let b = new Vector();
b.fromTwoPoints([0,0],[2,2]); //Set this vector from two points
let c = new Vector();
c.fromMagnitudeAngle2D(10, Math.PI); //Set this vector from a magnitude and a direction (2D only)



//Example: Basic vector operations
let d = a.add(b); //Add b to a
console.log("a+b: ", d.toString());

d = a.subtract(b); //Subtract b from a
console.log("a-b: ", d.toString());

d = b.multiply(5); //Multiply a by a scalar
console.log("5*b: ", d.toString());



//Example: Getting the direction/unit vector and changing the vector's magnitude
d = a.unit(); //Get the unit vector
d = d.multiply(10); //And scale to 5

//OR, set the magnitude of the vector:
//d = a.getCopy(); //Get a copy of the vector
//d.magnitude = 5;
console.log("5*(a/|a|): ", d.toString()); 



//Example: More vector operations
d = a.cross(b);
console.log("a x b: ", d.toString());

let e = a.dot(b);
console.log("a•b: ", e);


e = b.angle(a); //Angle between a and b
console.log("Absolute angle between a and b: ", e);

e = a.angle(VectorConstants.D2.i); //Angle between b and positive x-axis
console.log("Absolute angle between a and positive x-axis (i): ", e);


//Example: Vector properties
console.log("Magnitude of a: ", a.magnitude);
console.log("Number of components in a: ", a.size);
console.log("Is unit vector? a/|a|: ", a.multiply(1/a.magnitude).isUnit());
console.log("Is equal vector? a/|a|==a: ", a.unit().isEqual(a));
```

## Usage
See the documentation in <a href="./Documentation.md">Documentation.md</a> for documentation of each method

## License
Copyright 2020 Alex Mous

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.