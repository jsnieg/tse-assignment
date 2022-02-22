import json


def write_json(path, data):
    with open(path, "w") as fp:
        json.dump(data, fp, indent=4)
