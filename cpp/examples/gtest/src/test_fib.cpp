#include <gtest/gtest.h>

int Fib(int n) {
    if(n <= 1) {
        return n;
    }
    return Fib(n-1) + Fib(n-2);
}

// suite name, test name
TEST(FibTest, NonNegativeValues) {
  std::cout << "Fib(5)= " << Fib(5) << std::endl;
  EXPECT_EQ(Fib(0), 0);

  EXPECT_EQ(Fib(1), 1);
  EXPECT_EQ(Fib(5), 5);
  EXPECT_EQ(Fib(6), 10) << "Error: The factorial calculation was wrong!";

  EXPECT_TRUE(Fib(6) == 8);
}

TEST(FibTest, NegativeValues) {
  EXPECT_LT(Fib(-1), 0);
  EXPECT_LT(Fib(-10), 0);
  //EXPECT_THAT(Fib(-10), testing::Lt(0));
}