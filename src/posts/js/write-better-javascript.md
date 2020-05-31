---
title: 『译』5 个小技巧，让你在 JavaScript 中写出更好的条件语句
date: 2018-10-21
path: '/write-better-javascript'
tldr: 让我们一起“生产”更多易读的代码。我希望你能从这篇文章中学到新的东西。
tags: ['JavaScript', '译文']
cover: './cover.png'
---

## 为多条件使用 Array.includes

我们一起看看下面的例子：

```javascript
// condition
function test(fruit) {
  if (fruit === 'apple' || fruit === 'strawberry') {
    console.log('red');
  }
}
```

乍一看，上面的例子没有毛病。但是，如果我们拥有更多的红色水果，比如 `cherry` 和 `cranberries` 呢？难道我们要使用更多的 `||` 来扩展这条语句吗？

我们可以使用 `Array.includes`([Array.includes][1]) 来重写上面的条件：

```javascript
function test(fruit) {
  // 把条件提取为一个数组
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}
```

我们把`红色水果`（条件）提取成一个数组。通过这种方式，代码看起来更简洁。

## 减少嵌套，优先返回

让我们把上面的示例扩展一下，包含另外两个条件：

- 如果没有提供水果，抛出错误
- 如果水果的质量大于 10，接受并打印水果的质量

```javascript
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // 条件1：fruit 必须有值
  if (fruit) {
    // 条件2：fruit 必须是红色
    if (redFruits.includes(fruit)) {
      console.log('red');

      // 条件3：质量必须大于 10
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('no fruit');
  }
}

// 测试结果
test(null); // error: no fruit
test('apple'); // 'red'
test('apple', 20); // 'red', 'big quantity'
```

观察上面的代码，我们可以得到：

- 1 if/else 语句会筛选出无效条件
- 3 层嵌套的 if 语句（条件 1、2、3）

我个人常用的一条规则是：**当发现无效条件时尽早返回**。

```javascript
// 当发现无效条件时尽早返回
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // 条件1：优先返回
  if (!fruit) throw new Error('no fruit');

  if (fruit) {
    // 条件2：fruit 必须是红色
    if (redFruits.includes(fruit)) {
      console.log('red');

      // 条件3：质量必须大于 10
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  }
}
```

这样改造之后，我们减少了一层嵌套。这种代码风格比较好，特别是当你有很长的 if 语句时（想象一下你需要滚动到最底部才知道有一个 else 语句，非常不爽）。

我们可以通过反转条件和优先返回来继续合并 if 嵌套。观察下面的条件 2，看看我们是如何做到的：

```javascript
// 当发现无效条件时尽早返回
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // 条件1：优先返回
  if (!fruit) throw new Error('no fruit');
  // 条件2：当水果不是红色时，返回
  if (!redFruits.includes(fruit)) return;

  console.log('red');

  // 条件3：质量必须大于 10
  if (quantity > 10) {
    console.log('big quantity');
  }
}
```

通过反转条件 2，我们的代码现在摆脱了嵌套语句。当我们的逻辑很长，并且当某一个条件不满足时停止进一步地处理时，这个技术非常有用。

然而，这并不是一件很难的事情。问问自己，在这个版本中（没有嵌套）代码是否比之前本的代码更加易读？

对于我来说，我将保留在之前的一个版本。因为：

- 使用 if 嵌套，代码简单明了
- 反转条件可能需要花费更多思考（增加认知负荷）

因此，总是保持：**减少嵌套，优先返回，但不要过度**。如果你感兴趣，这里有一篇文章和 StackOverflow 讨论，它们在这个话题上有深入的讨论。

- [Avoid Else, Return Early][2] by Tim Oxley
- [StackOverflow discussion][3] on if/else coding style

## 使用函数默认参数和解构

我想下面的代码看起来很熟悉吧，在 JavaScript 中，我们总是需要检查 `null`/`undefined` 值，并为其赋予默认值：

```javascript
function test(fruit, quantity) {
  if (!fruit) return;
  const q = quantity || 1; // 如果没有提供 quantity，将其赋值为 1

  console.log(`We have ${q} ${fruit}`);
}

// 测试结果
test('banana'); // We have 1 banana
test('apple', 2); // We have 2 apple
```

事实上，我们可以通过函数默认参数来消除变量 `q`：

```javascript
function test(fruit, quantity = 1) {
  // 如果没有提供 quantity，将其赋值为 1
  if (!fruit) return;

  console.log(`We have ${q} ${fruit}`);
}

// 测试结果
test('banana'); // We have 1 banana
test('apple', 2); // We have 2 apple
```

是不是更简单直观？请注意，每个参数都有它自己的[默认函数参数][4]。例如，我们也可以为 `fruit` 赋予默认值：`function(test = 'unknown', quantity = 1)`。

