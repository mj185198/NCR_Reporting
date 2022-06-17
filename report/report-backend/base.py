from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask_cors import CORS
import pandas as pd
import json
import pickle
import eel
import pyodbc

app = Flask(__name__)
CORS(app)

server = '153.78.66.172'
database = 'Test_Results_Archiving'
username = 'ae01tm20'
password = 'SIT_SST12345'
conn = pyodbc.connect(
    'DRIVER={SQL Server};SERVER=' + server + ';DATABASE=' + database + ';UID=' + username + ';PWD=' + password)

# result = {}

@eel.expose
def filterData(Organization,SRT,PI,Sprint,Solution):
    res = pd.read_sql_query(
        "select Id,Solution_Stack,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from dbo.Report where Organization = '""" + Organization + """' and SRT = '""" + SRT + """' and PI = """ + PI + """ and Sprint = '""" + Sprint + """' and Solution = '""" + Solution + """' """,
        conn)
    return res.to_json(orient="records")
    #


@app.route("/release", methods=['POST','GET'])
def release():
    cur = conn.cursor()
    # Organization = str(request.json["org"])
    # SRT = str(request.json["srt"])
    # PI = str(request.json["pi"])
    # Sprint = str(request.json["sprint"])

    Solution = str(request.json["sol"])
    Organization = str(request.json["Organization"])
    SRT = str(request.json["SRT"])
    PI = str(request.json["PI"])
    Sprint = str(request.json["Sprint"])
    Solution = str(request.json["Solution"])
    res = pd.read_sql_query(
        "select Id,Solution_Stack,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from dbo.Report where Organization = '""" + Organization + """' and SRT = '""" + SRT + """' and PI = """ + PI + """ and Sprint = '""" + Sprint + """' and Solution = '""" + Solution + """' """,
        conn)
    # res = pd.read_sql_query(
    #     "select Id,Solution_Stack,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from dbo.Report where Organization = 'Banking Core' and SRT = 'EAB' and PI = 21.1 and Sprint = 'S3' and Solution = 'AE_NDCHOST' """,
    #     conn)
    # global result
    result = res.to_json(orient='records')
    #FUNC CALL
    return result
    # global dummy
    # dummy = result
    # return "200"
    # return render_template(
    #     'C:\Users\mj185198\Downloads\NCR Intelligent Test Automation\front-end\src\Components\TotalGraph.js',
    #     data=result)
    # return redirect(url_for('.getrelease',data=result))
    # return "empty"
    # #return redirect(url_for('http://127.0.0.1:5000/release1',data=res))
    # #render_template("front-end\src\Components\App.js",datas =result)


@app.route("/getrelease")
def getrelease():
    # global dummy
    # res = request.args['data']
    return result


@app.route("/tag", methods=['get', 'post'])
def tag():
    cur = conn.cursor()
    Report_Id = request.form["Report_Id"]
    sql = "select * from dbo.Tag_Statistics where Report_Id=?"
    res = pd.read_sql_query(sql, conn, params=[Report_Id])
    result = res.to_json(orient='records')
    print(result)
    return result


@app.route("/totalstat")
def total_stat():
    res = pd.read_sql_query(
        "select Id,Solution_Stack,Sprint,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from dbo.Report",
        conn)
    result = res.to_json(orient='records')
    return result


@app.route("/tagstat")
def tag_stat():
    res1 = pd.read_sql_query("select * from dbo.Statistics_By_Tag", conn)
    result1 = res1.to_json(orient='records')
    return result1


@app.route("/suitestat")
def suite_stat():
    res2 = pd.read_sql_query("select * from dbo.Statistics_By_Suite", conn)
    result2 = res2.to_json(orient='records')
    return result2


@app.route("/suitegraph")
def suite_graph():
    res3 = pd.read_sql_query("select * from suiteresults", conn)
    result3 = res3.to_json()
    return result3


if __name__ == "__main__":
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