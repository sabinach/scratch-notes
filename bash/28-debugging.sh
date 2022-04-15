#! /bin/bash -x

# OR:
# set -x # from this point onwards, activate debugging
# set +x # stop debugging at this point

echo "pid is $$"
while (( COUNT < 10 ))
do 
    sleep 1
    (( COUNT++ ))
    echo $COUNT 
done 
exit 0