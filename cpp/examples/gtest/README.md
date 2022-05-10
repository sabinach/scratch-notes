# GoogleTest

## Tutorials
- GoogleTest Primer: https://google.github.io/googletest/primer.html
- Playlist: https://www.youtube.com/playlist?list=PLHn7_PzMqzs5JE58kw4nWiFELEkQek5G0

## To Setup
- https://google.github.io/googletest/quickstart-cmake.html

## To Build
0. ```cd gtest``` (current root dir)
1. ```cmake -S . -B build```
2. ```cmake --build build```
3. ```cd build```
4. ```./test_fib``` or ```./test_helloworld```

## Notes
- test suite: group of tests that are logically related (ie. different inputs for a function)
- fixture: a Class factoring out common code for multiple cases (ie. setup and teardown)
- mock classes/objects: simplified/lightweight classes to untangle complex dependencies while testing
- test frameworks
  * automate the execution (ie. Google Test and Mock)
  * assertions, checks, and matches (Catch2)
  * test organization (Doctest)
  * reports (Boost.Test)

## GoogleTest Assertion Macros (ie. `{ASSERT, EXPECT}_EQ`)
- `ASSERT_TRUE` (fatal, stops test) vs. `EXPECT_TRUE` (non-fatal, will continue test)
- binary comparison macros
  * `EQ` (==), `NE` (!=), `LT` (<), `LE` (<=), `GT` (>), `GE` (>=)
- C Strings
  * `STREQ` (==), `STRNE` (!=), `STRECASEEQ` (==, ignore case), `STRCASENE` (!=, ignore case)
- Floating points
  * `FLOAT_EQ` (floats almost equal), `DOUBLE_EQ` (doubles almost equal), `NEAR` (difference doesn't exceed `abs_err`)
  * almost equal = within 4 ULPs
- Predicates
  * `PRED1`, `PRED2`
- Exceptions
  * `THROW`, `ANY_THROW`, `NO_THROW`
- Death Test
  * `DEATH`, `EXIT`

## Test Fixtures
- If there's some code that we want to be executed before (`Setup()`) and after (`TearDown()`) each unit test
- Use `SetupTestSuite()` and `TearDownTestSuite()` to execute code before/after all tests 
- Use parametrized tests with mapped name generators to run multiple tests with the same code
- Use ____ with ____ to run multiple implementations that have the same test