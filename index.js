/**
 * @module Vectors
 */

/**
* Vector class
* @memberof module:Vectors
* @class Vector
* @classdesc Vectors.js is a library to make working with vectors in Node JS easy, including all standard vector operations and properties for n-dimension vectors
* @constructor
* @param  {...number} components Components of the vector to construct
*/
class Vector {
    #components; //Components of vector

    constructor(...components) { //Default constructor from components
        this.#components = components;
    }

    /**
     * Set this vector from magnitude and angle from positive x-axis in 2D
     *
     * @function module:Vectors.Vector~fromMagnitudeAngle2D
     * @param {number} magnitude Magnitude
     * @param {number} angle Angle (radians)
     */
    fromMagnitudeAngle2D(magnitude, angle) {
        if (magnitude <= 0) throw new Error("Magnitude must be positive and non-zero!");
        this.#components = [magnitude*Math.cos(angle), magnitude*Math.sin(angle)];
    }

    /**
     * Set this vector from the difference between two points
     *
     * @function module:Vectors.Vector~fromMagnitudeAngle2D
     * @param {Array<number>} point1 Point 1 (array of distance in each dimension)
     * @param {Array<number>} point2 Point 2 (same number of dimensions as Point 1)
     */
    fromTwoPoints(point1, point2) {
        if (point1.length != point2.length) throw new Error("Points must have the same number of dimensions!");
        this.#components = point1.map((v, i) => point2[i]-v);
    }



    //===== New Vector Operations

    /**
     * Unit vector
     *
     * @function module:Vectors.Vector~unit
     * @returns {Vector} The unit vector
     */
    unit() {
        let newComponents = this.#components.map((c) => c/this.magnitude);
        return new Vector(...newComponents);
    }

    /**
     * Scalar multiplication
     *
     * @function module:Vectors.Vector~multiply
     * @param {number} k Scalar k to multiply vector by
     * @returns {Vector} Scaled vector
     */
    multiply(k) {
        let newComponents = this.#components.map((c) => k*c);
        return new Vector(...newComponents);
    }

    /**
     * Add vect to this vector
     * 
     * @function module:Vectors.Vector~add
     * @param {Vector} vect Vector to add to this
     * @returns {Vector} New vector
     */
    add(vect) {
        if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
        let newComponents = this.#components.map((c, i) => c+vect.#components[i]);
        return new Vector(...newComponents);
    }

    /**
     * Subtract vect from this vector
     * 
     * @function module:Vectors.Vector~subtract
     * @param {Vector} vect Vector to subtract from this
     * @returns {Vector} Difference between this and vect
     */
    subtract(vect) {
        if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
        let newComponents = this.#components.map((c, i) => c-vect.#components[i]);
        return new Vector(...newComponents);
    }

    /**
     * Get a copy of this vector
     * 
     * @function module:Vectors.Vector~getCopy
     * @returns {Vector} A copy of this vector
     */
    getCopy() {
        return new Vector(this.#components);
    }


    //===== Number Operations

    /**
     * Dot product
     *
     * @function module:Vectors.Vector~dot
     * @param {Vector} vect Vector to do a dot product with
     * @returns {number} The dot product of the two vectors
     */
    dot(vect) {
        if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
        let newComponents = this.#components.map((c, i) => c*vect.#components[i]);
        let product = newComponents.reduce((a,b) => a+b);
        return product;
    }

    /**
     * Cross product
     *
     * @function module:Vectors.Vector~cross
     * @param {Vector} vect Vector to do a cross product with
     * @returns {Vector} The unit vector
     */
    cross(vect) {
        if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
        return new Vector(); //TODO: add cross product calculation
    }

    /**
     * Angle between this vector and vect
     * 
     * @function module:Vectors.Vector~angle
     * @param {Vector} vect Vector to calculate angle between
     * @returns {number} Angle
     */
    angle(vect) {
        if (vect.size != this.size) throw new Error("Vectors must have the same dimensions!");
        let ref = Math.acos(this.dot(vect)/(this.magnitude * vect.magnitude));

        //TODO: compensate for angles > PI!
        return ref;
    }

    //===== Get Parameters Operations
    /**
     * Get the magnitude of the vector
     * 
     * @memberof module:Vectors.Vector
     * @type {number}
     */
    get magnitude() {
        let sqauresSum = this.#components.reduce((a, b, i) => {
            if (i==1) {
                return a*a + b*b;
            } else {
                return a + b*b
            }
        })
        return Math.sqrt(sqauresSum);
    }

    /**
     * Get the number of components of the vector
     * 
     * @memberof module:Vectors.Vector
     * @type {number}
     */
    get size() {
        return this.#components.length;
    }

    /**
     * Get the string representation of the vector
     * 
     * @function module:Vectors.Vector~toString
     * @returns {string} Vector as a string
     */
    toString() {
        return this.#components;
    }



    //===== Modification Operations
    /**
     * Set the new magnitude
     * 
     * @memberof module:Vectors.Vector
     * @type {number}
     */
    set magnitude(k) {
        this.#components = this.unit().multiply(k).#components;
    }

    //===== Test Operations
    /**
     * Is this a unit vector?
     *
     * @returns {boolean}
     */
    isUnit() {
        return this.magnitude >= 0.9999999 && this.magnitude <= 1.0000001;
    }

    /**
     * Is this the same as vect?
     *
     * @param {Vector} vect
     * @returns {boolean}
     */
    isEqual(vect) {
        return vect.#components.filter((v, i) => {
            return v <= this.#components[i]-0.000001 || v >= this.#components[i]+0.000001
        }).length == 0; //Check within tolerance
    }
}


 /**
  * @constant {VectorConstants} VectorConstants
  * @static
  * Constant/standard vector constants
  */
 const VectorConstants = {
    D2: {
        i: new Vector(1, 0),
        j: new Vector(0, 1)
    },
    D3: {
        i: new Vector(1, 0, 0),
        j: new Vector(0, 1, 0),
        k: new Vector(0, 0, 1)
    }
}

module.exports = { Vector, VectorConstants };