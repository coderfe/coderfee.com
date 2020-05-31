---
title: 『译』你应该要知道的 Array.map() 的 4 种用法
date: 2018-11-10
path: '/4-uses-of-array-map'
tldr: map() 通过在数组元素中每一项上调用一个函数来创建新的数组。map() 是一个非变异方法，它会创建一个新数组，而不是在被调用数组上做出更改。
tags: ['JavaScript', '译文']
cover: './cover.png'
---

## 在数组的每一项上调用一个函数

如前所述，`.map()` 接收一个回调函数作为它其中的一个参数，该回调函数的一个重要的参数是函数正在处理的当前值。这是一个必要的参数。使用这个参数，我们可以修改数组中的每一项并从中创建一个新函数。下面是一个例子：

```javascript
const sweetArray = [2, 3, 4, 5, 35];
const sweeterArray = sweetArray.map((sweetItem) => {
  return sweetItem * 2;
});
console.log(sweeterArray); // [4, 6, 8, 10, 70]
```

这个例子甚至可以简化为：

```javascript
const makeSweeter = (sweetItem) => sweetItem * 2;
const sweetArray = [2, 3, 4, 5, 35];
const sweeterArray = sweetArray.map(makeSweeter);
console.log(sweeterArray); // [4, 6, 8, 10, 70]
```

编写像 `sweetArray.map(makeSweeter)` 这样代码，增加代码的可读性。

## 把字符串转化为数组

我们知道，`.map()` 属于 `Array.prototype`。那我们如何使用它将一个字符串转化为一个数组呢？不用担心，我们将会使用特殊的 `.call()` 方法，而不会为字符串再开发一个方法。

JavaScript 中所有东西都是对象，方法只是附加在这些对象上的函数。`.call()` 允许我们在一个对象上利用另一个对象的上下文。因此，我们将会把数组中 `.map()` 的上下文复制到字符串中。

`.call()` 可以传递参数，将要被使用的上下文，“原始函数的参数的参数”。听起来像是胡言乱语？下面是一个例子：

```javascript
const name = 'Chuloo';
const map = Array.prototype.map;

const newName = map.call(name, (eachLetter) => {
  return `${eachName}a`;
});
console.log(newName); // ['Ca', 'ha', 'ua', 'la', 'oa', 'oa']
```

我们在字符串上简单地使用了 `.map()` 的上下文，并且传递了一个 `.map()` 所期望函数参数。

这个函数类似于 `.split()` 方法，只能在返回数组之前修改每个单独的字符。

## 在 JavaScript 库中渲染列表

JavaScript 类库，例如 [React][react] 利用 `.map()` 在列表中渲染条目。不过，这需要 JSX 语法，`.map()` 方法是被包裹在 JSX 语法中的。下面是一个 React 组件的例子：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const names = ['john', 'sean', 'mike', 'jean', 'chris'];

const NameList = () => (
  <div>
    <ul>
      {names.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  </div>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<NameList />, rootElement);
```

你对 React 不熟悉？这是一个简单的无状态 React 组件，只渲染了一个 div 和列表。通过使用 `.map()` 来迭代最初创建的名称数组，渲染出每个单独的条目。这个组件使用 ReactDOM 呈现在 id 为 root 的 DOM 元素上。

## 重新格式化数组对象

如何在数组中处理对象？`.map()` 可以用来迭代数组中的对象，*修改每个单独对象的内容*并返回一个新数组。这些修改基于回调函数中返回的内容完成。下面是一个例子：

```javascript
const myUsers = [
  { name: 'chuloo', likes: 'grilled chicken' },
  { name: 'chris', likes: 'cold beer' },
  { name: 'sam', likes: 'fish biscuits' },
];

const usersByFood = myUsers.map((item) => {
  const container = {};

  container[item.name] = item.likse;
  container.age = item.name.length * 10;

  return container;
});
console.log(usersByFood);
// [{chuloo: "grilled chicken", age: 60}, {chris: "cold beer", age: 50}, {sam: "fish biscuits", age: 30}]
```

## 总结

在这篇文章中，我们讨论了 JavaScript 中 `.map()` 的 4 种主要用法。要注意的是与其它方法的结合可以使 `.map()` 的功能被更强大的扩展和利用。试着寻找更多的用法！

[react]: https://reactjs.org/
