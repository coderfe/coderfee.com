---
title: 『译』每个 JavaSript 开发者都需要知道的 ES2018 新功能
date: 2019-01-31
path: '/es2018-new-features'
tldr: 这篇文章详细介绍了 ES2018 标准中添加的几个新功能，例如 rest/spread 属性、异步迭代和 Promise.prototype.finally 等。
tags: ['JavaScript', '译文']
cover: './cover.png'
---

发布于 2018 年 6 月的第九版 ECMAScript 标准，官方称之为 ECMAScript 2018（简称 ES2018）。从 ES2016 开始，每年都会发布一个 ECMAScript 规范的新版本，而不是每几年发布一次，而且相比以前的主要版本添加少量新功能。最新版标准通过为 `RegExp` 添加 4 个新功能、rest/spread 属性、异步迭代和 `Promise.prototype.finally` 来延续它的年度发布周期。此外，ES2018 从标签模板中删除了转义序列的语法限制。

接下来的小节会详细介绍这些新变化。

## Rest/Spread 属性

ES2015 中添加的最让人关注的一项功能是**展开**操作符。展开操作符简化了复制/合并数组的操作。你现在可以使用 `...` 操作符，而不调用 `contact()/slice()` 方法：

```javascript
const arr1 = [10, 20, 30];

// 复制 arr1
const copy = [...arr1];
console.log(copy); // [10, 20, 30]

const arr2 = [40, 50];

// 合并 arr1 和 arr2
const merge = [...arr1, ...arr2];
console.log(merge); // [10, 20, 30, 40, 50]
```

在数组作为单独的参数传递给函数的情况下，扩展操作符也能灵活运用。例如：

```javascript
const arr = [10, 20, 30];

console.log(Math.max(...arr)); // 30
// 等价于
console.log(Math.max(10, 20, 30)); // 30
```

ES2018 通过为对象字面量添加 spread 属性更广泛地拓展了这项语法。使用 spread 属性，你可以把一个对象自身的可枚举属性复制给一个新对象。思考下面的例子：

```javascript
const obj1 = {
  a: 10,
  b: 20,
};

const obj2 = {
  ...obj1,
  c: 30,
};

console.log(obj2); // {a: 10, b: 20, c: 30}
```

在示例代码中，`...` 用来检索 `obj1` 的属性并将其分配给 `obj2`。ES2018 之前，尝试这样做会抛出一个错误。如果存在多个同名属性，则使用最后一个属性：

```javascript
const obj1 = {
  a: 10,
  b: 20,
};

const obj2 = {
  ...obj1,
  a: 30,
};

console.log(obj2); // {a: 30, b: 20}
```

Spread 属性也提供了一种合并两个或多个对象的新方法，可以用作 `Object.assign()` 的替代方法：

```javascript
const obj1 = { a: 10 };
const obj2 = { b: 20 };
const obj3 = { c: 30 };

// ES2018
console.log({ ...obj1, ...obj2, ...obj3 }); // {a: 10, b: 20, c: 30}

// ES2015
console.log(Object.assign(obj1, obj2, obj3)); // {a: 10, b: 20, c: 30}
```

注意，使用 spread 属性得到的结果**并不总会**与使用 `Object.assign()` 的到结果相同。思考下面的代码：

```javascript
Object.defineProperty(Object.prototype, 'a', {
  set(value) {
    console.log('set called');
  },
});

const obj = { a: 10 };

console.log({ ...obj }); // {a: 10}

console.log(Object.assign({}, a));
// set called
// {}
```

在示例代码中，`Object.assign()` 方法执行了继承的 setter 属性。相反，spread 属性则直接忽略了 setter。

记住<b> spread 属性只复制可枚举属性</b>，这一点非常重要。在下面的例子中，`type` 属性不会显示在被复制的对象中，因为它的 `enmurable` 属性被设置为 `false`：

```javascript
const car = {
  color: 'blue',
};

Object.defineProperty(car, 'type', {
  value: 'coupe',
  enumrable: false,
});

console.log(car); // {color: 'blue'}
```

继承的属性会被忽略，尽管它们是可枚举的：

```javascript
const car = {
  color: 'blue',
};

const car2 = Object.create(car, {
  type: {
    value: 'coupe',
    emumrable: true,
  },
});

console.log(car2.color); // blue
console.log(car2.hasOwnProperty('color')); // false

console.log(car2.type); // coupe
console.log(car2.hasOwnProperty('type')); // true

console.log({ ...obj2 }); // {type: 'coupe'}
```

