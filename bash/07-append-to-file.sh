#! /bin/bash

# To Run: ./07-append-to-file.sh

echo -e "Enter the name of the file: \c"
read filename 

if [ -f $filename ]
then
    if [ -w $filename ]
    then 
        echo "Type some text data. To quit, press CTRL+d."
        cat >> $filename
    else
        echo "The file does not have write permissions."
    fi
else
    echo "$filename does not exist."
fi 