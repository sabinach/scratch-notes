#! /bin/bash

# To Run: ./18-until-loops.sh

n=1

until [ $n -ge 10 ] # (( $n >= 10 ))
do 
    echo $n 
    n=$(( n+1 )) # (( n+1 ))
                 # (( n++ ))
                 # (( ++n ))
done