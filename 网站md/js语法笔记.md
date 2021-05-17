# JavaScript语法笔记

## 1.数据类型

在javascript中，只有基本类型和对象这两种值。

> * 基本类型：数字、字符串、布尔、null、undefined、symbol
> * 二级对象：Array、Date、RegExp、Map、WeakMap、Set、WeakSet

### 1.1 undefined和null

undefined指从未赋值、null表示空值或者曾经赋过值但是现在没有值。null是空指针的语义，而undefined是从未赋值的语义。

### 1.2 作用域

var和函数名都没有块作用域，存在变量提升的特性（每一个作用域都会提升且函数名优先）。而const和let有块作用域以及函数作用域和全局作用域。如果在const和let声明前访问，会得到TDZ临时死区。

### 1.3 特殊数字

NaN是唯一一个x === x为false的值，使用Number.isNaN来检测，也可以用Object.is()来比较。同时js中存在+Infinity、-Infinity、+0、-0。

### 1.4 值的转换

#### 1.4.1 显式转换

##### ToBoolean

Undefined，null，false，+0，-0，NaN和""这些值都是ToBoolean为false。其他的值都是truthy，ToBoolean后为true。

##### ToNumber

undefined,"hello"转换为NaN;null, '', '\n', ' ',[]转换为0，对象则会像调用valueOf,如果有基本类型返回就用返回值做强制转换，没有就用toString返回的值做强制转换，如果都不返回基本类型，则TypeError.

#### 1.4.2 隐式转换

##### 加法操作符（+）

如果+中的其中一个操作数是字符串或者通过valueOf、toString之后可以得到字符串的对象，那执行字符串拼接操作，否则执行数字加法。

##### 其他数字运算符（- * /）

将两个操作数都转换为数字。

#### 1.5 值的比较

== 运行在比较中进行强制类型转换，而 === 不允许

##### 1.5.1 字符串和数字的比较

返回ToNumber(字符串) == 数字

##### 1.5.2 其他类型与布尔类型的比较

返回ToNumber(布尔类型) == 其他类型，所以最好不要在if，for中使用==true来做判断

##### 1.5.3 null 和 undefined之间的比较

在==比较中，null和undefined可以互换。null == undefined // true

##### 1.5.4 对象和非对象之间的比较

如果非对象是指字符串或数字，则返回字符串或数字 == ToPrimitive(对象)；如果非对象是指布尔类型，参见1.5.2 

##### 1.5.5 总结

在值的两边有true或者false时千万不要使用==；值的两边有[]，‘’，0时，尽量不要使用==。

在 >, <, >=, <=的比较中，双方先调用ToPrimitive，如果出现非字符串，就根据ToNumber规则强制转换后比较；如果都是字符串，则按照字母顺序来比较。

## 2 函数

### 2.1 闭包

函数可以记住和访问所在的词法作用域，当函数在当前此法作用域之外执行时，便产生了闭包。

### 2.2 IIFE

新生成一个函数词法作用域来避免和顶层作用域冲突。

```javascript
const f = (function () {
    let status = false; // 可以避免status在全局变量中申明
    return function (){
        if (status) {
            document.getElementById('text').style.color = 'black';
            document.getElementById('line').style.width = '0px';
        } else {
            document.getElementById('text').style.color = 'blue';
            document.getElementById('line').style.width = '100%';
        }
        status = !status;
    }
}())
```

### 2.3 异步编程和事件循环

```javascript
宏队列: setTimeout, setInterval, setImmediate, script段, i/o操作
微队列: process.nextTick, new Promise.then // 其中nextTick优先级高于new Promise.then
```

每一个异步事件都有一个watcher，当事件准备好之后才会放入对应的队列中。

每一个循环称之为一个tick，每一个tick会先执行同步任务，同步任务执行完之后再是微队列中的任务，当微队列清空后，再执行宏队列的任务。宏队列任务每执行完一个，会检查微队列中的任务，存在则执行完再执行下一个宏队列任务（对应宏队列任务或旧的微队列产生新的微队列任务）。

### 2.4 Generator函数以及自动执行

异步任务：

```javascript
var gen = function* () {
    var f1 = yield readFile('fileA'); // readFile都是包装后的promise对象
    var f2 = yield readFile('fileB');
    // ...
    var fn = yield readFile('fileN');
}
```

