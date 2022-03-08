from typing import Text
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SubmitField, SelectField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()], message='Name cannot be blank')
    image = StringField('Image', validators=[DataRequired()], message='Image cannot be blank')
    description = TextAreaField('Description', validators=[DataRequired()], message='Description cannot be blank')
    price = IntegerField('Price', validators=[DataRequired()], message='Price cannot be blank')
    category = SelectField('Category', choices=[('Dog Food', 'Dog Food'), ('Dog Toys', 'Dog Toys'), ('Cat Food', 'Cat Food'), ('Cat Toys', 'Cat Toys'), ('Cat Litter', 'Cat Litter'), ('Bowls and Feeders', 'Bowls and Feeders'), ('Grooming', 'Grooming'), ('Clothing and Accessories', 'Clothing and Accessories')], validators=[DataRequired()], message='Must select a category')
    categoryId = IntegerField('Category Id', validators=[DataRequired()])
    submit = SubmitField('Submit')
