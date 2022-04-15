#! /bin/bash

# To Run: ./10-basic-arithmetic.sh

num1=21
num2=5

echo $(( num1 + num2 ))
echo $(( num1 - num2 ))
echo $(( num1 * num2 ))
echo $(( num1 / num2 ))
echo $(( num1 % num2 ))

echo $(expr $num1 + $num2 )
echo $(expr $num1 - $num2 )
echo $(expr $num1 \* $num2 )
echo $(expr $num1 / $num2 )
echo $(expr $num1 % $num2 )

num3=20.5
num4=5

echo "$num3 + $num4" | bc # bc means "basic calculator" in order to be able to calculate floating numbers
echo "$num3 - $num4" | bc
echo "$num3 * $num4" | bc
echo "scale=2; $num3 / $num4" | bc # requires scale to know to what precision to round to
echo "$num3 % $num4" | bc

num5=27
echo "scale=2; sqrt($num5)" | bc -l # requires -l flag to use the math library to call sqrt()
echo "scale=2; 3^3" | bc -l