如果 `fruit` 是一个对象呢？我们能为其指定默认参数么？

```javascript
function test(fruit) {
  if (fruit && fruit.name) {
    console.log(fruit.name);
  } else {
    console.log('unknown');
  }
}

// 测试结果
test(null); // unknown
test({}); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

瞧瞧上面的例子，如果水果名称可用，我们将输出水果名称，否则输出 unknown。我们可以通过使用默认函数参数和解构来避免 `fruit && fruit.name` 检查：

```javascript
function test({ name } = {}) {
  console.log(name || 'unknown');
}

// 测试结果
test(undefined); // unknown
test({}); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

我们只需要水果的 `name` 属性，所以可以通过 `{name}` 来解构参数，然后我们就可以在代码中将 `name` 作为变量，而不是 `fruit.name`。

我们也指定了一个空对象 `{}` 作为默认值。如果不这样做，在执行 `test(undefined)` 时会出现错误——`Cannot destructure property name of 'undefined' or 'null'.`，因为 `undefined` 中没有 `name` 属性。

如果你不介意使用第三方库，这里有几种减少空检查的方法：

- 使用 [Lodash get](https://lodash.com/docs/4.17.10#get) 方法
- 使用 Facebook 的开源库 [idx](https://github.com/facebookincubator/idx)(结合 Babel.js)

下面是使用 Lodash 的例子：

```javascript
function test(fruit) {
  // 获取 name 属性，如果不可用，则指定默认值为 unknown
  console.log(_.get(fruit, 'name', 'unknown'));
}

// 测试结果
//test results
test(undefined); // unknown
test({}); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

你可以在[这儿](http://jsbin.com/bopovajiye/edit?js,console)运行示例代码。此外，如果你是函数式编程（FP）的爱好者，你还可以选择使用 [Lodash fp](https://github.com/lodash/lodash/wiki/FP-Guide)。

## 使用 Map/Object 字面量，而非 switch 语句

让看看下面的例子，我们要基于颜色输出水果：

```javascript
function test(color) {
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

// 测试结果
test(null); // []
test('yellow'); // ['banana', 'pineapple']
```

上面的代码似乎并没有错，但我觉得它很啰嗦。使用更加简洁的对象字面量语法可以实现相同的结果：

```javascript
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum'],
};
function test(color) {
  return fruitColor[color];
}
```

另外，[Map][5] 也可以实现相同的结果：

```javascript
const fruitColor = new Map()
  .set('red', ['apple', 'strawberry'])
  .set('yellow', ['banana', 'pineapple'])
  .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor.get(color) || [];
}
```

[Map][5] 是 ES2015 中的对象类型，它允许你存储键值对。

那么我们应该禁止使用 switch 语句吗？不要局限于此。就我个人而言，我会尽可能使用对象字面量，但我也不会设置规则来阻止，使用哪种取决于你应用的场景。

Todd Motto 有一篇深入比较 switch 语句和对象字面量的文章，你可以[读一读][6]。

### 总结：重构语法

对于上面的例子，实际上我们可以使用 `Array.filter` 来重构代码以达到相同的结果：

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'strawberry', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'pineapple', color: 'yellow' },
  { name: 'grape', color: 'purple' },
  { name: 'plum', color: 'purple' },
];

function test(color) {
  return fruits.filter((fruit) => fruit.color === color);
}
```

有不止一种方法可以实现相同的结果，在这儿我们展示了四个示例。写代码非常有趣！

## 为所有/部分条件使用 Array.every/Array.some

最后一个提示是利用最新的（但也并不是最新） JavaScript 数组函数来合并多行代码。思考下面的代码，我们要检查是否所有的水果都是红色：

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' },
];

function test() {
  let isAllRed = true;

  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = f.color === 'red';
  }

  console.log(isAllRed); // false
}
```

代码比较长！我们可以使用 `Array.every` 来合并代码：

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' },
];

function test() {
  const isAllRed = fruits.every((f) => f.color === 'red');
  console.log(isAllRed); // false
}
```

现在是不是更加简洁了？同样，如果我们想检查水果中的任意一个是否为红色，我们可以使用 `Array.some`：

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' },
];

function test() {
  const isAnyRed = fruits.some((f) => f.color === 'red');
  console.log(isAnyRed); // true
}
```

## 总结

让我们一起“生产”更多易读的代码。我希望你能从这篇文章中学到新的东西。

以上。Happy coding!

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
[2]: http://blog.timoxley.com/post/47041269194/avoid-else-return-early
[3]: https://softwareengineering.stackexchange.com/questions/18454/should-i-return-from-a-function-early-or-use-an-if-statement
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[6]: https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
