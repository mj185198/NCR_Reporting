from flask import Flask, request, render_template, send_from_directory
import pandas as pd

app = Flask(__name__)

stat = pd.read_csv("C:/Users/mj185198/Downloads/R&D_data.csv", sep=",")
print(stat)

@app.route("/",methods=['post'])
def index(obj):
    pass
























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