#! /bin/bash

# To Run: ./03-user-input.sh

echo "Enter names: "
read name1 name2 name3
echo "Names: $name1, $name2, $name3"

##----------------------##

read -p "username: " user_var   # -p keep user input to the same line
read -sp "password: " pass_var  # -s hide the user input
echo
echo "username: $user_var"
echo "password: $pass_var"

##----------------------##

echo "Enter names: "
read -a names 
echo "Names: ${names[0]}, ${names[1]}"

##----------------------##

echo "Enter name: "
read
echo "Name: $REPLY"