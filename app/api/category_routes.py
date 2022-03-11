from unicodedata import category
from flask import Blueprint, jsonify, request
from app.models import Category, Product

category_routes = Blueprint("categories", __name__)


@category_routes.route('')
def get_all_categories():
    categories = Category.query.join(Product).all()
    return {'categories': [category.to_dict() for category in categories]}


@category_routes.route("/<int:id>")
def get_category_by_id(id):
    category = Category.query.get(id)
    return category.to_dict()
