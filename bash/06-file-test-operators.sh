#! /bin/bash

# To Run: ./06-file-test-operators.sh

echo -e "Enter name of the file: \c" # \c keeps the cursor on the same line
                                     # -e required to interpret the \c command
read filename

# -e checks if file exists
# -d checks if directory exists
# -s checks if the file has data
# -r checks if file has read permission
# -w checks if file has write permission
# -x checks if file has execute permission
if [ -e $filename ]
then 
    echo "$filename found"
else
    echo "$filename not found"
fi