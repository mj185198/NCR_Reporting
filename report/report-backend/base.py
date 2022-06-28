from unicodedata import name
from flask import Flask,jsonify,request,render_template,redirect,url_for
from flask_cors import CORS
import pandas as pd
import pyodbc

app=Flask(__name__)
CORS(app,supports_credentials=True)


server = '153.78.66.172'
database = 'Test_Results_Archiving'
username = 'ae01tm20'
password = 'SIT_SST12345'
conn = pyodbc.connect('DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)




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
        res = pd.read_sql_query("select Id,Test_Execution_Id,PI,Sprint,Solution_Stack,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from dbo.Report where Organization = '""" + Organization +"""' and SRT = '""" + SRT +"""' and PI = """ + PI +""" and Sprint = '""" + Sprint +"""' and Solution = '""" + Solution +"""'and Solution_Stack = '""" + SolStack +"""' """ ,conn)
        result = res.to_json(orient = 'records')
        return result   
    except :
        return "invalid response"


    
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
        # Time_Stamp = str(request.json["date"]).replace('-','')
        res = pd.read_sql_query("SELECT r.Id,t.Report_Id,r.Solution_Stack,r.PI,r.Sprint,t.Tag_Name,t.Total_Test_Cases,t.Total_Test_Passed,t.Total_Test_Failed,t.Time_Stamp,r.Test_Execution_Id from dbo.Report r,dbo.Statistics_By_Tag t where r.Time_Stamp=t.Time_Stamp and r.Organization = '""" + Organization +"""' and r.SRT = '""" + SRT +"""' and r.PI = """ + PI +""" and Sprint = '""" + Sprint +"""' and t.Tag_Name = '""" + Tag_Name +"""' and r.Solution = '""" + Solution +"""'  """,conn)
        result = res.to_json(orient = 'records')
        return result
    except :
        return "invalid request"


@app.route("/compare", methods = ['POST'])
def compare():
    cur = conn.cursor()
    Organization = str(request.json["org"])
    SRT = str(request.json["srt"])
    PI = str(request.json["pi"])
    Solution = str(request.json["sol"])
    res = pd.read_sql_query("select PI,Sprint,Solution,sum(Total_Test_Cases) as total, sum(Total_Test_Passed) as totalPass, sum(Total_Test_Failed) as totalFail from dbo.Report where Organization = '""" + Organization +"""' and SRT = '""" + SRT +"""' and PI = """ + PI +"""  and Solution = '""" + Solution +"""'  group by Sprint,PI,Solution""",conn)
    result = res.to_json(orient = 'records')
    return result



@app.route("/tagcompare", methods = ['POST'])
def tagcompare():
    cur = conn.cursor()
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




@app.route("/getTagName")
def getTagName():
    tags = pd.read_sql_query("select distinct Tag_Name from dbo.Statistics_By_Tag where Tag_Name != ' ' order by Tag_Name", conn)
    return tags.to_json(orient = 'values')
    






if __name__=="__main__":
    app.run(debug=True)















