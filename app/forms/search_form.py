from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from wtforms.fields.html5 import SearchField
from wtforms.validators import DataRequired

class SearchForm(FlaskForm):
    search = StringField("", validators=[DataRequired()])
    submit = SubmitField("")
