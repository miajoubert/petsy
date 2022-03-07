from flask import Blueprint, jsonify, request
from app.forms import search_form

from app.models.product import Product
from app.forms.search_form import SearchForm
from sqlalchemy.sql.operators import like_op
from sqlalchemy import func


result_routes = Blueprint("results", __name__)

@result_routes.route("", methods=["GET", "POST"])
def search():
    