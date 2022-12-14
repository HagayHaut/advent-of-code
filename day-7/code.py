from collections import defaultdict
from functools import lru_cache
from pprint import pprint

with open("./day-7/input.txt") as f:
    blocks = ("\n" + f.read().strip()).split("\n$ ")[1:]

for block in blocks:
    print(block.split("\n"))
