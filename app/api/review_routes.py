from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.forms.review_form import ReviewForm
from app.models import Review, db
from datetime import datetime

review_routes = Blueprint('reviews', __name__)


@review_routes.route('')
def get_reviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}


@review_routes.route('/new', methods=["POST"])
@login_required
def add_reviews():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            buyer_id = current_user.id,
            review = form.data['review'],
            rating = form.data['rating'],
            product_id = form.data['product_id'],
            created_at = datetime.now(),
            updated_at = datetime.now(),
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'message': 'sucess'}


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
