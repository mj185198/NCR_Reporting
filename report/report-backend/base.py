from flask import Flask,jsonify
from flask_cors import CORS
import pandas as pd
import sqlite3 as sq

app=Flask(__name__)
CORS(app)

conn = sq.connect('results.db',check_same_thread=False)


@app.route("/totalstat")
def total_stat():
    curs = conn.cursor()
    curs.execute("create table if not exists totalresults" +
                 "(Id integer, Test_Execution_Id text, Organization text, PI real, Solution_Stack text, SRT text, Sprint text, Total_Test_Cases integer, Total_Test_Passed integer, Total_Test_Failed integer, Stable_In_Sprint integer, Stable_In_PI integer, Time_Stamp text, Start_Time text, End_Time text, Elapsed text, Path text, Lab text, Solution text)")
    stat = pd.read_csv("C:/Users/mj185198/Downloads/R&D_data.csv", sep=",")
    stat.to_sql('totalresults', conn, if_exists='replace', index=False)
    res = pd.read_sql_query("select ID,Solution_Stack,Sprint,Total_Test_Cases,Total_Test_Passed,Total_Test_Failed,Time_Stamp from totalresults", conn)
    result = res.to_json(orient='records')
    return result


if __name__=="__main__":
    app.run(debug=True)








"""
@app.route('/totalstat')
def total_stat():
    curs = conn.cursor()
    curs.execute("create table if not exists totalresults" +
                 "(Id integer, Test_Execution_Id text, Organization text,PI real, Solution_Stack text, SRT text, " +
                 "Sprint text, Total_Test_Cases integer, Total_Test_Passed integer, Total_Test_Failed integer, " +
                 "Stable_In_Sprint integer, Stable_In_PI integer, Time_Stamp text, Start_Time text, End_Time text, "+
                 "Elapsed text, Path text, Lab text, Solution text)")
    stat = pd.read_csv("C:/Users/mj185198/Downloads/R&D_data.csv", sep=",")
    stat.to_sql('totalresults', conn, if_exists='replace', index=False)
    curs.execute('select * from totalresults')
    records = curs.fetchall()
    for row in records:
        print(row)
    conn.close()
    return


"""



















"""
def home(path):


    suite_stat = pd.read_csv("C:/Users/mj185198/Downloads/NCR Intelligent Test Automation/Suite wise data.txt", sep=",",
                             header=None, names=["Suite", "Total", "Pass", "Fail"])

    temp_tag = tag_stat.copy()
    temp_tag["sum"] = temp_tag.sum(axis=1).div(2)
    temp = temp_tag.loc[:, "Total":"Fail"].div(temp_tag["sum"], axis=0)
    tag_norm = pd.concat([temp_tag.iloc[:, 0], temp], axis=1, join='inner')

    temp_suite = suite_stat.copy()
    temp_suite["sum"] = temp_suite.sum(axis=1).div(2)
    temp1 = temp_suite.loc[:, "Total":"Fail"].div(temp_suite["sum"], axis=0)
    suite_norm = pd.concat([temp_suite.iloc[:, 0], temp1], axis=1, join='inner')
    return render_template('home.html') # send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)


"""