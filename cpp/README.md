# C++

### To Compile C++
- ```g++ <filename>.cpp -o <filename>```

### To Compile Specific C++ Version
- ```g++ <filename>.cpp -o <filename> --std=c++17```

### To Compile with Included Files
- ```g++ <filename>.cpp <included-file>.cpp -o <filename>```

### To Run
- ```./<filename>```

### To Build and Run CMake
Method 1:
0. create `main.cpp` and `CMakeLists.txt` files
1. ```mkdir build```
2. ```cd build```
3. ```cmake ..```
4. ```make```
5. ```./main```
Method 2:
0. create `main.cpp` and `CMakeLists.txt` files
1. ```cmake -S . -B build```
2. ```cmake --build build```
3. ```cd build```
4. ```./<filename>```


### File Structure
- `include/` - `*.h` header files
- `src/` - `*.cpp` definition files
- `bin/` - compiled binaries

### examples/
- helloworld: `helloworld.cpp`
- headers: https://www.youtube.com/watch?v=KAlpQT947Uo
- namespacess: https://www.youtube.com/watch?v=Jf53MErcZVY
- cmake: https://www.youtube.com/watch?v=a5kUr-u2UNo
- gtest: https://www.youtube.com/playlist?list=PLHn7_PzMqzs5JE58kw4nWiFELEkQek5G0
- spdlog: XXX

### tutorials/
- [Basic Syntax](https://www.youtube.com/playlist?list=PL43pGnjiVwgQHLPnuH9ch-LhZdwckM8Tq) by CodeBeauty
- [Pointers](https://www.youtube.com/playlist?list=PL43pGnjiVwgSSRlwfahAuIqoJ8TfDIlHq) by CodeBeauty
- [OOP](https://www.youtube.com/playlist?list=PL43pGnjiVwgTJg7uz8KUGdXRdGKE0W_jN) by CodeBeauty
- [Data Structures](https://www.youtube.com/playlist?list=PL43pGnjiVwgS5njI0HMGnqSH18tSSuLz_) by CodeBeauty
- [Questions](https://www.youtube.com/playlist?list=PL43pGnjiVwgTnNmcPuhvSUcSgpNfR48ui) by CodeBeauty

### Other Resources
- [Beginner C++](https://www.youtube.com/playlist?list=PL_c9BZzLwBRJVJsIfe97ey45V4LP_HXiG) by Caleb Curry
- [Intermediate C++](https://www.youtube.com/playlist?list=PL_c9BZzLwBRJkVDaJbLHrrjNH_phcbCy7) by Caleb Curry

### Misc Notes
- `%` symbol appearing in console output
    * https://stackoverflow.com/questions/27238564/getting-a-weird-percent-sign-in-printf-output-in-terminal-with-c
- memory allocation/deallocation
    * https://towardsdatascience.com/c-memory-allocation-deallocation-for-data-processing-1b204fb8a9c
- https://stackoverflow.com/questions/4984600/when-do-i-use-a-dot-arrow-or-double-colon-to-refer-to-members-of-a-class-in-c
    * `a::b` if `b` is a direct member of the namespace `a`
    * `a.b` if `b` is a direct member of the object or reference to the object `a`
    * `a->b` is shorthand for `(*a).b`, where `a` is a pointer, `b` is the indirect member of the object the pointer `a` refers to 
- style (c++ best practices)
    * https://lefticus.gitbooks.io/cpp-best-practices/content/03-Style.html
