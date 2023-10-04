#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Post, Comment

fake = Faker()

with app.app_context():
    
        Comment.query.delete()
        Post.query.delete()
        User.query.delete()
    
        users = []
        for i in range(20):
            u = User(
                username=fake.name(),
                email=fake.email(),
                password=fake.password(),
                bio=fake.text()
            )
            users.append(u)
    
        db.session.add_all(users)
        db.session.commit()
    
    
        posts = []
        for i in range(100):
            p = Post(
                title=fake.sentence(),
                body=fake.text(),
                category=rc(['Food', 'Tech', 'Cars', 'Sports', 'Art']),
                user=rc(users)
            )
            posts.append(p)
    
        db.session.add_all(posts)
        db.session.commit()
    
    
        comments = []
        for i in range(100):
            c = Comment(
                text=fake.text(),
                user=rc(users),
                post=rc(posts)
            )
            comments.append(c)
    
        db.session.add_all(comments)
        db.session.commit()