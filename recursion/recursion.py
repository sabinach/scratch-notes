#!/usr/bin/env python

import os

## ---------------------------------------------------------------------- ##
# https://www.w3resource.com/python-exercises/data-structures-and-algorithms/python-recursion.php
## ---------------------------------------------------------------------- ##

## ----------- factorial ----------- ##

def factorial(n):
	if n==1:
		return 1
	return n * factorial(n-1)

#print(factorial(3))				#answer: 6

def factorial_memo(n, memo={}):
	if n==1:
		return 1
	elif n not in memo:
		memo[n] = n * factorial_memo(n-1, memo)
	return memo[n]

#print(factorial_memo(3))			#answer: 6

## ----------- sum of list of numbers  ----------- ##

def recursion_sum(num_list):
	if num_list == []:
		return 0
	return num_list[0] + recursion_sum(num_list[1:])

#num_list = [0, 1, 2, 3, 4, 5]
#print(recursion_sum(num_list)) 	#answer: 15

## ----------- sum of recursion number list  ----------- ##

def recursion_sum2(num_list):
	if num_list == []:
		return 0
	elif isinstance(num_list[0], int):
		return num_list[0] + recursion_sum2(num_list[1:])
	else:
		return recursion_sum2(num_list[0]) + recursion_sum2(num_list[1:])

#num_list2 = [1, 2, [3,4], [5,6], 7]
#print(recursion_sum2(num_list2))	#answer: 28

## ----------- Fibonacci sequence ----------- ##
# fib: 	0 1 1 2 3 5 8 13 21 34
# indx: 0 1 2 3 4 5 6 7  8	9

def fibonacci(n):
	if n==0:
		return 0
	elif n==1:
		return 1
	return fibonacci(n-1) + fibonacci(n-2) 

#print(fibonacci(9)) 			#answer: 34	

def fibonacci_memo(n, memo={}):
	if n in memo:
		return memo[n]
	elif n==0:
		memo[n] = 0
	elif n==1:
		memo[n] = 1
	else:
		memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
	return memo[n]

#print(fibonacci_memo(9))		#answer: 34

## ----------- sum digits of non-negative integer ----------- ##

