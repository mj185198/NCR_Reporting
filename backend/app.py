from flask import Flask,jsonify 
from flask_cors import CORS
import pandas as pd
import sqlite3 as sq

app=Flask(__name__)
CORS(app)
conn = sq.connect('results.db',check_same_thread=False)
curs = conn.cursor()

# Creating Total data
curs.execute("create table if not exists totalresults" +"(Id integer, Test_Execution_Id text, Organization text, PI real, Solution_Stack text, SRT text, Sprint text, Total_Test_Cases integer, Total_Test_Passed integer, Total_Test_Failed integer, Stable_In_Sprint integer, Stable_In_PI integer, Time_Stamp text, Start_Time text, End_Time text, Elapsed text, Path text, Lab text, Solution text)")
stat = pd.read_csv("R&D_data.csv", sep=",")
stat.to_sql('totalresults', conn, if_exists='replace', index=False)

# Creating tag results
curs.execute("create table if not exists tagresults" + "(Id integer, Report_Id integer, Total_Test_Cases integer, Total_Test_Passed integer, Total_Test_Failed integer, Tag_Name text, Time_Stamp text)") 
tag_stat = pd.read_csv("R&D_tagData.csv", sep=",") 
tag_stat.to_sql('tagresults', conn, if_exists='replace', index=False) 

# Creating Suite results
curs.execute("create table if not exists suiteresults" + "(Total_Test_Cases integer, Total_Test_Passed integer, Total_Test_Failed integer, Suite_Name text, Time_Stamp text)") 
suite_stat = pd.read_csv("R&D_suiteData.csv", sep=",") 
suite_stat.to_sql('suiteresults', conn, if_exists='replace', index=False) 

@app.route("/totalstat")
def total_stat():
    res = pd.read_sql_query("select ID,Solution_Stack,Sprint,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from totalresults", conn)
    result = res.to_json(orient='records')
    return result

@app.route("/tagstat") 
def tag_stat(): 
    curs = conn.cursor() 
    res = pd.read_sql_query("select * from tagresults", conn) 
    result1 = res.to_json(orient = 'records') 
    return result1

@app.route("/suitestat") 
def suite_stat(): 
    curs = conn.cursor() 
    res2 = pd.read_sql_query("select * from suiteresults", conn) 
    result2 = res2.to_json(orient = 'records') 
    return result2

if __name__=="__main__":
    app.run(debug=True)
