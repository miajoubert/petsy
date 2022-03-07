from .db import db

class Shopping_Cart(db.Model):
    __tablename__ = 'shopping_carts'
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.Datetime, nullable=False)
    updated_at = db.Column(db.Datetime, nullable=False)
    buyer = db.relationship('User', back_populates='shopping_cart')
