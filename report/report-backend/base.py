from unicodedata import name
from flask import Flask,jsonify,request,render_template,redirect,url_for
from flask_cors import CORS
import pandas as pd
import json

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
conn1 = pyodbc.connect('DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
# conn = sq.connect('results.db',check_same_thread=False)
# cur = conn.cursor()



@app.route("/release", methods=['POST'])
def release():
    try:
        cur = conn.cursor()
        Organization = str(request.json["org"])
        SRT = str(request.json["srt"])
        PI = str(request.json["pi"])
        Sprint = str(request.json["sprint"])
        Solution = str(request.json["sol"])
        SolStack = str(request.json["solstack"])
        # Time_Stamp = str(request.json["date"]).replace('-','')
        # Organization = str(request.form["Organization8"])
        # SRT = str(request.form["SRT"])
        # PI = str(request.form["PI"])
        # Sprint = str(request.form["Sprint"])
        # Solution = str(request.form["Solution"])
        res = pd.read_sql_query("select Id,Test_Execution_Id,PI,Sprint,Solution_Stack,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from dbo.Report where Organization = '""" + Organization +"""' and SRT = '""" + SRT +"""' and PI = """ + PI +""" and Sprint = '""" + Sprint +"""' and Solution = '""" + Solution +"""'and Solution_Stack = '""" + SolStack +"""' """ ,conn)
        result = res.to_json(orient = 'records')
        # print("Result length : "+format(len(result)))
        # if len(result) > 0:
        cur.close()
        return result   
        # else:
        #     return "Empty data"
    except Exception as e:
        return str(e)
    # global dummy 
    # dummy = result
    #return "200"
    #return render_template('C:\Users\mj185198\Downloads\NCR Intelligent Test Automation\front-end\src\Components\TotalGraph.js', data=result)
    #return redirect(url_for('.getrelease',data=result))
    #return "empty"
    # #return redirect(url_for('http://127.0.0.1:5000/release1',data=res))
    # #render_template("front-end\src\Components\App.js",datas =result)


    
@app.route("/tag", methods =['POST'])
def tag():
    try:
        cur = conn.cursor()
        Organization = str(request.json["org"])
        SRT = str(request.json["srt"])
        PI = str(request.json["pi"])
        Sprint = str(request.json["sprint"])
        Tag_Name = str(request.json["tagname"])
        Solution = str(request.json["sol"])
        Solution_Stack = str(request.json["solStack"])
        # Time_Stamp = str(request.json["date"]).replace('-','')
        res = pd.read_sql_query("SELECT t.Report_Id,r.Solution_Stack,r.PI,r.Sprint,t.Tag_Name,t.Total_Test_Cases,t.Total_Test_Passed,t.Total_Test_Failed,t.Time_Stamp,r.Test_Execution_Id from dbo.Report r,dbo.Statistics_By_Tag t where r.Time_Stamp=t.Time_Stamp and r.Organization = '""" + Organization +"""' and r.SRT = '""" + SRT +"""' and r.PI = """ + PI +""" and Sprint = '""" + Sprint +"""' and t.Tag_Name = '""" + Tag_Name +"""' and r.Solution = '""" + Solution +"""' and r.Solution_Stack = '""" +Solution_Stack +"""'""" ,conn)
        result = res.to_json(orient = 'records')
        cur.close()
        return result
    except :
        cur.close()
        return "invalid request"

@app.route("/totalstat")
def total_stat():
    res = pd.read_sql_query("select Id,Solution_Stack,Sprint,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from totalresults", conn)  
    result = res.to_json(orient='records')  
    return result

@app.route("/compare", methods = ['POST'])
def compare():
    # cur = conn.cursor()
    Organization = str(request.json["org"])
    SRT = str(request.json["srt"])
    PI = str(request.json["pi"])
    Solution = str(request.json["sol"])

    res = pd.read_sql_query("select PI,Sprint,Solution,sum(Total_Test_Cases) as total, sum(Total_Test_Passed) as totalPass, sum(Total_Test_Failed) as totalFail from dbo.Report where Organization = '""" + Organization +"""' and SRT = '""" + SRT +"""' and PI = """ + PI +"""  and Solution = '""" + Solution +"""'  group by Sprint,PI,Solution""",conn)
    result = res.to_json(orient = 'records')
    return result



@app.route("/tagcompare", methods = ['POST'])
def tagcompare():
    # cur = conn.cursor()
    Organization = str(request.json["org"])
    SRT = str(request.json["srt"])
    PI = str(request.json["pi"])
    Tag_Name = str(request.json["tagname"])
    res = pd.read_sql_query("SELECT r.PI,r.Sprint,t.Tag_Name,sum(t.Total_Test_Cases) as total, sum(t.Total_Test_Passed) as totalPass, sum(t.Total_Test_Failed) as totalFail from dbo.Report r,dbo.Statistics_By_Tag t where r.Time_Stamp=t.Time_Stamp and r.Organization = '""" + Organization +"""' and r.SRT = '""" + SRT +"""' and r.PI = """ + PI +""" and t.Tag_Name = '""" + Tag_Name +"""' group by r.PI,r.Sprint,t.Tag_Name """,conn)
    result = res.to_json(orient = 'records')
    return result

@app.route("/getPI")
def getPI():
    pi_data = pd.read_sql_query("select distinct PI from dbo.Report where PI != ' ' order by PI", conn)
    return pi_data.to_json(orient= "values")

@app.route("/getOrg")
def getOrg():
    org = pd.read_sql_query("select distinct Organization from dbo.Report where Organization != ' ' order by Organization", conn)
    return org.to_json(orient = 'values')

@app.route("/getSol")
def getSol():
    sol = pd.read_sql_query("select distinct Solution from dbo.Report where Solution != ' ' order by Solution", conn)
    return sol.to_json(orient = 'values')

@app.route("/getSprint")
def getSprint():
    sprint = pd.read_sql_query("select distinct Sprint from dbo.Report where Sprint != ' ' order by Sprint", conn)
    return sprint.to_json(orient = 'values')

@app.route("/getSRT")
def getSRT():
    srt = pd.read_sql_query("select distinct SRT from dbo.Report where SRT != ' ' order by SRT", conn)
    return srt.to_json(orient = 'values')

@app.route("/getSolutionStack")
def getSolutionStack():
    solStack = pd.read_sql_query("select distinct Solution_Stack from dbo.Report where Solution_Stack != ' ' order by Solution_Stack", conn)
    return solStack.to_json(orient = 'values')

@app.route("/addNote", methods = ['POST','PUT'])
def addNote():
    #db connect and push
    #if notes_query == "[{"count":0}]" then insert into , else update
    cur = conn.cursor()
    filter = str(request.json["filter"]).replace(' ','')
    note = str(request.json["note"])
    # count_query = pd.read_sql_query("select count(Note) as count from dbo.Notes where Filter_Name = '""" + filter + """'""", conn)
    count_query = cur.execute("select count(Note) from dbo.Notes where Filter_Name = ?",(filter,))
    # count =  int(count_query.to_csv()[10])
    count = int(cur.fetchone()[0])
    # return str(count)
    if count > 0:
        #there exists a record, update it
        # update_query = pd.read_sql_query("SET ANSI_WARNINGS OFF;SET NOCOUNT ON;update dbo.Notes set Note = '"""+note+"""' where Filter_Name = '"""+filter+"""'""", conn)
        cur.execute("update dbo.Notes set Note = ? where Filter_Name = ?",(note,filter,))
        
    else:
        #there does not exist a record, create a new record
        # add_note_query = pd.read_sql_query("SET ANSI_WARNINGS OFF;SET NOCOUNT ON;insert into dbo.Notes values('"""+filter+"""','"""+note+"""')""", conn)
        cur.execute("insert into dbo.Notes values(?,?)",(filter,note,))
        
    # query = pd.read_sql_query("SET ANSI_WARNINGS OFF;SET NOCOUNT ON;select Note from dbo.Notes where Filter_Name = '""" + filter + """'""", conn)
    cur.execute("select Note from dbo.Notes where Filter_Name = ?",(filter,))
    query = cur.fetchone()[0]
    conn.commit()
    cur.close()
    return jsonify(query)
    
    # notes_query = pd.read_sql_query("select Note as count from dbo.Notes where Filter_Name = '""" + filter + """'""", conn)
    # return notes_query.to_json(orient='records')
    # elif notes_query.to_json()["Note"] == "":

@app.route("/getNote", methods = ['POST'])
def getNote():
    cur = conn1.cursor()
    filterval = str(request.json["filter"]).replace(' ','')
    #check if a note exists
    # notes_query = pd.read_sql_query("insert into dbo.Notes values('"""+filterval+"""','"""+note+"""'""", conn)
    cur.execute("select Note from dbo.Notes where Filter_Name = ?",(filterval,))
    try:
        query = cur.fetchone()[0]
        cur.close()
    except:
        query = " "
        cur.close()
    return jsonify(query)

@app.route("/getTagName")
def getTagName():
    tags = pd.read_sql_query("select distinct Tag_Name from dbo.Statistics_By_Tag where Tag_Name != ' ' order by Tag_Name", conn)
    return tags.to_json(orient = 'values')
    






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