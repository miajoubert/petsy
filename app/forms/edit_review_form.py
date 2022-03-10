from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, HiddenField
from wtforms.validators import DataRequired

class EditReviewForm(FlaskForm):
    review = TextAreaField('Review', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
    created_at = HiddenField("Created At",)
