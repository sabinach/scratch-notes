#! /bin/bash

# To Run: ./26-readonly-commands.sh

var=31
readonly var 
var=50
echo "var is $var"

##----------------------##

hello() {
    echo "Original function"
}

readonly -f hello # -f flag required to make readonly functions

hello() {
    echo "Attempted overwrite"
}

readonly # view all the built-in readonly variables  (optional -p flag for variables)
readonly -f # view all the readonly functions