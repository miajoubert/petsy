from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, db

review_routes = Blueprint('reviews', __name__)


@review_routes.route('')
def get_reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/new', methods=["POST"])
@login_required
def add_reviews():
    ##add form
    ##query
    return None


@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_reviews():
    ##edit form
    ##query
    return None


@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_reviews():
    ##delete
    return None
