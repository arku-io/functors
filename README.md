<img src="https://i.imgur.com/Aas0yVe.gif" alt="loxt" width="500"/>

[![deno module](https://shield.deno.dev/x/vika)](https://deno.land/x/vika)

## What is Vika?
Vika is a monad library to bring the awesomeness of functional programming to JavaScript/TypeScript. This project was inspired by Rust's built in Option and Result types.

```ts
import { Option, Some, None } from "vika";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

async function getData<T>(url: string): Promise<Option<T>> {
    const res = await fetch(url);
    if (res.status !== 200) {
        return None;
    }
    return Some(await res.json());
}

const todo = await getData<Todo>("https://jsonplaceholder.typicode.com/todos/1");
const message = todo.match({
    some: (t) => `User of id "${t.userId}" has a todo of id "${t.id}" with title "${t.title}" that was ${t.completed ? "" : "not"} completed`,
    none: "No task found",
});

console.log(message) // User of id "1" has a todo of id "1" with title "delectus aut autem" that was not completed
```