co模块做自动执行

```javascript
function run(gen) {
    var g = gen();
    function next(data) {
        var result = g.next(data); // 对于generator而言，第一次next所传递的参数是无效的，f1等于第二次next传递的参数。
        if (result.done) return result.value;
        result.value.then( function(data) {
            next(data);
        })
    }
    next();
}
run(gen);
```

### 2.5 async 和await

async函数就是将星号(*)替换成了async，将yield替换成为await。此外async函数自带执行器，以及返回promise对象。async表明这是一个异步的函数，await后面需要跟一个promise对象，当这个promise对象状态resolve之后才能执行下一步。

### 2.6 this

函数在调用的时，除声明时定义的形参外，还有两个附加的参数——this和argument。不同的调用模式，this的值存在差异。

#### 2.6.1 四种绑定模式(按优先级排序)

- new绑定，使用new来调用函数时会自动执行下面的操作。

  1.创建一个新的对象；2.新对象执行原型链接；3.新对象绑定函数调用的this；4.如果没有返回其他对象则返回这个新对象

- 显示绑定，即使用call, apply, bind函数来绑定this。

  ```javascript
  function foo(c, d){
      console.log(this.a, this.b, c, d);
  }
  var obj = {a: 'a', b: 'b'};
  foo.call(obj, 'c', 'd'); // a b c d
  foo.apply(obj, ['c', 'd']); // a b c d
  foo.bind(obj)('c', 'd'); // a b c d
  ```

- 方法调用模式。即对象有一个属性为函数，对象通过点运算符来调用函数，该对象被绑定到this。

  ```javascript
  function foo() {console.log(this.a);}
  var obj = {a: 2, foo: foo}
  var a = 'outer';
  obj.foo(); // 2 这便是函数调用模式
  var bar = obj.foo;
  bar(); // outer 注意这种绑定丢失的情况，当函数作为实参传递的时候也会发生。不带任何修饰的函数调用会应用最后一种默认绑定。
  ```

- 默认绑定。如果直接使用不带任何修饰的函数调用，只能绑定全局对象。

#### 2.6.2 箭头函数

箭头函数函数体内的this指的是函数在<font size=5>定义</font>时所在的对象所处的上下文。便是在上一层添加var _this = this.

```javascript
var x=11;
// var _this = this;
var obj={
 x:22,
 say:()=>{
   console.log(this.x);
 }
}
obj.say(); // 11 往上能写var _this = this的地方只有第二行，所以这里的this是指全局变量。
```



## 3.对象

### 3.1 原型继承

js中每一个function都存在一个对应的原型对象，如function Person(){}，通过Person.prototype可以访问到，同时这个原型对象拥有一个constructor属性可以访问function，即 Person.prototype.constructor === Person为ture。

#### 3.1.1 继承(委托)链

原型对象和普通对象并没有什么特别不同，仅仅是多了一个constructor属性而已。所有的对象都拥有______proto______属性，通过这个属性完成继承链。

```javascript
var p1 = new Person(); // 当new一个新的对象后，p1便参与到了继承链中
p1.__proto__ === Person.prototype; // true
Person.prototype.__proto__ === Object.prototype; // true

function F(){}
F.prototype = Person.prototype
Student.prototype = new F()
```

### 3.1.2 如何继承(委托)

```javascript
function inherits(Child, Parent) {
    var F = function () {}; // 新构造一个函数来承接
    F.prototype = Parent.prototype; // 通过F new出来的对象的__proto__都为Parent.prototype,new出来的对象依旧按照F来构建而非Parent.prototype.constructor。
    Child.prototype = new F(); // 使用一个普通对象来取代Child原本的原型对象，所以原型对象与普通对象并没有特别多不同。
    Child.prototype.constructor = Child; // 修复new出来的对象的constructor属性
}
inherits(Student, Person);
```

有关常用的Object.create():

```javascript
Object.create = function(o) {
    function F(){};
    F.prototype = o;
    return new F();
}
Student.prototype = Object.create(Person.prototype); // 采用Object.create来进行原型链继承，最好再进行下constructor修复
// Object.create(o)的含义是指得到一个新的对象，他的__proto__是o
```

## 4.一些操作符

### typeof

返回基本类型和Object。其中null也返回Object，另新增返回Function

### instanceof

用来确定一个对象实例的原型链上是否有该原型。

















