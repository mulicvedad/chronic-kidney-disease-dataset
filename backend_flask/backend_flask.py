from flask import Flask
from flask import jsonify
from flask_cors import CORS
import os
import csv
import data.arff_to_csv

app = Flask(__name__)
CORS(app)

# next line is NOT needed when running from command line or terminal
os.chdir('D:\ETF\Master\II semestar - MoE\Biomedicinski signali i sistemi\Seminarski by Bega & Creda\source code\\backend_flask')
files = [csv for csv in os.listdir('.\data') if csv.endswith('.csv')]
if len(files) == 0:
    data.arff_to_csv.main()

csv_file = 'data\chronic_kidney_disease.csv'
contents = []   # list of dictionaries
with open(csv_file, 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        contents.append(row)


@app.route('/percentage-by-ages')
def percentage_by_ages():
    return jsonify(_percetage_by_ages())


def _percetage_by_ages():
    # index of this list represents age interval (index 0 represents 0-9, index 1 represents 10-19 ...)
    participants = [0] * 10
    num_records = len(contents)
    for i in range(num_records):
        # double quotemarks are needed because of the way DictReader generates keys for dictionary
        age = contents[i]["'age'"]
        if age != '?':
            age = int(age)
            interval = int(age / 10)
            participants[interval] += 1
    return participants


@app.route('/main')
def main_data():
    return jsonify(_main_data())


def _main_data():
    healty = [0] * 5
    unhealthy = [0] * 5
    for record in contents:
        if record["'sc'"] != '?' and record["'class'"] != '?':
            curr_val = float(record["'sc'"])
            list_index = index_by_concentration(curr_val)
            if record["'class'"] == 'ckd':
                unhealthy[list_index] += 1
            else:
                healty[list_index] += 1
    return [healty, unhealthy]


def index_by_concentration(concentration):
    if concentration < 5.0:
        return 0
    elif concentration < 10.0:
        return 1
    elif concentration < 15.0:
        return 2
    elif concentration < 20.0:
        return 3
    else:
        return 4


if __name__ == '__main__':
    app.run()
