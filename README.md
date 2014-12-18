### Class library
A simple class library

Sample usage:
```javascript
var Class = require('class');

var Animal = Class.extend(function Animal(){
    console.log('Animal:constructor');
    this._construct();

    var type = 'walk';

    this.getWalkType = function(){
        return type;
    };

    return this;
});

Animal.prototype.walk = function(){
    console.log('Walking with', this.getWalkType());
};

Animal.create = function(){
  return new this();
};

var Rabbit = Animal.extend(function Rabbit(scared){
    console.log('Rabbit:constructor');
    this._construct();

    this.getWalkType = function(){
        return scared ? 'large jumps' : 'small jumps';
    }

    return this;
});

var a = Animal.create();
var r1 = Rabbit.create(); // Just to show static methods
var r2 = new Rabbit(true);

a.walk();
// Walking with walk
r1.walk();
// Walking with small jumps
r2.walk();
// Walking with large jumps

console.log(r1 instanceof Animal);
// true
console.log(r1 instanceof Rabbit);
// true

```
TODO:
 - Write tests
 - Static properties must be cloned instead of simple assign

> Written with [StackEdit](https://stackedit.io/).
> Developed with [Cloud9 IDE](https://c9.io/).