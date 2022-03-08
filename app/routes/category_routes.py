from flask import Blueprint, jsonify, request
from app.models import Category, Product
category_routes = Blueprint("categories", __name__)

@category_routes.route("/<int:id>")
def get_category_by_id(id):

    category = Category.query.get(id)
    products = Product.query.filter(Product.category_id == category.id).all()
    print("-------------------------------")
    return {"products": [product.to_dict() for product in products]}
