# Dependencies
import os
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Flask
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/classicrock.sqlite"
db = SQLAlchemy(app)

Base = automap_base()
Base.prepare(db.engine, reflect=True)

Rocks = Base.classes.rock_data_id
# Songs=Base.classes.songdata

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def coords():
    stmt = db.session.query(Rocks).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    new_df = df.groupby(['CITY', 'LAT', 'LON', 'CALLSIGN']).count()
    new_df = new_df.reset_index()

    cities = list(new_df['CITY'])
    lats = list(new_df['LAT'])
    lons = list(new_df['LON'])
    calls = list(new_df['CALLSIGN'])

    data = []
    for i in range(len(cities)):
        city_dict = {}
        city_dict['City'] = cities[i]
        city_dict['Lat'] = lats[i]
        city_dict['Lon'] = lons[i]
        city_dict['Callsign'] = calls[i]
        data.append(city_dict)

    return jsonify(data)





@app.route("/songs/<artist>")
def sngcount(artist):

   stmt = db.session.query(Rocks).statement
   df = pd.read_sql_query(stmt, db.session.bind)

   df_artist = df.loc[df["ARTISTCLEAN"]==artist]


   print(df_artist)



   return jsonify(df_artist.to_dict(orient="record"))
   
@app.route("/artistnames")
def artistnames():

   results = db.session.query(Rocks.ARTISTCLEAN).distinct().all()
#    df = pd.read_sql_query(stmt, db.session.bind)

#    df_artist = df.loc[df["ARTISTCLEAN"]==artist]
   artistList = []
   for result in results:
        artistList.append(result[0])
   return jsonify(artistList)


#    print(stmt)



   return jsonify(stmt)   
    



if __name__ == "__main__":
    app.run(port=5001)