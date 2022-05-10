# spdlog

## To Setup
- git clone spdlog repo into `vendor/`: https://github.com/gabime/spdlog
- Create CMakeLists.txt at root dir: https://github.com/gabime/spdlog/blob/v1.x/example/CMakeLists.txt

## To Build
0. ```cd spdlog``` (current root dir)
1. ```cmake -S . -B build```
2. ```cmake --build build```
3. ```cd build```
4. ```./basic_usage```

## Why use a logging framework?
- [C++ Weekly - Ep 135 - {fmt} is Addictive! Using {fmt} and spdlog](https://www.youtube.com/watch?v=KeS1ehp9IiI)
   * easy to read and simple to construct logging messages (instead of using a bunch of `cout` or building your own logging libary)
   * nice for formatting of streams (instead of using iostreams)