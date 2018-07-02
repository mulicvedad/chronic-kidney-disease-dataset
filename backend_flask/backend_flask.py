from flask import Flask
from flask import jsonify
from flask_cors import CORS
import os
import csv
import data.arff_to_csv

app = Flask(__name__)
CORS(app)

# next line is NOT needed when running from command line or terminal
# os.chdir('D:\ETF\Master\II semestar - MoE\Biomedicinski signali i sistemi\Seminarski by Bega & Creda\source code\\backend_flask')
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
    healty = [0] * 4
    unhealthy = [0] * 4
    for record in contents:
        if record["'sc'"] != '?' and record["'class'"] != '?':
            curr_val = float(record["'sc'"])
            list_index = index_by_concentration(curr_val)
            if record["'class'"] == 'ckd':
                print(curr_val)
                unhealthy[list_index] += 1
            else:
                healty[list_index] += 1
    return [healty, unhealthy]


def index_by_concentration(concentration):
    if concentration < 1:
        return 0
    elif concentration < 1.5:
        return 1
    elif concentration < 2.0:
        return 2
    else :
        return 3

@app.route('/creatinine-by-ages')
def creatinine_by_ages():
    return jsonify(_substance_by_ages("'sc'"))

@app.route('/hemoglobin-by-ages')
def hemoglobin_by_ages():
    return jsonify(_substance_by_ages("'hemo'"))

def _substance_by_ages(substance):
    avg_substance_conc = [0] * 10
    participants = [0] * 10
    num_records = len(contents)
    for i in range(num_records):
        # double quotemarks are needed because of the way DictReader generates keys for dictionary
        age = contents[i]["'age'"]
        substance_conc = contents[i][substance]
        if age != '?' and substance_conc != '?':
            age = int(age)
            substance_conc = float(substance_conc)
            interval = int(age / 10)
            participants[interval] += 1
            avg_substance_conc[interval] += substance_conc
    for i in range(len(avg_substance_conc)):
        avg_substance_conc[i] = round(avg_substance_conc[i] / participants[i],2) #round up to two decimals
    return avg_substance_conc

@app.route('/diabetes-and-ill')
def probability_ill_diabetes():
    return jsonify(_probability_ill_diabetes())

def _probability_ill_diabetes():
    ill_participants = [0] * 10
    participants_diabetes = [0] * 10
    probability_ill_diabetes = [0] * 10
    num_records = len(contents)
    for i in range(num_records):
        age = contents[i]["'age'"]
        if age != '?' and contents[i]["'dm'"] == 'yes':
            age = int(age)
            interval = int(age / 10)
            participants_diabetes[interval] += 1
            if contents[i]["'class'"] == 'ckd':
                ill_participants[interval] +=1
    for i in range(len(probability_ill_diabetes)):
        if participants_diabetes[i] > 0:
            probability_ill_diabetes[i] = 100 * round(float(ill_participants[i])/float(participants_diabetes[i]),4)
    return probability_ill_diabetes
    
@app.route('/appetite-and-creatinine')
def probability_appetite_creatinine_conc():
    return jsonify(_probability_condition_substance_conc("'appet'","good","'sc'",10,1))

@app.route('/ill-and-hemoglobin')
def probability_ill_creatinine_conc():
    return jsonify(_probability_condition_substance_conc("'class'","ckd","'hemo'",10,2))


def _probability_condition_substance_conc(condition, condition_case, substance,num_intervals,offset):
    participants = [0] * num_intervals
    participants_with_condition = [0] * num_intervals
    probability = [0] * num_intervals
    num_records = len(contents)
    for i in range(num_records):
        # double quotemarks are needed because of the way DictReader generates keys for dictionary
        substance_value = contents[i][substance]
        if substance_value != '?':
            substance_value = float(substance_value)
            interval = int(substance_value) / offset
            if interval >= 10:
                interval=9
            participants[int(interval)] += 1
            if contents[i][condition] == condition_case:
                participants_with_condition[int(interval)] +=1
    print(participants)
    print(participants_with_condition)
    for i in range(len(probability)):
        if participants[i] > 0:
            probability[i] = 100 * round(float(participants_with_condition[i])/float(participants[i]),4)
    #for intervals with larger sc the number of participants is drasticly reduced
    return probability

@app.route('/hypertension')     # pie chart data
def hypertension():
    return jsonify(_ckd_percentage('\'htn\'', 'yes', 'ckd'))


@app.route('/anemia')   # pie chart data
def anemia():
    return jsonify(_ckd_percentage('\'ane\'', 'yes', 'ckd'))




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

if __name__ == '__main__':
    app.run()
