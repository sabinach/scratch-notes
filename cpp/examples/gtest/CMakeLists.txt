cmake_minimum_required(VERSION 3.14)
project(gtest)

# GoogleTest requires at least C++11
set(CMAKE_CXX_STANDARD 11)

################################
# GTest GitHub
################################

include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/42ca3da5798750c2998dd09b751838227e1f58d3.zip
)
# For Windows: Prevent overriding the parent project's compiler/linker settings
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
FetchContent_MakeAvailable(googletest)

################################
# Unit Tests
################################

enable_testing()

add_executable(test_helloworld src/test_helloworld.cpp)
add_executable(test_fib src/test_fib.cpp)

target_link_libraries(test_helloworld gtest_main)
target_link_libraries(test_fib gtest_main)

include(GoogleTest)
gtest_discover_tests(test_helloworld)
gtest_discover_tests(test_fib)