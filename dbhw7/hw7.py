from argparse import ArgumentParser
from statistics import mean

from neo4j import GraphDatabase

# NOTE: you need to create a full text search index before we can query for keywords
# CALL db.index.fulltext.createNodeIndex("movieTextIndex",["Movie"],["title", "year"])

# global constants
EXIT_COMMAND = "exit"
SEARCH_COMMAND = "search"
RECOMMENDATION_COMMAND = "recommendation"
RATE_COMMAND = "rate"
MAIN_COMMANDS = [EXIT_COMMAND, SEARCH_COMMAND, RECOMMENDATION_COMMAND, RATE_COMMAND]
HELP_STRING = f"{EXIT_COMMAND} - will exit this program\n{SEARCH_COMMAND} - will perform a keyword search for movies\n{RECOMMENDATION_COMMAND} - will give you your top 5 recommendations\n{RATE_COMMAND} - will allow you to rate a new movie"


def print_invalid():
    print("INVALID INPUT. Try again:")


def my_prompt(text: str, valid_options: list = None):

    lines = text.split("\n")
    longest = max([len(l) for l in lines])

    value = None
    while value is None:

        print("#" * longest)
        for line in lines:
            print(line)

        if valid_options:
            print()
            print("Options:")
            for i, option in enumerate(valid_options):
                print(f"> {option}")
            print()
        print("#" * longest)
        value = input("=> ")

        if value == "":
            value = None

        if valid_options and value is not None:
            if value.lower() not in valid_options:
                value = None

        if value is None:
            print_invalid()

    print()
    return value


def main_menu():
    main_prompt = f"MAIN MENU:\n{HELP_STRING}"
    return my_prompt(main_prompt, MAIN_COMMANDS)


def print_movie_data(data, current_user):
    if not data:
        print("NO MATCHES")

    for movie in data:
        avg_rating = mean([float(a["rating"]) for a in movie["ratings"]])
        user_has_seen_movie = str(current_user) in [
            str(rating["user_id"]) for rating in movie["ratings"]
        ]

        print(f"Title:\t\t{movie['title']}")
        print(f"Genres:\t\t{', '.join(movie['genres'])}")
        print(f"Score:\t\t{float(movie['score']):.3f}")
        print(f"Rating:\t\t{avg_rating:.3f}")
        if user_has_seen_movie:
            user_rating = [
                pair["rating"]
                for pair in movie["ratings"]
                if str(pair["user_id"]) == str(current_user)
            ]
            print(f"Your Rating:\t{float(user_rating[0]):.3f}")
        print()


def print_recos(recos):
    for reco in recos:
        print(f"Title:\t\t{reco['title']}")
        print(f"ID:\t\t{reco['movie_id']}")
        print(f"Rating:\t\t{float(reco['rating']):.3f}")
        print(f"N Ratings:\t{reco['n_ratings']}")
        print()