上面的示例代码中，`car2` 继承了 `car` 的 `color` 属性。由于 spread 属性只复制对象的自身属性，因此返回值里不包含 `color`。

记住：spread 属性只能实现对象的浅复制。如果某个属性是一个对象，那么只会复制这个对象的引用。

```javascript
const obj = { x: { y: 1 } };
const copy1 = { ...obj };
const copy2 = { ...obj };

console.log(copy1.x === copy2.x); // true
```

`copy1` 的 `x` 属性和 `copy2` 的 `x` 属性都指向内存中的同一个对象，所以严格相等会返回 `true`。

ES2015 引入的另一个有用的功能是<b>剩余参数</b>，它使 JavaScript 程序员能够用 `...` 将值代表为数组。举个例子：

```javascript
const arr = [10, 20, 30];
const [x, ...rest] = arr;

console.log(x); // 10
console.log(rest); // [20, 30]
```

这里 `arr` 的第一项被分配给 `x`，剩下的元素都分配给了 `rest` 变量。这种模式称为<b>数组解构</b>，由于广受开发者喜爱，Ecma 技术委员会决定为对象带来相似的功能：

```javascript
const obj = {
  a: 10,
  b: 20,
  c: 30,
};

const { a, ...rest } = obj;

console.log(a); // 10
console.log(rest); // {b: 20, c: 30}
```

这段代码在解构任务中使用了 rest 属性来将剩余的自身可枚举属性复制到一个新对象上。注意，rest 属性必须出现在对象的最后面，否则会抛出错误：

```javascript
const obj = {
  a: 10,
  b: 20,
  c: 30,
};

const {...rest, a} = obj;
// Uncaught SyntaxError: Rest element must be last element
```

同时需要注意，在一个对象上使用多个 rest 语法可能会出现错误，除非它们是嵌套的：

```javascript
const obj = {
  a: 10,
  b: {
    x: 20,
    y: 30,
    z: 40,
  },
};

const {
  b: { x, ...rest },
  ...rest
} = obj;
const {...rest, ...rest2} = obj;
// Uncaught SyntaxError: Rest element must be last element
```

### Rest/Spread 支持情况

| Chrome | Firefox | Safari | Edge |
| ------ | ------- | ------ | ---- |
| 60     | 55      | 11.1   | No   |

| Chrome Android | Firefox Android | iOS Safari | Edge Mobile | Samsung Internet | Android Webview |
| -------------- | --------------- | ---------- | ----------- | ---------------- | --------------- |
| 60             | 55              | 11.3       | No          | 8.2              | 60              |

#### Node.js

- 8.0.0（需要 `--harmony` 运行标识）
- 8.3.0（完全支持）

## 异步迭代

迭代数据集合是编程过程中重要的一部分。在 ES2015 之前，JavaScript 提供了语句如 `for`、`for...in` 和 `while`，以及如 `map()`、`filter()` 和 `forEach()` 等方法来达到这一目的。为了使程序员一次处理一个集合中的元素，ES2015 引入了迭代器接口。

如果一个对象拥有 `Symbol.iterator` 属性，那么它就是可迭代的。在 ES2015 中，字符串和集合对象（如 `Set`/`Map`/`Array` 等）都有 `Symbol.iterator` 属性，因此它们都是可迭代的。下面的代码示例，说明了如何一次访问一个可迭代的元素：

```javascript
const arr = [10, 20, 30];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

`Symbol.iterator` 是一个众所周知的符号，它用来指定一个函数返回一个迭代器。与迭代器交互的主要方式是 `next()` 方法。这个方法返回一个拥有两个属性的对象：`value` 和 `done`。`value` 属性包含了该集合中下一个元素的值。`done` 属性的值为 `true` 或 `false`，它表示是否到达集合末端。

默认情况下，一个纯对象是不可迭代的，但是如果你为它定义一个 `Symbol.iterator` 属性，它就会变成可迭代的，如这个例子：

```javascript
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.iterator]() {
    const values = Object.keys(this);
    let i = 0;
    return {
      value: this[values[i++]],
      done: i > values.length,
    };
  },
};

