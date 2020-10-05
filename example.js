let { Vector, VectorConstants } = require("./index.js");
let v = new Vector(-1,-1);
let v2 = new Vector();
v2.fromTwoPoints([-1,-2],[-2,-3]);
console.log(v.add(v2).toString());
console.log(v.add(v2).unit().toString());