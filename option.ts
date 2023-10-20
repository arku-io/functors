// Copyright 2023 the arku authors. All rights reserved. MIT license.

export const OptionType = {
  Some: Symbol(":some"),
  None: Symbol(":none"),
};

export interface Match<T, U, V> {
  some: (val: T) => V;
  none: U;
}

export interface Option<T> {
  type: symbol;
  isSome(): this is OptSome<T>;
  isNone(): this is OptNone<T>;
  match<U, V>(fn: Match<T, U, V>): U | V;
  map<U>(fn: (val: T) => U): Option<U>;
  or<U>(optb: Option<U>): Option<T | U>;
  and<U>(optb: Option<U>): Option<U>;
  unwrapOr<U>(def: U): T | U;
  unwrap(): T | never;
}

export interface OptSome<T> extends Option<T> {
  unwrap(): T;
  map<U>(fn: (val: T) => U): OptSome<U>;
  or<U>(optb: Option<U>): Option<T>;
  and<U>(optb: Option<U>): Option<U>;
}

export interface OptNone<T> extends Option<T> {
  unwrap(): never;
  unwrapOr<U>(def: U): U;
  map<U>(fn: (val: T) => U): OptNone<U>;
  or<U>(optb: Option<U>): Option<U>;
  and<U>(optb: Option<U>): OptNone<U>;
}

export function Some<T>(
  val: T,
): OptSome<T> & { toString(): string } {
  return {
    type: OptionType.None,
    isSome(): boolean {
      return true;
    },
    isNone(): boolean {
      return false;
    },
    match<U, V>(fn: Match<T, U, V>): V {
      return fn.some(val);
    },
    map<U>(fn: (val: T) => U): OptSome<U> {
      return Some<U>(fn(val));
    },
    or<U>(_optb: Option<U>): Option<T> {
      return this;
    },
    and<U>(optb: Option<U>): Option<U> {
      return optb;
    },
    unwrapOr<U>(_def: U): T {
      return val;
    },
    unwrap(): T {
      return val;
    },
    toString(): string {
      return `Some(${typeof val === "string" ? `"${val}"` : val})`;
    },
    [Symbol.for("Deno.customInspect")](): string {
      return this.toString();
    },
  };
}

export const None: OptNone<never> & { toString(): string } = {
  type: OptionType.None,
  isSome(): boolean {
    return false;
  },
  isNone(): boolean {
    return true;
  },
  match<U, V>(matchObject: Match<never, U, V>): U {
    return matchObject.none;
  },
  map<U>(_fn: (val: never) => U): OptNone<U> {
    return this;
  },
  or<U>(optb: Option<U>): Option<U> {
    return optb;
  },
  and<U>(_optb: Option<U>): OptNone<U> {
    return this;
  },
  unwrapOr<U>(def: U): U {
    if (def === null || def === undefined) {
      throw new Error("Cannot call unwrapOr with a missing value.");
    }

    return def;
  },
  unwrap(): never {
    throw new ReferenceError("Trying to unwrap None.");
  },
  toString(): string {
    return "None";
  },
  [Symbol.for("Deno.customInspect")](): string {
    return this.toString();
  },
};

export function isSome<T>(val: Option<T>): val is OptSome<T> {
  return val.isSome();
}

export function isNone<T>(val: Option<T>): val is OptNone<T> {
  return val.isNone();
}