const iterator = collection[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

这个对象是可迭代的，因为定义了 `Symbol.iterator` 属性。该迭代器使用 `Object.keys()` 方法得到一个对象属性名称的数组，并将其分配给 `values` 常量。同时定义一个计数器变量，并将初始值设置为 0。当迭代器执行后会返回一个包含 `next()` 方法的对象。每次调用 `next()` 方法，它会返回 `{value, done}` 对象，`value` 保存集合的下一个元素，`done` 保存一个布尔值，表示迭代器是否到达集合的末端。

虽然上面的代码可以完美工作，但是它没有必要这么复杂。幸运的是，使用 generator 函数可以大幅简化这个过程：

```javascript
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.iterator]: function* () {
    for (let key in this) {
      yield this[key];
    }
  },
};

const iterator = collection[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

在 generator 内部，`for...in` 循环用来枚举该集合，并且 [yield][yield] 每个属性的值。运行结果和之前的示例代码完全一样，但它更加简洁。

迭代器的缺点在于它不适合标识异步数据源。ES2018 的解决方案是异步迭代器和异步迭代。一个异步迭代器和传统迭代器的不同之处在于，它会返回一个 promise 实现的 `{value, done}`，而不是 `{value, done}` 这种形式的纯对象。一个异步迭代定义了一个返回异步迭代器的 `Symbol.asyncIterator`（不是 `Symbol.iterator`）。

一个例子可让这个概念更清晰：

```javascript
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.asyncIterator]() {
    const values = Object.keys(this);
    let i = 0;
    return {
      next: () => {
        return Promise.resolve({
          value: this[values[i++]],
          done: i > value.length,
        });
      },
    };
  },
};

const iterator = collection[Symbol.iterator]();

console.log(
  iterator.next().then((result) => {
    console.log(result); // {value: 10, done: false}
  })
);
console.log(
  iterator.next().then((result) => {
    console.log(result); // {value: 20, done: false}
  })
);
console.log(
  iterator.next().then((result) => {
    console.log(result); // {value: 30, done: false}
  })
);
console.log(
  iterator.next().then((result) => {
    console.log(result); // {value: undefined, done: true}
  })
);
```

请注意，使用 promises 的迭代器不可能得到相同的结果。尽管一个普通的同步迭代器可以异步地确定值，但它仍然需要同步地确定 `done` 的状态。

同样，你可以使用 generator 函数来简化这一过程，如下所示：

```javascript
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.asyncIterator]: async function*() {
    for (ley key in this) {
      yield this[key];
    }
  },
};

const iterator = collection[Symbol.iterator]();

console.log(iterator.next().then(result => {
  console.log(result); // {value: 10, done: false}
}));
console.log(iterator.next().then(result => {
  console.log(result); // {value: 20, done: false}
}));
console.log(iterator.next().then(result => {
  console.log(result); // {value: 30, done: false}
}));
console.log(iterator.next().then(result => {
  console.log(result); // {value: undefined, done: true}
}));
```

通常，一个 generator 函数会返回一个带有 `next()` 方法的 generator 对象。当调用 `next()` 方法时，它会返回 `{value, done}`，其中 `value` 保存 [yield][yield] 的值。异步的 generator 做了同样的事情，不过它返回的是 promise 实现的 `{value, done}`。

迭代一个可迭代对象的最简单的方法是使用 `for...of` 语句，但是 `for...of` 不支持异步迭代，因为 `value` 和 `done` 不是同步确定的。为此，ES2018 提供了 `for...await...of` 语句，让我们看一个例子：

```javascript
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.asyncIterator]: async function* () {
    for (let key in this) {
      yield this[key];
    }
  },
};

(async function () {
  for await (const x of collection) {
    console.log(x);
  }
})();
// 10
// 20
// 30
```

在这段代码中，`for...await...of` 语句隐式地调用了 collection 对象上的 `Symbol.asyncIterator` 方法来获得一个异步迭代器。每次通过循环时都会调用迭代器的 `next()` 方法，并返回一个 promise。一旦 promise 被解析，结果对象的 `value` 属性会被读到 `x` 属性中。然后继续循环，直到结果对象的 `done` 属性为 `true`。

请记住，`fot...await...of` 语句只适用于异步 generators 和异步函数。违反这条规则会导致语法错误。

`next()` 方法也有可能返回失败（rejects）状态的 promise。为了优雅地处理失败（rejects）状态的 promise，你可以把 `for...await...of` 包裹在 `try...catch` 语句中，如下：

```javascript
const collection = {
  [Symbol.asyncIterator]() {
    return {
      next: () => {
        return Promise.reject(new Error('Something went wrong.'));
      },
    };
  },
};

