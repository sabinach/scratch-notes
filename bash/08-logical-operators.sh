#! /bin/bash

# To Run: ./08-logical-operators.sh

age=25

# if [ "$age" -gt 18 ] && [ "$age" -lt 30 ]
# if [[ "$age" -gt 18 && "$age" -lt 30 ]]
if [ "$age" -gt 18 -a "$age" -lt 30 ]
then 
    echo "valid age"
else
    echo "invalid age"
fi

# if [ "$age" -eq 18 ] || [ "$age" -eq 30 ]
# if [[ "$age" -eq 18 || "$age" -eq 30 ]]
if [ "$age" -eq 18 -o "$age" -eq 30 ]
then 
    echo "either 18 or 30"
else
    echo "not either 18 or 30"
fi