#! /bin/bash

# To Run: ./27-signals.sh

# Type 'man 7 signal' for the man page of all the signals
# CTRL-C: SIGINT interrupt signal
# CTRL-Z: SIGTSTP suspend signal
# kill -9 <pid>: SIGKILL signal

# All signal values are > 0
# Signal 0 is a success signal

echo "pid is $$"
while (( COUNT < 10 ))
do 
    sleep 1
    (( COUNT++ ))
    echo $COUNT 
done 
exit 0