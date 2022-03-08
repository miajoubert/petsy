from flask import Blueprint, jsonify, request
from app.forms.search_form import SearchForm

from app.models.product import Product


result_routes = Blueprint("results", __name__)

@result_routes.route("", methods=['GET', 'POST'])
def search():
    search_form = SearchForm()
    search_form['csrf_token'].data = request.cookies['csrf_token']

    term = request.get_json(force=True)
    print('term!!!!!!!!!!!!!!!!!', term)
    products = Product.query.filter(Product.name.ilike(f'%{term}%')).all()
    return {"products": [product.to_dict() for product in products]}
