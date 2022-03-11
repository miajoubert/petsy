from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Order

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    user = User.query.get(current_user.id)
    return user.to_dict()
