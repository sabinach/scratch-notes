#! /bin/bash

# To Run: ./04-arguments.sh Mark Tom John

echo $0 $1 $2 $3 # $0 is ./04-arguments.sh
echo $@ # default variable for taking in arguments
        # 0 index is Mark
echo $# # default variable for number of arguments

args=("$@") # save array to args variable
echo ${args[0]} ${args[1]} ${args[2]} # 0 index is Mark