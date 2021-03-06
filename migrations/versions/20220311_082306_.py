"""empty message

Revision ID: 0b53b78d7d99
Revises: 1d8a1234fd6
Create Date: 2022-03-11 08:23:06.451957

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0b53b78d7d99'
down_revision = '1d8a1234fd6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('orders_product_id_fkey', 'orders', type_='foreignkey')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key('orders_product_id_fkey', 'orders', 'products', ['product_id'], ['id'])
    # ### end Alembic commands ###
