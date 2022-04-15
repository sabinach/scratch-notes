#! /bin/bash

# To Run: ./17-read-files.sh

while read line
do 
    echo $line
done < helloworld.txt

##----------------------##

cat helloworld.txt | while read line 
do 
    echo $line
done

##----------------------##

#To read files with special symbols:
#    IFS (internal field separator) requires an empty space as input
#    -r prevents backslash from being interpreted 

while IFS=" " read -r line
do 
    echo $line
done < helloworld.txt