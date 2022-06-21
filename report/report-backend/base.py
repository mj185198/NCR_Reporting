from unicodedata import name
from flask import Flask,jsonify,request,render_template,redirect,url_for
from flask_cors import CORS
import pandas as pd
import json
import requests
import pickle
import pyodbc
import sqlite3 as sq
app=Flask(__name__)
CORS(app,supports_credentials=True)


server = '153.78.66.172'
database = 'Test_Results_Archiving'
username = 'ae01tm20'
password = 'SIT_SST12345'
conn = pyodbc.connect('DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
# conn = sq.connect('results.db',check_same_thread=False)



@app.route("/release", methods=['POST'])
def release():
    cur = conn.cursor()
    Organization = str(request.json["org"])
    SRT = str(request.json["srt"])
    PI = str(request.json["pi"])
    Sprint = str(request.json["sprint"])
    Solution = str(request.json["sol"])
    # Organization = str(request.form["Organization"])
    # SRT = str(request.form["SRT"])
    # PI = str(request.form["PI"])
    # Sprint = str(request.form["Sprint"])
    # Solution = str(request.form["Solution"])
    res = pd.read_sql_query("select Id,Solution_Stack,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from dbo.Report where Organization = '""" + Organization +"""' and SRT = '""" + SRT +"""' and PI = """ + PI +""" and Sprint = '""" + Sprint +"""' and Solution = '""" + Solution +"""' """,conn)
    result = res.to_json(orient = 'records')
    return result
    # global dummy 
    # dummy = result
    #return "200"
    #return render_template('C:\Users\mj185198\Downloads\NCR Intelligent Test Automation\front-end\src\Components\TotalGraph.js', data=result)
    #return redirect(url_for('.getrelease',data=result))
    #return "empty"
    # #return redirect(url_for('http://127.0.0.1:5000/release1',data=res))
    # #render_template("front-end\src\Components\App.js",datas =result)

@app.route("/getrelease")
def getrelease():
    #global dummy
    #res = request.args['data']
    return "ij"





    
@app.route("/tag", methods =['POST'])
def tag():
    cur = conn.cursor()
    Organization = str(request.json["org"])
    SRT = str(request.json["srt"])
    PI = str(request.json["pi"])
    Tag_Name = str(request.json["tagname"])
    Solution = str(request.json["sol"])
    res = pd.read_sql_query("SELECT t.Report_Id,t.Tag_Name,r.Sprint,t.Total_Test_Cases,t.Total_Test_Passed,t.Total_Test_Failed,t.Time_Stamp from dbo.Report r,dbo.Statistics_By_Tag t where r.Time_Stamp=t.Time_Stamp and Organization = '""" + Organization +"""' and SRT = '""" + SRT +"""' and PI = """ + PI +""" and Tag_Name = '""" + Tag_Name +"""' and Solution = '""" + Solution +"""' """,conn)
    result = res.to_json(orient = 'records')
    return result


@app.route("/totalstat")
def total_stat():
    res = pd.read_sql_query("select Id,Solution_Stack,Sprint,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from totalresults", conn)  
    result = res.to_json(orient='records')  
    return result


@app.route("/tagstat")
def tag_stat():
    res1 = pd.read_sql_query("select * from dbo.Statistics_By_Tag", conn)
    result1 = res1.to_json(orient = 'records')
    return result1


@app.route("/suitestat")
def suite_stat():
    res2 = pd.read_sql_query("select * from dbo.Statistics_By_Suite", conn)
    result2 = res2.to_json(orient = 'records')
    return result2


@app.route("/suitegraph")
def suite_graph():
    res3 = pd.read_sql_query("select * from suiteresults", conn)
    result3 = res3.to_json()
    return result3



if __name__=="__main__":
    app.run(debug=True)
















"""
@app.route("/totalstat")
def total_stat():
    stat = pd.read_csv("C:/Users/mj185198/Downloads/R&D_data.csv", sep=",")
    print(stat.dtypes)
    test_data = stat.to_json(orient='split')
    return test_data
"""







"""
    result = curs.execute('select ID,Solution_Stack,Sprint,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from totalresults')
    rows = curs.fetchall()
    result = {"Id":[],"Solution_Stack":[],"Sprint":[],"Total_Test_Cases":[],"Total_Test_Passed":[],"Total_Test_Failed":[],"Time_Stamp":[]}
    for row in rows:
        result["Id"].append({row['Id']})
        result["Solution_Stack"].append({row['Solution_Stack']})
        result["Sprint"].append({row['Sprint']})
        result["Total_Test_Cases"].append({row['Total_Test_Cases']})
        result["Total_Test_Passed"].append({row['Total_Test_Passed']})
        result["Total_Test_Failed"].append({row['Total_Test_Failed']})
        result["Time_Stamp"].append({row['Time_Stamp']})
    """