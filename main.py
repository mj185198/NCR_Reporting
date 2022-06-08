from flask import Flask, request, render_template, send_from_directory
import pandas as pd

app = Flask(__name__)

stat = pd.read_csv("C:/Users/mj185198/Downloads/R&D_data.csv", sep=",")
print(stat)

@app.route("/",methods=['post'])
def index(obj):
    pass
