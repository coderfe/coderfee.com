---
title: 『TypeScript』高级数据类型
date: 2019-08-25
path: '/typescript-in-action/advanced-types'
tldr: TypeScript 高级类型，例如交叉类型、联合类型、枚举类型等。
tags: ['TypeScript']
cover: './cover.png'
---

## 交叉类型

交叉类型是把多种类型结合为一种类型，使之拥有所有类型的成员，使用 `&` 进行连接：

```ts
interface User {
  name: string;
  age: number;
}

interface Employee {
  company: string;
}

// 交叉类型
type NewType = User & Employee;

const tom: NewType = { name: 'tom', age: 20, company: 'xxx' };
```

## 联合类型

联合类型表示一个值可以是一种或多种类型，使用 `|` 进行表示：

```ts
let x: string | number = '2';
x = 3; // OK
```

如果某个值是联合类型，那么我们只能访问该联合类型的共用成员：

```ts
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Bird | Fish {
  //...
}

let pet = getSmallPet();
pet.layEggs(); // OK
pet.swim(); // Error
```

## 字面量类型

既可以限制变量的类型，也可以限制变量的取值范围。

1. 字符串

```ts
const b = 'a' | 'b' | 'c';
```

2. 数值

```ts
const c = 1 | 2 | 3;
```

## 索引类型

场景之一是从一个对象中取出某些属性：

```js
function pluck(o, props) {
  return props.map((p) => o[p]);
}
```

用 TS 实现：

```ts
function pluck<T, K extends keyof T>(o: T, props: K[]): T[K][] {
  return props.map((p) => o[p]);
}

interface Car {
  manufacturer: string;
  model: string;
  year: number;
}

let taxi: Car = {
  manufacturer: 'Toyota',
  model: 'Camry',
  year: 2018,
};

let modelYear = pluck(taxi, ['model', 'year']); // ['Toyota', 2018]
```

`keyof T` 是类型 `T` 中已知属性的并集，如 `keyof Car` 即表示 `'manufacturer' | 'model' | 'year'`。

`T[K]` 表示 `T` 类型中 `K` 属性的类型。

## 映射类型

TypeScript 中内置几种映射类型，通常和泛型结合使用。

- `Readonly`
- `Partial`
- `Pick`
- `Record`

## 条件类型

```ts
T extends U ? X : Y
```

这个表达式表示如果 `T` 能够分配给 `U`，则类型是 `X`，否则类型是 `Y`。

## 类型保护

TypeScript 能在特定的区块中确保变量属于某种确定的类型，以便在该区块中使用该变量。在 TypeScript 中有几种方法可以创建类型保护：

```ts
class Java {
  helloJava() {}
  java: any;
}

class JavaScript {
  helloJavaScript() {}
  javascript: any;
}

function lang(lang: Java | JavaScript, x: string | number) {
  // 1. instanceof 关键词
  if (lang instanceof Java) {
    lang.helloJava();
  } else {
    lang.helloJavaScript();
  }

  // 2. in 关键词
  if ('java' in lang) {
    console.log(lang.java);
  } else {
    console.log(lang.javascript);
  }

  // 3. typeof 关键词
  if (typeof x === 'string') {
    console.log(x.length);
  } else {
    x.toFixed(2);
  }
}
```

## 类型别名

`type` 关键词可以为类型创建别名，它可以为原始类型、联合类型、元组或者其他指定的类型创建别名：

```ts
type Name = string;
const a: Name = 'TypeScript';
type Pet = Fish | Bird;
```
