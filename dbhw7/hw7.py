from neo4j import GraphDatabase
from argparse import ArgumentParser
from transactions import *


def print_invalid():
    print("INVALID INPUT. Try again:")


def my_prompt(text:str, valid_options:list=None):
    
    lines = text.split('\n')
    longest = max([len(l) for l in lines])

    value = None
    while value is None:

        print('#'*longest)
        for line in lines:
            print(line)

        if valid_options:
            print()
            print("Options:")
            for i, option in enumerate(valid_options):
                print(f"> {option}")
            print()
        print('#'*longest)
        value = input("=> ")

        if value == '':
            value = None

        if valid_options:
            if value.lower() not in valid_options:
                value = None
        
        if value is None:
            print_invalid()

    print()
    return value

def print_menu():
    pass

class MovieDB(object):
    def __init__(self, uri, username, password):
        self.__uri = uri
        self.__username = username
        self.__password = password
        self.database = GraphDatabase.driver(self.__uri, auth=(self.__username, self.__password))
    

    def get_user_by_id(self, id:int):
        pass


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("--uri", default="neo4j://localhost:7687", help="URI of neo4j database")
    parser.add_argument("--username", default="neo4j")
    parser.add_argument("--password", default="neo4j")
    args = parser.parse_args()

    movie_db = MovieDB(args.uri, args.username, args.password)

    valid_userid = False
    while not valid_userid:
        userid = my_prompt("Please enter your userid (1-600)")
        try:
            userid = int(userid)
            if userid < 1 or userid > 600:
                raise ValueError("Invalid range")
            # TODO: check userid exists -- doesn't matter if it has a name
            valid_userid = True
        except ValueError as _:
            print_invalid()




