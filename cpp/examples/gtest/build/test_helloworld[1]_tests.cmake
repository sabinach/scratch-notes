add_test([=[HelloTest.BasicAssertions]=]  /Users/sabinach/Desktop/temp/Sites/scratch-notes/cpp/examples/gtest/build/test_helloworld [==[--gtest_filter=HelloTest.BasicAssertions]==] --gtest_also_run_disabled_tests)
set_tests_properties([=[HelloTest.BasicAssertions]=]  PROPERTIES WORKING_DIRECTORY /Users/sabinach/Desktop/temp/Sites/scratch-notes/cpp/examples/gtest/build SKIP_REGULAR_EXPRESSION [==[\[  SKIPPED \]]==])
set(  test_helloworld_TESTS HelloTest.BasicAssertions)
