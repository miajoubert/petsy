from .db import db

class Product(db.Model):
  __tablename__ = 'products'

  id = db.Column(db.Integer, primary_key=True)
  seller_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  name = db.Column(db.String, nullable=False)
  image_url = db.Column(db.Text, nullable=False)
  description = db.Column(db.Text, nullable=False)
  price = db.Column(db.Float, nullable=False)
  category_id = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.Datetime, nullable=False)
  updated_at = db.Column(db.Datetime, nullable=False)
  seller = db.relationship("User", back_populates="product")
  category = db.relationship("Category", back_populates="product")
