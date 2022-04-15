#! /bin/bash

# To Run: ./25-function-example.sh helloworld.txt

usage() {
    echo "You need to provide an argument: "
    echo "Usage: $0 filename"
}

isFileExist() {
    local file=$1 # argument provided through the function call
    [[ -f $file ]] && return 0 || return 1 # ternary operator, basically if..else
}

(( $# == 0 )) && usage # check if no arguments are provided

if ( isFileExist $1 ) # argument provided through the script
then 
    echo "File found"
else 
    echo "File not found"
fi 