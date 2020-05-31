---
title: 『TypeScript』基本数据类型
date: 2019-08-11
path: '/typescript-in-action/basic-types'
tldr: JavaScript 是一门动态类型语言，它对变量的类型非常宽容，虽然足够灵活，但是也埋下了一些『坏代码』的味道。 而 TypeScript 中添加的类型系统，让 JS 拥有了静态类型检查系统，强大且灵活。
tags: ['TypeScript']
cover: './cover.png'
---

## Boolean

布尔值是最基本也是最简单的数据类型，它只有两种值：`true`/`false`。

```ts
let isDone: boolean = false;
```

## Number

JS 中的所有数值都是浮点值，TS 也一样，在 TS 中数值的类型为 `number`，TS 同时也支持二进制等其它进制形式表示的数值：

```ts
let decimal: number = 6;
let binary: number = 0b1010;
let hex: number = 0xf00d;
```

## String

字符串类型跟 JS 并无二致：

```ts
let str: string = 'Hello TypeScript!';
```

## Array

TS 中定义数组有两种形式：

```ts
// 1. 在类型关键词后跟 **[]**
let list: number[] = [1, 2, 3];

// 2. 泛型
let list: Array<number> = [1, 2, 3];
```

## Tuple

JS 没有元组这种数据类型，在我了解的语言中，Python 有这种数据类型。它有两个特点，确定的元素个数，明确的数据类型：

```ts
let x: [string, number] = ['1', 2];

x = [1, '2']; // TypeError

console.log(x[3]); // Error
```

## Enum

枚举是从 C# 和 Java 中借鉴的数据类型，它可以用来为一组数值集合赋予更加友好的名称：

```ts
enum Color {
  RED,
  GREEN,
  BLUE,
}

let color: Color = Color.RED;
```

默认情况下，枚举成员的数值是从 `0` 开始，依次递增。或者，也可以手动指定：

```ts
enum Color {
  RED = 1,
  GREEN, // 2
  BLUE, // 3
}
```

如果你知道枚举成员的值，那么通过它可以反向查找到其对应的枚举成员名称：

```ts
enum Color {
  RED,
  GREEN,
  BLUE,
}

console.log(Color[2]); // 'BLUE'
```

## Any

`Any` 顾名思义，也就是『随便，都可以』：

```ts
let notSure: any = 1;
notSure = 'any';
notSure = false;
```

## Void

`void` 有点像 `any` 的对立面：没有任何类型。可以将其视为没有返回值类型函数的返回值类型：

```ts
function warn(): void {
  console.warn('Warning');
}
```

## Null & Undefined

TS 中 `null` 和 `undefined` 都有对应的类型名称 `null` 和 `undefined`：

```ts
let u: undefined = undefined;
let n: null = null;
```

`null` 和 `undefined` 类型是其他所有类型的子类型，也就是说，你可以把前两者赋值给其它任何类型。如果配置了 `--strictNullChecks` 选项，`null` 和 `undefined` 将只能赋值给 `any` 和它们各自对应的类型。

## Never

`never` 类型表示值的类型从不出现。例如，当 `never` 作为函数的返回值类型时，该函数总是会抛出异常或者永远不返回。

`never` 类型可以是每种类型的子类型，可以分配给每种类型；但是没有类型是 `never` 类型的子类型。

```ts
function error(message: string): never {
  throw new Error(message);
}

function fail(): never {
  return error('Failed');
}

function infiniteLoop(): never {
  while (true) {}
}
```

## Object

`object` 表示非原始类型，即除了 `number`、 `string`、 `boolean`、 `symbol`、 `null`、 `undefined` 之外的其它类型。

## 类型断言

类型断言类似其它语言中的类型转换，就像告诉编译器：『相信我，我知道我在做什么』。TS 中的类型断言有两种形式：

```ts
// 1. 尖括号语法
let value: any = 'Hello TS';
let valLength: number = (<string>value).length; // 8

// 2. as 语法
let value: any = 'Hello TS';
let valLength: number = (value as string).length; // 8
```

如果要在 JSX 中使用类型断言，只允许使用 `as` 语法。
