cmake_minimum_required(VERSION 3.10)
project(spdlog_examples CXX)

if(NOT TARGET spdlog)
    # Stand-alone build
    find_package(spdlog REQUIRED)
endif()

# ---------------------------------------------------------------------------------------
# Example of using pre-compiled library
# ---------------------------------------------------------------------------------------
add_executable(basic_usage src/basic_usage.cpp)
target_link_libraries(basic_usage PRIVATE spdlog::spdlog)

# ---------------------------------------------------------------------------------------
# Example of using header-only library
# ---------------------------------------------------------------------------------------
#if(SPDLOG_BUILD_EXAMPLE_HO)
#    add_executable(example_header_only example.cpp)
#    target_link_libraries(example_header_only PRIVATE spdlog::spdlog_header_only)
#endif()