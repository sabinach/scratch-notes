#! /bin/bash

# To Run: ./24-local-variables.sh

printName() {
    local name=$1 # local
    echo "The name is $name"
}

name="Tom" # global
echo "The name is $name : Before" # using global
printName Max # using local
echo "The name is $name : After" # using global