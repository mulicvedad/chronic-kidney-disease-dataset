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


@app.route('/hypertension')     # pie chart data
def hypertension():
    return jsonify(_ckd_percentage('\'htn\'', 'yes', 'ckd'))


@app.route('/anemia')   # pie chart data
def anemia():
    return jsonify(_ckd_percentage('\'ane\'', 'yes', 'ckd'))


@app.route('/appetite')   # pie chart data
def apetite():
    return jsonify(_ckd_percentage('\'appet\'', 'poor', 'notckd'))


# Parameters: disease_mark ('htn', 'bp', 'rc'...), value( 'yes', 'no', 'good', 'poor' ...), ckd_value ('ckd' or 'notckd')
# Description: this function returns percentage of patients who satiesfy conditions/parameters
# Example: htn-no-ckd -> returns number of patients who are sick (ckd) and who don't have hypertension
def _ckd_percentage(disease_mark, value, ckd_value):  # maybe it is more suitable to say 'condition' than 'disease'
    num_positive = 0    # how many patients have condition with mark 'disease_mark'
    num_negative = 0    # for example disease_mark = 'htn' is for hypertension
    for record in contents:
        if record[disease_mark] != '?' and record["'class'"] == ckd_value:
            if record[disease_mark] == value:
                num_positive += 1
            else:
                num_negative += 1
    positive_percentage = float(num_positive * 100) / (num_positive + num_negative)
    positive_percentage = round(positive_percentage, 2)
    return positive_percentage


@app.route('/test')
def test():
    return 'test'


if __name__ == '__main__':
    app.run()
