from .db import db
from .cart_product import cart_products

class Shopping_Cart(db.Model):
    __tablename__ = 'shopping_carts'
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    buyer = db.relationship('User', back_populates='shopping_cart')
    products = db.relationship('Product', secondary=cart_products, back_populates='shopping_cart')
    order = db.relationship('Order', back_populates='shopping_cart')