(async function () {
  try {
    for await (const value of collection) {
    }
  } catch (error) {
    console.log('Caught: ' + error.message);
  }
})();
```

### 异步迭代器的支持情况

| Chrome | Firefox | Safari | Edge |
| ------ | ------- | ------ | ---- |
| 63     | 57      | 12     | No   |

| Chrome Android | Firefox Android | iOS Safari | Edge Mobile | Samsung Internet | Android Webview |
| -------------- | --------------- | ---------- | ----------- | ---------------- | --------------- |
| 63             | 57              | 12         | No          | 8.2              | 63              |

#### Node.js

- 8.10.0（需要 `--harmony_async_iteration` 运行标识）
- 10.0.0（完全支持）

## Promise.prototype.finally

另一个激动人心的功能是 ES2018 的 `finally()` 方法。有几个 JavaScript 库之前实现过类似的方法，在很多情况下被证明非常有用。这也致使 Ecma 技术委员会正式将 `finally()` 添加到规范中。使用这个方法，程序员可以执行一段代码而不用考虑 promise 的状态如何。让我们看一个简单的例子：

```javascript
fetch('https://www.gooole.com')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    document.querySelector('#spinner').style.display = 'none';
  });
```

`finally()` 方法非常有用，当你需要在某些操作完成之后做一些清理工作，而不用考虑其是否成功。在这段代码中，`finally()` 方法在拉取和处理完数据之后隐藏加载进度。在 `then()` 和 `catch()` 方法中重复最后的一段逻辑，这段代码注册了一个 promise 在完成和失败状态下都会执行的函数。

你也可以不使用 `promise.finally()`，而是使用 `promise.then(func, func)` 来达到相同的结果，但是你需要在完成（fulfillment）和失败（rejection）处理器中重复相同的代码，或者将其声明为一个变量：

```javascript
fetch('https://www.gooole.com')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .then(final, final);

