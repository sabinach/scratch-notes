#! /bin/bash

# To Run: ./23-functions.sh

function HelloWorld(){
    echo Hello World!
}

print() {
    echo $1 # print the arguments
}

quit() {
    exit # exit shell script
}

# call the function
HelloWorld
print foo
print bar
quit
echo "You can't see this."

# general function notations
: '
function name(){
    commands
}

name () {
    commands
}
'