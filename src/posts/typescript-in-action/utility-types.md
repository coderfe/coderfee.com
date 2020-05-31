---
title: 『TypeScript』实用类型
date: 2019-08-28
path: '/typescript-in-action/utility-types'
tldr: TypeScript 提供了一些全局可用的实用程序类型，通常和泛型一起使用，以便进行类型转换。
tags: ['TypeScript']
cover: './cover.png'
---

## Partial&lt;T&gt;

它会构造一个新类型，并将类型 `T` 的所有属性设置为可选。该类型是类型 `T` 的子集。

```ts
interface User {
  name: string;
  age: number;
}

const a: User = {
  name: 'tom',
  // age: 16
};
// Error

const b: Partial<User> = {
  name: 'simon',
};
// OK
```

如果用 TypeScript 手动实现，代码如下：

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## Readonly&lt;T&gt;

它将构造一个新类型，并将类型 `T` 的所有属性设置为 `readonly`，这意味着新类型的属性都不能重新赋值了。

```ts
interface User {
  name: string;
  age: number;
}

let tom: Readonly<User> = {
  name: 'tom',
  age: 16,
};

tom.name = 'simon'; // Error
```

TypeScript 手动实现如下：

```ts
interface User {
  name: string;
  age: number;
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## Record&lt;K, T&gt;

构造一个具有类型 `T` 的一组属性 `K` 的新类型，该类型经常用于将一种类型的属性映射到另一种类型上。

```ts
interface Page {
  title: string;
}

type PageInfo = 'home' | 'about' | 'contact';

const x: Record<PageInfo, Page> = {
  home: { title: 'home' },
  about: { title: 'about' },
  contact: { title: 'contact' },
};
```

## Pick&lt;T, K&gt;

从类型 `T` 中选取一些属性 `K` 作为新类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Todo',
  completed: true,
};
```

## Omit&lt;T, K&gt;

从类型 `T` 中选取所有属性，然后再移除指定的 `K` 类型的属性。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, 'description'>;

const todo: TodoPreview = {
  title: 'Todo',
  completed: true,
};
```

## Exclude&lt;T, U&gt;

通过从类型 `T` 中排除可分配给类型 `U` 来构造新类型。

```ts
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // 'c'
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

## Extract&lt;T, U&gt;

通过提取类型 `T` 中可以分配给类型 `U` 来构造新类型。

```ts
type T1 = Extract<'a' | 'b', 'c', 'a' | 'b'>; // 'a' | 'b'
type T2 = Extract<string | number | (() => void), Function>; // Function
```

## NonNullable&lt;T&gt;

从类型 `T` 中排除 `null` 和 `undefined`。

```ts
type T1 = NonNullable<string | number | null>; // string | number
type T2 = NonNullable<string[] | null | undefined>; // string[]
```

## Required&lt;T&gt;

构造一个新类型，并将类型 `T` 的所有属性设置为必选。

```ts
interface User {
  name?: string;
  age?: number;
}

const tom: User = {
  name: 'tom',
};
// OK

const simon: Required<User> = {
  name: 'simon',
  // age: 16,
};
// Error
```

## ThisType&lt;T&gt;

它不返回任何转换类型，仅作为 `this` 上下文的标记。要使用该类型，必须在 `tsconfig.json` 中启用 `noImplicitThis`。