function final() {
  document.querySelector('#spinner').style.display = 'none';
}
```

和 `then()` 及 `catch()` 方法一样，`finally()` 方法总是会返回一个 promise，所以你可以链接更多的方法。通常情况下，你会想在最后使用 `finally()` 方法，但是在某些情况下，例如在发起 HTTP 请求时，最好再链接一个 `catch()` 方法，以便处理 `finally()` 方法中可能出现的问题。

### Promise.prototype.finally 的支持情况

| Chrome | Firefox | Safari | Edge |
| ------ | ------- | ------ | ---- |
| 63     | 58      | 11.1   | 18   |

| Chrome Android | Firefox Android | iOS Safari | Edge Mobile | Samsung Internet | Android Webview |
| -------------- | --------------- | ---------- | ----------- | ---------------- | --------------- |
| 63             | 58              | 11.1       | No          | 8.2              | 63              |

#### Node.js

10.0.0（完全支持）

## 正则表达式新功能

ES2018 为 `RegExp` 对象添加了 4 个新功能，进一步提升 JavaScript 处理字符串的能力。4 个功能如下：

- s 标识符
- 命名捕获组
- 后行断言
- Unicode 属性转义

### s 标识符

`.` 在正则表达式中是一个特殊的字符，它表示匹配除换行符（例如换行 `\n` 或 回车 `\r`）之外的任何字符。匹配包含换行符在内的所有字符的一种解决方案是使用两个相反的简写，例如 `[\d\D]`。这个字符类告诉正则表达式引擎查找一个数字（`\d`）或非数字（`\D`）的字符。其实就是匹配任何字符：

```javascript
console.log(/one[\d\D]two/.test('one\ntwo')); // true
```

ES2018 引入了一种新模式，在这种模式下 `.` 可以达到相同的结果。可以在每个正则表达式基础上使用 `s` 修饰符来激活此模式：

```javascript
console.log(/one.two/.test('one\ntwo')); // false
console.log(/one.two/s.test('one\ntwo')); // true
```

使用修饰符来选择新行为的好处是向后兼容。因此现有的正则表达式使用 `.` 字符不受影响。

### 命名捕获组

在一些正则表达式中，使用数字来表示捕获组会让人感到困惑。例如表达式 `/(\d{4})-(\d{2}-(\d{2})/` 用来匹配一个日期。由于美式英语和英式英语的日期表示法不同，所以很难知道哪组表示日期，哪组又表示月份：

```javascript
const re = /(\d{4})-(\d{2})-(\d{2})/;
const match = re.exec('2019-01-10');

console.log(match[0]); // 2019-01-10
console.log(match[1]); // 2019
console.log(match[2]); // 01
console.log(match[3]); // 10
```

ES2018 引入了命名捕获组，它使用 `(?<name>)` 的语法。因此，匹配日期的表达式可以写成如下格式，以避免歧义：

```javascript
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = re.exec('2019-01-10');

console.log(match.groups); // {year: "2019", month: "01", day: "10"}
console.log(match.groups.year); // 2019
console.log(match.groups.month); // 01
console.log(match.groups.day); // 10
```

在正则表达式中你还可以通过 `\k<name>` 语法来重复使用一个命名捕获组。举个例子，为了在一个句子中找到连续的重复单词，你可以使用 `/\b(?<dup>\w+)\s+\k<dup>\b/`：

```javascript
const re = /\b(?<dup>\w+)\s+\k<dup>\b/;
const match = re.exec('Get that that cat off the table');

console.log(mactch.index); // 4
console.log(mactch[0]); // that
```

要将命名捕获组插入到 `replace()` 方法中替换字符串，你需要使用 `$<name>`，例如：

```javascript
const str = 'red & blue';

console.log(str.replace(/(red) & (blue)/, '$2 & $1'));
// blue & red

console.log(str.replace(/(?<red>red) & (?<blue>blue)/, '$<blue> & $<red>'));
// blue & red
```

### 后行断言

ES2018 为 JavaScript 带来了后行断言，这一功能在其它正则表达式实现中已提供了多年。之前，JavaScript 仅支持先行断言。一个后行断言用 `(?<=...)` 来表示，它能使你根据模式之前的子字符串匹配一个模式。举个例子，如果你想在不捕获货币符号的情况下匹配以美元、英镑或欧元表示的产品价格，你可以使用 `/(?<=\$|￡|€)\d+(\.\d*)?/`：

```javascript
const re = /(?<=\$|￡|€)\d+(\.\d*)?/;

console.log(re.exec(199)); // null

console.log(re.exec('$199'));
// ["199", undefined, index: 1, input: "$199", groups: undefined]

console.log(re.exec('€50'));
// ["50", undefined, index: 1, input: "€50", groups: undefined]
```

There is also a negative version of lookbehind, which is denoted by (?<!...). A negative lookbehind allows you to match a pattern only if it is not preceded by the pattern within the lookbehind. For example, the pattern /(?<!un)available/ matches the word available if it does not have a "un" prefix:

```javascript
const re = /(?<!un)available/;

console.log(re.exec('We regret this service is currently unavailable'));
// null

console.log(re.exec('The service is available'));
// → ["available", index: 15, input: "The service is available", groups: undefined]
```

### Unicode 属性转义

ES2018 提供了一种新型的转码序列，称之为 Unicode 属性转义，它为正则表达式中的 Unicode 提供了全支持。假设你想匹配一个字符串中的 ㉛ 字符。尽管 ㉛ 被认为是一个数字，但你无法使用 `\d` 简写字符类，因为它只支持 ASCII [0-9] 的字符。另一方面，Unicode 属性转义可以用来匹配 Unicode 中的任何十进制数字：

```javascript
const str = '㉛';

console.log(/\d/u.test(str)); // false
console.log(/\p{Number}/u.test(str)); // true
```

同样，如果你想匹配任何 Unicode 字母字符，你可以使用 `/p{Alphabetic}`：

```javascript
const str = 'ض';

console.log(/\p{Alphabetic}/u.test(str)); // → true

console.log(/\w/u.test(str)); // → false
```

还有一种否定版本的 `/p{...}`，表示为 `/P{...}`：

```javascript
console.log(/\P{Number}/u.test('㉛')); // → false
console.log(/\P{Number}/u.test('ض')); // → true

console.log(/\P{Alphabetic}/u.test('㉛')); // → true
console.log(/\P{Alphabetic}/u.test('ض')); // → false
```

除了字母和数字，还有几种属性可以用于 Unicode 属性转义中。你可以在[当前规提案][current-specification-proposal]中找到受支持的 Unicode 属性列表。

### 正则表达式新功能支持情况

|                  | Chrome | Firefox | Safari | Edge |
| ---------------- | ------ | ------- | ------ | ---- |
| s 修饰符         | 62     | No      | 11.1   | No   |
| 命名捕获组       | 64     | No      | 11.1   | No   |
| 后行断言         | 62     | No      | No     | No   |
| Unicode 属性转义 | 64     | No      | 11.1   | No   |

|                  | Chrome Android | Firefox Android | iOS Safari | Edge Mobile | Samsung Internet | Android Webview |
| ---------------- | -------------- | --------------- | ---------- | ----------- | ---------------- | --------------- |
| s 修饰符         | 62             | No              | 11.3       | No          | 8.2              | 62              |
| 命名捕获组       | 64             | No              | 11.3       | No          | No               | 64              |
| 后行断言         | 62             | No              | No         | No          | 8.2              | 62              |
| Unicode 属性转义 | 64             | No              | 11.3       | No          | No               | 64              |

#### Node.js

- 8.3.0（需要 `--harmony` 运行标识）
- 8.10.0（支持 s 修饰符和后行断言）
- 10.0.0（完全支持）

## 模板字面量修正

当一个模板字面量紧跟在一个表达式后面时，我们称之它为标记模板字面量。当你想用函数解析模板字面量时，标记模板非常有用。思考下面的示例：

```javascript
function fn(string, substitute) {
  if (substitute === 'ES6') {
    substitute = 'ES2015';
  }
  return substitute + string[1];
}

const version = 'ES6';
const result = fn`${version} was a major update`;

console.log(result);
// ES2015 was a major update
```

在上面的示例代码中，一个标签表达式（即普通函数被调用），并向其传递模板字面量作为参数。该函数只修改字符串的动态部分并返回它。

ES2018 之前，带标记的模板字符串和转义序列具有相关的的句法限制。反斜杠后紧跟的某些字符被视为特殊字符：`\x` 表示十六进制转义，`\u` 表示 Unicode 转义，`\` 跟一个数字表示八进制转义。因此，如字符串 `C:\xxx\uuu` 或者 `\ubuntu` 会被视为无效转义序列，而且会引发 `SyntaxError` 错误。

ES2018 从标记模板中移除了这些限制，而不再抛出错误，将无效转义表示为 `undefined`：

```javascript
function fn(string, substitute) {
  console.log(substitute); // escape sequences
  console.log(string[1]); // undefined
}

const str = 'escape sequences';
const result = fn`${str} \ubuntu C:\xxx\uuu`;
```

记住：在常规模板字面量中使用非法转义序列仍然会导致错误。

```javascript
const result = `\ubuntu`;
// SyntaxError: Invalid Unicode escape sequence
```

#### 模板字面量修正的支持情况

| Chrome | Firefox | Safari | Edge |
| ------ | ------- | ------ | ---- |
| 62     | 56      | 11     | No   |

| Chrome Android | Firefox Android | iOS Safari | Edge Mobile | Samsung Internet | Android Webview |
| -------------- | --------------- | ---------- | ----------- | ---------------- | --------------- |
| 62             | 56              | 11         | No          | 8.2              | 62              |

#### Node.js

- 8.3.0（需要 `--harmony` 运行标识）
- 10.0.0（完全支持）

## 总结

我们已经仔细研究了 ES2018 引入的几个关键特性，包括异步迭代、rest/spread 属性、`Promise.prototype.finally()` 以及 `RegExp` 对象。尽管一些浏览器供应商还没有完全支持这些特性，但是现在它们完全可用，这要归功于像 Babel 这样的 JavaScript 转换器。

ECMAScript 正在迅速发展，也会经常引入新功能。你可以查看[完成草案列表][finished-proposals]，了解全部的最新内容。有没有让你感到兴奋的新功能呢？分享在评论中吧！

> 原文链接：[New ES2018 Features Every JavaScript Developer Should Know][original-link]

[yield]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield
[current-specification-proposal]: https://tc39.github.io/proposal-regexp-unicode-property-escapes/#sec-static-semantics-unicodematchproperty-p
[original-link]: https://css-tricks.com/new-es2018-features-every-javascript-developer-should-know/
[finished-proposals]: https://github.com/tc39/proposals/blob/master/finished-proposals.md
