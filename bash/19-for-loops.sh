#! /bin/bash

# To Run: ./19-for-loops.sh

for i in 1 2 3 4 5
do 
    echo $i 
done

##----------------------##

for j in {6..10}
do 
    echo $j
done 

##----------------------##

echo ${BASH_VERSION}

for k in {11..15..2} # {START..STOP..INCREMENT}, only works for bash version > 4.0
do 
    echo $k
done

##----------------------##

for (( i=0; i<5; i++ ))
do 
    echo $i 
done

##----------------------##

: '
for VARIABLE in 1 2 3 4 5 .. N
do 
    command1
    command2
    ...
    commandN
done

##----------------------##

for VARIABLE in file1 file2 file3
do 
    command1 on $VARIABLE
    command2
    ...
    commandN
done

##----------------------##

for OUTPUT in $(Linux-Or-Unix-Command-Here)
do
    command1 on $OUTPUT
    command2 on $OUTPUT
    ...
    commandN
done

##----------------------##

for (( EXP1; EXP2; EXP3 ))
do 
    command1
    command2
    ...
    commandN
done
'