import json
def print_persons(filename: str):
    with open(filename) as my_file:
        data = my_file.read()

    info = json.loads(data)
    #print(info)

    for person in info:
        s=""
        for hobby in person["hobbies"]:
            if s!="":
                s+=", "
            s+=hobby
        print(person["name"],person["age"],f"years ({s})")

#Peter Pythons 27 years (coding, knitting)
#Jean Javanese 24 years (coding, rock climbing, reading)
if __name__ == "__main__":
    print_persons("file1.json")
    