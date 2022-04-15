#! /bin/bash

# To Run: ./12-case-statements.sh car

vehicle=$1

case $vehicle in 
    "car" )
        echo "Rent of $vehicle is 100 dollars" ;; 
    "van" )
        echo "Rent of $vehicle is 80 dollars" ;;
    "bicycle" )
        echo "Rent of $vehicle is 5 dollars" ;;
    "truck" )
        echo "Rent of $vehicle is 150 dollars" ;;
    * )
        echo "Unknown vehicle" ;;
esac

: '
case expression in
    pattern1 )
        statements ;;
    pattern2 )
        statements ;;
    ...
esac
'