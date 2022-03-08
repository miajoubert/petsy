from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Product, db
from app.forms import ProductForm

product_routes = Blueprint("products", __name__)

@product_routes.route("")
def get_products():

    products = Product.query.all()
    return {"products": [product.to_dict() for product in products]}


@product_routes.route("/<int:id>")
def get_product_by_id(id):

    product = Product.query.get(id)
    return product.to_dict()

@product_routes.route('/new/', methods=['POST'])
@login_required
def add_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_product = Product(
            name = form.data['name'],
            image = form.data['image'],
            description = form.data['description'],
            price = form.data['price'],
            categoryId = int(form.data['categoryId']),
            userId = int(current_user.id)
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()

@product_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def edit_product(id):
    return None

@product_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):

    product_delete = Product.query.get(id)
    db.session.delete(product_delete)
    db.session.commit()
    return ('Product has been deleted successfully!!!')
