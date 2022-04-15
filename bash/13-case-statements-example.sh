#! /bin/bash

# To Run: ./13-case-statements-example.sh

echo -e "Enter some character : \c"
read value

case $value in 
    [a-z] )
        echo "User enter $value a to z" ;;
    [A-Z] )
        echo "User entered $value A to Z" ;;
    [0-9] )
        echo "User entered $value 0 to 9" ;;
    ? )
        echo "User entered $value special character" ;;
    * )
        echo "Unknown input" ;;
esac