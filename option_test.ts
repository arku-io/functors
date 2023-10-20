import { None, type Option, Some } from "./option.ts";
import { assertEquals, assertThrows } from "./test_deps.ts";

function divide(x: number, y: number): Option<number> {
  if (y === 0) {
    return None;
  } else {
    return Some(x / y);
  }
}

const { test } = Deno;

test({
  name: "Dividing numerator by valid denominator assertions",
  fn() {
    const result = divide(84, 2);

    assertEquals(
      result.match({
        some: (x) => `The answer to life is ${x}`,
        none: null,
      }),
      "The answer to life is 42",
    );
  },
});

test({
  name: "Dividing numerator by 0 denominator assertions",
  fn() {
    const result = divide(84, 0);

    assertEquals(
      result.match({
        some: (x) => `The answer to life is ${x}`,
        none: "That should not happen",
      }),
      "That should not happen",
    );
  },
});

test({
  name: "Map assertions",
  fn() {
    const result = divide(84, 2);

    assertEquals(
      result.map((x) => `The answer to life is ${x}`).unwrap(),
      "The answer to life is 42",
    );
  },
});

test({
  name: "None assertions",
  fn() {
    const result = divide(84, 0);

    assertThrows(() => result.unwrap());
    assertThrows(() => result.unwrapOr(null));
    assertThrows(() => result.unwrapOr(undefined));

    assertEquals(
      result.unwrapOr("null"),
      "null",
    );

    assertEquals(
      result.unwrapOr("null"),
      "null",
    );
  },
});

test({
  name: "Or assertions",
  fn() {
    const result = divide(84, 0);

    assertEquals(
      result.or(Some("Hello, World!")).unwrap(),
      Some("Hello, World!").unwrap(),
    );
  },
});

test({
  name: "And assertions",
  fn() {
    const result = divide(84, 2);

    assertEquals(
      result.and(Some("Hello, World!")).unwrap(),
      Some("Hello, World!").unwrap(),
    );

    assertThrows(
      () => result.and(None).unwrap(),
    );

    const result2 = divide(84, 0);

    assertThrows(
      () => result2.and(Some("Hello, World!")).unwrap(),
    );
  },
});

test({
  name: "isNone & isSome assertions",
  fn() {
    const some = Some(1);

    assertEquals(some.isSome(), true);
    assertEquals(None.isSome(), false);
    assertEquals(some.isNone(), false);
    assertEquals(None.isNone(), true);
  },
});