class MovieDB(object):
    def __init__(self, uri, username, password):
        self.__uri = uri
        self.__username = username
        self.__password = password
        self.driver = GraphDatabase.driver(
            self.__uri, auth=(self.__username, self.__password), encrypted=False
        )

    def get_movies_by_keywords(self, keywords: str):
        movies = []
        with self.driver.session() as session:
            result = session.run(
                'CALL db.index.fulltext.queryNodes("movieTextIndex", $keywords) YIELD node, score RETURN node.movieId as mid, node.title as title, score',
                keywords=keywords,
            )
            for movie_record in result:
                # get general info
                movie_data = {
                    "movie_id": movie_record["mid"],
                    "title": movie_record["title"],
                    "score": movie_record["score"],
                }

                # get ratings data
                movie_ratings = session.run(
                    "MATCH (:Movie {movieId: $movieid})<-[r:RATED]-(u:User) RETURN r.rating AS rating, u.userId AS user_id",
                    movieid=movie_record["mid"],
                )

                user_ratings = []
                for rating_record in movie_ratings:
                    user_ratings.append(
                        {
                            "user_id": rating_record["user_id"],
                            "rating": rating_record["rating"],
                        }
                    )
                movie_data["ratings"] = user_ratings

                # get genere data
                movie_genres = session.run(
                    "MATCH (m:Movie {movieId: $movieid})-[:IN_GENRE]->(g:Genre) RETURN COLLECT(g.name) as names",
                    movieid=movie_record["mid"],
                )
                movie_data["genres"] = movie_genres.single()["names"]
                movies.append(movie_data)

        return movies

    def get_user_by_id(self, user_id: int):
        user = {}
        with self.driver.session() as sess:
            result = sess.run(
                "MATCH (u:User) WHERE u.userId = $userid RETURN u", userid=user_id
            )
            res = result.single()[0]
            user["user_id"] = res["userId"]
            if "name" in res:
                user["name"] = res["name"]

        return user

    def add_name_to_user(self, user_id: int, name: str):
        with self.driver.session() as sess:
            result = sess.run(
                "MATCH (u:User { userId: $userid }) SET u.name = $name RETURN u.userId AS uid, u.name AS name",
                userid=user_id,
                name=name,
            )
        return self.get_user_by_id(user_id)

    def get_topj_recos(self, userid: int, j=5):
        recos = []
        with self.driver.session() as sess:
            result = sess.run(
                "MATCH   (u:User {userId: $userid})-[gp:GENRE_PREF]->(g:Genre)<-[ig:IN_GENRE]-(m:Movie)<-[r:RATED]-(u2:User) WHERE   NOT((u)-[:RATED]->(m)) RETURN  max(gp.preference) AS pref, COUNT(r) AS nRatings, AVG(r.rating) as movieRating, m.title AS title, m.movieId AS mid ORDER BY pref DESC, movieRating DESC LIMIT $j",
                userid=userid,
                j=j,
            )

            for record in result:
                recos.append(
                    {
                        "movie_id": record["mid"],
                        "title": record["title"],
                        "rating": record["movieRating"],
                        "n_ratings": record["nRatings"],
                    }
                )

        return recos

    def rate_movie(self, user_id, movie_id, rating):
        command_str = f"MATCH (u:User {{userId: {user_id}}}), (m:Movie {{movieId: {movie_id}}}) MERGE (u)-[r:RATED {{rating: {rating}}}]->(m) RETURN u, r, m"
        with self.driver.session() as sess:
            result = sess.run(command_str)

    def close(self):
        self.driver.close()


if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        "--uri", default="neo4j://localhost:7687", help="URI of neo4j database"
    )
    parser.add_argument("--username", default="neo4j")
    parser.add_argument("--password", default="neo4j")
    args = parser.parse_args()

    movie_db = MovieDB(args.uri, args.username, args.password)

    # get user
    valid_userid = False
    user_id = None
    while not valid_userid:
        user_id = my_prompt("Please enter your user_id (1-600)")
        try:
            user_id = int(user_id)
            if user_id < 1 or user_id > 600:
                raise ValueError("Invalid range")
            valid_userid = True
        except ValueError as _:
            print_invalid()

    user = movie_db.get_user_by_id(user_id)

    # add name to db if one does not exist
    if not "name" in user:
        name = my_prompt("Please enter a username")
        user = movie_db.add_name_to_user(user_id, name)

    # greet user
    print(f"WELCOME, {user['name']} (userId:{user_id})!")

    # main loop
    exit_flag = False
    while not exit_flag:
        command = main_menu()
        if command == EXIT_COMMAND:
            exit_flag = True

        elif command == SEARCH_COMMAND:
            keywords = my_prompt(
                "Please enter keywords to search for (space separated)"
            )
            movie_data = movie_db.get_movies_by_keywords(keywords)
            print_movie_data(
                movie_data, user_id
            )  # one off -- just to keep this section clean

        elif command == RECOMMENDATION_COMMAND:
            recos = movie_db.get_topj_recos(user_id)
            print_recos(recos)  # one off - just to keep this section clean

        elif command == RATE_COMMAND:
            movie_id = my_prompt("Enter a movidId to rate")
            rating = my_prompt(
                f"What is your rating for movie ({movie_id})?",
                ["1", "2", "3", "4", "5"],
            )
            movie_db.rate_movie(user_id, movie_id, rating)

        else:
            raise ValueError("IMPOSSIBLE STATE HIT check my_prompt method for errors")

    print("Goodbye!")
    movie_db.close()
