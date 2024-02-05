---
title: 'How to filter and map an array at the same time in JavaScript'
description: '`filter` and `map` are two of the most commonly used array methods in JavaScript. But what if you want to filter and map in one iteration?'
pubDate: '2024-02-02'
author: 'Alexander Keliris'
socialImage: './flatMap.png'
---

Other languages have an explicit method that both filters and maps, such as Rust's [`filter_map`](https://doc.rust-lang.org/std/iter/trait.Iterator.html#method.filter_map). In JavaScript, we have historically used [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) to filter and map in one iteration. But now, we have another (better) choice thanks to [`flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)!

## Usage of `flatMap`

```ts
const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Bob', age: 20 },
  { name: 'Alice', age: 40 },
]

const over30UserNames = users.flatMap((user) => {
  if (user.age >= 30) {
    return user.name
  }
  return []
})
```

If you are using TypeScript, `over30UserNames` is correctly inferred to be an array of strings (`string[]`).

Implementing this using `reduce`, we can see it requires slightly more syntax _and_ a type annotation:

```ts
const over30UserNamesReduce = users.reduce((acc, user) => {
  if (user.age >= 30) {
    return [...acc, user.name]
  }
  return acc
}, [] as string[])
```

## Conclusion

Next time you find yourself chaining `filter` and `map`, consider using `flatMap` instead. It's more performant than chaining two methods and allows TypeScript to infer the return type of the callback function, which is not the case with `reduce`.
