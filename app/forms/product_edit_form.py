from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class EditProductForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired()] )
    image_url = StringField('Image', validators=[DataRequired()], )
    description = TextAreaField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()] )
    category_id = IntegerField('Category', validators=[DataRequired()])
