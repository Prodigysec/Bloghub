"""Add category column to Post table

Revision ID: 0b14c724f9f6
Revises: a7d9613ac848
Create Date: 2023-10-04 11:51:00.439579

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0b14c724f9f6'
down_revision = 'a7d9613ac848'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_column('category')

    # ### end Alembic commands ###
