from .db import db
from .cart_product import cart_products

class Product(db.Model):
  __tablename__ = 'products'

  id = db.Column(db.Integer, primary_key=True)
  seller_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  name = db.Column(db.String, nullable=False)
  image_url = db.Column(db.Text, nullable=False)
  description = db.Column(db.Text, nullable=False)
  price = db.Column(db.Float, nullable=False)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False)
  updated_at = db.Column(db.DateTime, nullable=False)
  seller = db.relationship("User", back_populates="product")
  category = db.relationship("Category", back_populates="product")
  review = db.relationship("Review", back_populates="product")
  shopping_cart = db.relationship("Shopping_Cart", secondary=cart_products, back_populates="products")