def sum_digits(n):
	if n < 10:
		return n
	return sum_digits(n//10) + n%10

#print(sum_digits(12345))		#answer: 15

## ----------- sum of the positive integers of n+(n-2)+(n-4)... (until n-x =< 0) ----------- ##

def sum_series(n):
	if n <= 0:
		return 0
	return n + sum_series(n-2)

#print(sum_series(10))			#answer: 30

## ----------- harmonic sum ----------- ##
## Note: The harmonic sum is the sum of reciprocals of the positive integers.

def harmonic_sum(n):
	if n==1:
		return 1
	return 1/n + harmonic_sum(n-1)

#print(harmonic_sum(7))			#answer: 2.5928571428571425 

## ----------- calculate the value of 'a' to the power 'b' ----------- ##

def power_recursion(a, b):
	if b==0:
		return 1
	return a * power_recursion(a, b-1)

#print(power_recursion(2, 4))	#answer: 16

## ----------- greatest common divisor (gcd) of two integers ----------- ##

def gcd(num1, num2):
	low = min(num1, num2)
	high = max(num1, num2)

	if low==1:
		return 1
	elif high%low == 0:
		return low
	return gcd(low, high%low)

#print(gcd(24, 60))				#answer: 12	

## ---------------------------------------------------------------------- ##
# https://realpython.com/python-thinking-recursively/
## ---------------------------------------------------------------------- ##

## ----------- deliver packages recursively via elves ----------- ##

def deliver_to(package_list):
	if len(package_list)==1:
		print(package_list[0])
	else:
		deliver_to(package_list[:len(package_list)//2])
		deliver_to(package_list[len(package_list)//2:])

#package_list = ["A", "B", "C", "D", "E"]
#deliver_to(package_list)		#answer: A, B, C, D, E

## ----------- recursive sum ----------- ##

def sum_int(n):
	if n==0:
		return 0
	return n + sum_int(n-1)

#print(sum_int(3))				#answer: 6

## ---------------------------------------------------------------------- ##
# https://anandology.com/python-practice-book/functional-programming.html
## ---------------------------------------------------------------------- ##

## ----------- flatten a nested list ----------- ##

def flatten_list(nested_list, result=[]):
	for x in nested_list:
		if isinstance(x, int):
			result.append(x)
		else:
			flatten_list(x, result)

	return result

#nested_list = [ [1, 2, [3, 4]], [5, 6], 7 ]
#print(flatten_list(nested_list))					#answer: [1, 2, 3, 4, 5, 6, 7]

def flatten_list2(nested_list, result=[]):
	if len(nested_list)==1 and isinstance(nested_list, int):
		result.append(nested_list)
	else:
		flatten_list(nested_list[:len(nested_list)//2], result)
		flatten_list(nested_list[len(nested_list)//2:], result)
	return result

#nested_list = [ [1, 2, [3, 4]], [5, 6], 7 ]
#print(flatten_list2(nested_list))					#answer: [1, 2, 3, 4, 5, 6, 7]

## ----------- flatten a nested dictionary by joining the keys with . character ----------- ##

def flatten_dict(nested_dict, parent_key="", new_dict={}):
	for key in nested_dict:
		if parent_key:
			new_key = parent_key + "." + key
		else: 
			new_key = key

		if isinstance(nested_dict[key], int):
			new_dict[new_key] = nested_dict[key]
		else:
			flatten_dict(nested_dict[key], new_key, new_dict)

	return new_dict

#print(flatten_dict({'a': 1, 'b': {'x': 2, 'y': 3, 'z':{'i':4, 'j':5}},'c': 6}))		#answer: {'a': 1, 'b.x': 2, 'b.y': 3, 'b.z.i': 4, 'b.z.j': 5, 'c': 6}

## ----------- reverse flatten dict ----------- ##

'''
# skeleton
def unflatten_dict(input_dict):
	result_dict = {}
	for key in input_dict:
		key_list = key.split('.')
		if len(key_list) == 1:
			# do something
		else:
			# do something to the first key
			unflatten_dict(key_list[1:])
	return result_dict
'''

# solution found here: https://stackoverflow.com/questions/6037503/python-unflatten-dict
# personally still having trouble understanding this one
def unflatten_dict(input_dict):
    resultDict = {}
    for key in input_dict:
        key_list = key.split(".")
        d = resultDict
        for part in key_list[:-1]:
            if part not in d:
                d[part] = {}
            d = d[part]
        d[key_list[-1]] = input_dict[key]
    return resultDict

#print(unflatten_dict({'a': 1, 'b.x': 2, 'b.y': 3, 'b.z.i': 4, 'b.z.j': 5, 'c': 6}))		#answer: {'a': 1, 'b': {'x': 2, 'y': 3, 'z':{'i':4, 'j':5}},'c': 6}

## ----------- map a function over nested list ----------- ##

def tree_map(func, nested_list):
	new_list = []
	for item in nested_list:
		if isinstance(item, int):
			new_list.append(func(item))
		else:
			new_list.append(tree_map(func, item))
	return new_list

#print(tree_map(lambda x: x*x, [1, 2, [3, 4, [5]]]))					#answer: [1, 4, [9, 16, [25]]]

## ----------- reverse elements of a nested-list recursively ----------- ##

def tree_reverse(nested_list):
	new_list = []
	nested_list.reverse()
	for item in nested_list:
		if isinstance(item, int):
			new_list.append(item)
		else:
			new_list.append(tree_reverse(item))
	return new_list

#print(tree_reverse([[1, 2], [3, [4, 5]], 6]))						#answer: [6, [[5, 4], 3], [2, 1]]

## ----------- prints all the files in a directory recursively as a tree ----------- ##
#Hint: Use os.listdir and os.path.isdir functions.

def dirtree(file, parent_indent=""):
	filename = file.split('/')[-1]

	# directory
	if os.path.isdir(file): 
		# print directory
		print(parent_indent + filename + '/')

		# add filetree
		if parent_indent == "":
			parent_indent = '|--' + parent_indent
		else:
			parent_indent = '|  ' + parent_indent 

	    # recurse through directories
		for f in os.listdir(file):
			dirtree(file + '/' + f, parent_indent)

	# print file
	else: 
		print(parent_indent + filename)

#dirtree("foo")

'''
# answer
foo/
|-- a.txt
|-- b.txt
|-- bar/
|   |-- p.txt
|   `-- q.txt
`-- c.txt
'''

## ----------- count the number of ways to change any given amount. Available coins are also passed as argument to the function. ----------- ##
'''
def count_change(amount, coins, total=0, ways=0):
	for coin in coins:
		total += coin
		print('COIN:{}'.format(coin))
		print('TOTAL:{}'.format(total))
		if total == amount:
			ways +=1 
			print('ways:{}'.format(ways))
			print('---')
		elif total < amount:
			print(total)
			count_change(amount, coins, total, ways)
	return ways
'''

print(count_change(10, [1, 5]))								#answer: 3
#print(count_change(10, [1, 2]))							#answer: 6
#print(count_change(100, [1, 5, 10, 25, 50]))				#answer: 292

## ----------- compute all possible permutations of elements of a given list ----------- ##

#print(permute([1, 2, 3]))											#answer: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]














