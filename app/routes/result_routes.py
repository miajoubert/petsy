from flask import Blueprint, jsonify, request
from app.forms.search_form import SearchForm

from app.models.product import Product
from sqlalchemy import func


result_routes = Blueprint("results", __name__)

@result_routes.route("")
def search():
    search_form = SearchForm()
    search_form['csrf_token'].data = request.cookies['csrf_token']
    term = search_form.search.data
    print("TERM!!!!!!!!!!!!!!!!!!!!", term)
    products = Product.query.filter(Product.name.ilike(f'%{term}%')).all()
    results = {"products": [product.to_dict() for product in products]}
    return results
