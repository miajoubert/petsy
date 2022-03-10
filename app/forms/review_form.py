from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    review = TextAreaField('Review', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    product_id = IntegerField('ProductId', validators=[DataRequired()])
