#! /bin/bash

# To Run: ./21-select-loops.sh

select name in mark john tom ben
do
    echo "$name selected"
done

: '
select name in mark john tom ben
do
    case $name in 
        mark )
            echo mark selected
            ;;
        john )
            echo john selected
            ;;
        tom )
            echo tom selected
            ;;
        ben )
            echo ben selected
            ;;
        * )
            echo "Error please provide a number between 1..4"
    esac
done
'