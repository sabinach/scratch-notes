#!/usr/bin/env python

import unittest
import recursion

class TestRecursion(unittest.TestCase):

    def test_factorial(self):
        result = recursion.factorial(3)
        expected = 6
        self.assertEqual(result, expected)

    def test_factorial_memo(self):
        result = recursion.factorial_memo(3)
        expected = 6
        self.assertEqual(result, expected)

    def test_recursion_sum(self):
        num_list = [0, 1, 2, 3, 4, 5]
        result = recursion.recursion_sum(num_list)
        expected = 15
        self.assertEqual(result, expected)

    def test_recursion_sum2(self):
        num_list = [1, 2, [3,4], [5,6], 7]
        result = recursion.recursion_sum2(num_list)
        expected = 28
        self.assertEqual(result, expected)

    def test_fibonacci(self):
        result = recursion.fibonacci(9)
        expected = 34
        self.assertEqual(result, expected)

    def test_fibonacci_memo(self):
        result = recursion.fibonacci_memo(9)
        expected = 34
        self.assertEqual(result, expected)

    def test_sum_digits(self):
        result = recursion.sum_digits(12345)
        expected = 15
        self.assertEqual(result, expected)

    def test_sum_series(self):
        result = recursion.sum_series(10)
        expected = 30
        self.assertEqual(result, expected)

    def test_harmonic_sum(self):
        result = recursion.harmonic_sum(7)
        expected = 2.5928571428571425
        self.assertEqual(result, expected)

    def test_power_recursion(self):
        result = recursion.power_recursion(2, 4)
        expected = 16
        self.assertEqual(result, expected)

    def test_gcd(self):
        result = recursion.gcd(24, 60)
        expected = 12
        self.assertEqual(result, expected)

    #print: A, B, C, D, E
    def test_deliver_to(self):
        package_list = ["A", "B", "C", "D", "E"]
        result = recursion.deliver_to(package_list)
        expected = None
        self.assertEqual(result, expected)

    def test_sum_int(self):
        result = recursion.sum_int(3)
        expected = 6
        self.assertEqual(result, expected)

    def test_flatten_list(self):
        nested_list = [ [1, 2, [3, 4]], [5, 6], 7 ]
        result = recursion.flatten_list(nested_list)
        expected = [1, 2, 3, 4, 5, 6, 7]
        self.assertEqual(result, expected)

    def test_flatten_list2(self):
        nested_list = [ [1, 2, [3, 4]], [5, 6], 7 ]
        result = recursion.flatten_list2(nested_list)
        expected = [1, 2, 3, 4, 5, 6, 7]
        self.assertEqual(result, expected)

    def test_flatten_dict(self):
        nested_dict = {'a': 1, 'b': {'x': 2, 'y': 3, 'z':{'i':4, 'j':5}},'c': 6}
        result = recursion.flatten_dict(nested_dict)
        expected = {'a': 1, 'b.x': 2, 'b.y': 3, 'b.z.i': 4, 'b.z.j': 5, 'c': 6}
        self.assertEqual(result, expected)

    def test_unflatten_dict(self):
        unnested_dict = {'a': 1, 'b.x': 2, 'b.y': 3, 'b.z.i': 4, 'b.z.j': 5, 'c': 6}
        result = recursion.unflatten_dict(unnested_dict)
        expected = {'a': 1, 'b': {'x': 2, 'y': 3, 'z':{'i':4, 'j':5}},'c': 6}
        self.assertEqual(result, expected)

    def test_tree_map(self):
        result = recursion.tree_map(lambda x: x*x, [1, 2, [3, 4, [5]]])
        expected = [1, 4, [9, 16, [25]]]
        self.assertEqual(result, expected)

    def test_tree_reverse(self):
        nested_list = [[1, 2], [3, [4, 5]], 6]
        result = recursion.tree_reverse(nested_list)
        expected = [6, [[5, 4], 3], [2, 1]]
        self.assertEqual(result, expected)

    '''
    # print
    foo/
    |-- a.txt
    |-- b.txt
    |-- bar/
    |   |-- p.txt
    |   `-- q.txt
    `-- c.txt
    '''
    def test_dirtree(self):
        result = recursion.dirtree("foo")
        expected = None
        self.assertEqual(result, expected)

    def test_countchange1(self):
        result = recursion.count_change(3, [1,2])
        expected = 2
        self.assertEqual(result, expected)

    def test_countchange2(self):
        result = recursion.count_change(10, [1, 5])
        expected = 3
        self.assertEqual(result, expected)

    def test_countchange3(self):
        result = recursion.count_change(10, [1, 2])
        expected = 6
        self.assertEqual(result, expected)

    def test_permute(self):
        num_list = [1, 2, 3]
        result = recursion.permute(num_list)
        expected = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
        self.assertEqual(result, expected)


if __name__ == '__main__':
    suite = unittest.TestLoader().loadTestsFromTestCase(TestRecursion)
    unittest.TextTestRunner(verbosity=2).run(suite)

