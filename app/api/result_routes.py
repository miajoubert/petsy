from flask import Blueprint, jsonify, request
from flask_cors import cross_origin

from app.models.product import Product


result_routes = Blueprint("results", __name__)

@result_routes.route("", methods=['POST'])
def search():
    term = request.get_json(force=True)
    products = Product.query.filter(Product.name.ilike(f'%{term}%')).all()
    return {"products": [product.to_dict() for product in products]}
