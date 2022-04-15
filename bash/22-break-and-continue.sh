#! /bin/bash

# To Run: ./22-break-and-continue.sh

for (( i=1 ; i<=10 ; i++ ))
do 
    if (( $i > 5 ))
    then
        break 
    fi 
    echo $i 
done

##----------------------##

for (( i=11 ; i<=20 ; i++ ))
do 
    if (( $i == 13 || $i == 16 ))
    then
        continue 
    fi 
    echo $i 
done