#!/usr/bin/env python3

from flask import Flask, make_response, jsonify, request
from flask_migrate import Migrate
from models import db, User, Post, Comment
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.json.compact = False
migrate = Migrate(app, db)

db.init_app(app)


@app.route('/')
def index():
    return '<h1>Welcome to Bloghub</h1>'



if __name__ == '__main__':
    app.run(port=5555, debug=True)