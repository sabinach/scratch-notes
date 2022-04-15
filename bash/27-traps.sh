#! /bin/bash

# To Run: ./27-traps.sh

# trap commands enable scripts to capture an interrupt, and then clean it up within the script
# trap CANNOT catch SIGKILL or SKIGSTOP signals!

trap "echo Exit signal was detected" SIGINT # CTRL-C

echo "pid is $$"
while (( COUNT < 10 ))
do 
    sleep 1
    (( COUNT++ ))
    echo $COUNT 
done 
exit 0

# SIMPLE EXAMPLE
: '
trap "echo Exit signal was detected" 0 # we are expecting signal 0 from (so we expect this to succeed)
echo "Hello World"
exit 0
'

# DELETE FILE ON KILL EXAMPLE
: '
file=/home/test/Desktop/file.txt
trap "rm -f $file && echo file deleted; exit" 0 2 15 # if any of these signals are detected, remove the file and exit
                                                     # 0 EXIT
                                                     # 2 SIGINT
                                                     # 15 SIGTERM
'