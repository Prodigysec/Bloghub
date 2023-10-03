from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-posts.user', '-comments.user',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String)
    password = db.Column(db.String)
    bio = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')

    @validates("username")
    def validates_username(self, key, username):
        if len(username) > 49:
            raise ValueError("Username must be less than 50 character")
        else:
            return username


    @validates("email")
    def validates_email(self, key, email):
        if len(email) > 49:
            raise ValueError("Email must be less than 50 character")
        else:
            return email


    @validates("password")
    def validates_password(self, key, password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters")
        else:
            return password


class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    serialize_rules = ('-user.posts', '-comments.post',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String)
    body = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')

    @validates("title")
    def validates_title(self, key, title):
        if type(title) != str:
            raise ValueError("Title must be a string")
        else:
            return title

    # validate the data type of category
    @validates("content")
    def validates_category(self, key, category):
        if len(category) :
            raise ValueError("Cannot publish an empty blog post")
        else:
            return category


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    serialize_rules = ('-user.comments', '-post.comments',)

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')
