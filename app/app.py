#!/usr/bin/env python3

from flask import Flask, make_response, jsonify, request, session, redirect, url_for
from sqlalchemy.exc import SQLAlchemyError
from flask_migrate import Migrate
from models import db, User, Post, Comment
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.json.compact = False
migrate = Migrate(app, db)

db.init_app(app)


# check if user has valid session
@app.before_request
def check_valid_user():
    if not request.endpoint in ['login', 'signup','/']:
        if not session.get('user'):
            return redirect(url_for('login'))
    


@app.route('/')
def index():
    return '<h1>Welcome to Bloghub</h1>'


@app.route('/posts', methods=['GET', 'POST', 'DELETE', 'PUT'])
def get_posts():
    posts = []
    if request.method == 'GET':
        for post in Post.query.all():
            post_dict = {
                "id": post.id,
                "user_id": post.user_id,
                "title": post.title,
                "body": post.body,
                "created_at": post.created_at,
                "user": {
                    "id": post.user.id,
                    "username": post.user.username,
                },
            }
            posts.append(post_dict)
        response = make_response(
            jsonify(posts),
            200
        )
        return response
    elif request.method == 'POST':
        try:
            data = request.get_json()
            if not all(key in data for key in ['user_id', 'title', 'category', 'body']):
                return jsonify({"error": "Invalid data"}), 400
            post = Post(
                user_id=data['user_id'],
                title=data['title'],
                category=data['category'],
                body=data['body']
            )
            
            db.session.add(post)
            db.session.commit()
            response = make_response(
                jsonify({
                    "message": "Post created"
                }),
                201
            )
            return response
        except SQLAlchemyError as e:
            db.session.rollback()
            error_message = "Database error: " + str(e)
            return jsonify({"error": error_message}), 500
    
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            if not all(key in data for key in ['user_id', 'id']):
                return jsonify({"error": "Invalid data"}), 400

            post = Post.query.filter_by(user_id=data['user_id'], id=data['id']).first()
            if post:
                db.session.delete(post)
                db.session.commit()
                response = make_response(
                    jsonify({
                        "message": "Post deleted"
                    }),
                    200
                )
                return response
            else:
                return jsonify({"error": "Post not found"}), 404
               
        except SQLAlchemyError as e:
            db.session.rollback()
            error_message = "Database error: " + str(e)
            return jsonify({"error": error_message}), 500
    
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            if not all(key in data for key in ['user_id', 'id', 'title', 'category', 'body']):
                return jsonify({"error": "Invalid data"}), 400
            
            post = Post.query.filter_by(user_id=data['user_id'], id=data['id']).first()
            if post:
                post.title = data['title']
                post.category = data['category']
                post.body = data['body']
                db.session.commit()
                response = make_response(
                    jsonify({
                        "message": "Post updated"
                    }),
                    200
                )
                return response
            else:
                return jsonify({"error": "Post not found"}), 404
        except SQLAlchemyError as e:
            db.session.rollback()
            error_message = "Database error: " + str(e)
            return jsonify({"error": error_message}), 500


if __name__ == '__main__':
    app.run(port=5555, debug=True)