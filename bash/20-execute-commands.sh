#! /bin/bash

# To Run: ./20-execute-commands.sh

for command in ls pwd date
do 
    echo "---------- $command ----------" # name of the command
    $command # execute the command
done

##----------------------##

echo "---------- files ----------"
for item in * # * means to iterate over all the files in the directory
do 
    if [ -f $item -o -d $item ] # -f check if item is a file
                    # -d check if item is a directory
    then
        echo $item 
    fi
done