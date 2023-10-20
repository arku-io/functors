// Copyright 2023 the vika authors. All rights reserved. MIT license.

      export {
  isNone,
  isSome,
  type Match as OptionMatch,
  None,
  type Option,
  OptionType,
  type OptNone,
  type OptSome,
  Some,
} from "./option.ts";

export {
  Err,
  isErr,
  isOk,
  type Match as ResultMatch,
  Ok,
  type ResErr,
  type ResOk,
  type Result,
  ResultType,
} from "./result.ts";

export {
  type Either,
  EitherType,
  isLeft,
  isRight,
  Left,
  type Match as EitherMatch,
  type ResLeft,
  type ResRight,
  Right,
} from "./either.ts";
