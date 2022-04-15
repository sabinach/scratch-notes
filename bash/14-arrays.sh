#! /bin/bash

# To Run: ./14-arrays.sh

os=("ubuntu" "windows" "kali") # note that there are no commas

os[3]="mac" # append to array at specified index
            # gaps in the array are okay, ie os[6]="mac", leaving indices 3 and 4 empty
unset os[2] # remove from array at specified index

echo "${os[@]}" # print elements of the array
echo "${os[0]}" # print index of array
echo "${!os[@]}" # print indices of the array
echo "${#os[@]}" # print length of the array

string=asdf
echo "${string[@]}"
echo "${string[0]}"
echo "${string[1]}" # returns nothing