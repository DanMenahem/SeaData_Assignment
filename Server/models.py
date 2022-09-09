from shared.db import db
from datetime import datetime


class OrderItem(db.Model):
    __tablename__ = 'orderItems'
    order_id = db.Column(db.ForeignKey('order.id'), primary_key=True)
    item_id = db.Column(db.ForeignKey('item.id'), primary_key=True)
    amount = db.Column(db.Integer, nullable=False)
    item = db.relationship('Item', lazy='joined')

    def __init__(self, item, amount):
        self.item = item
        self.amount = amount


class Order(db.Model):
    __tablename__ = 'order'
    id = db.Column(db.Integer, primary_key=True)
    customer_full_name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False, default=datetime.now().date())
    order_items = db.relationship(
        "OrderItem", cascade="all, delete-orphan", backref="order"
    )

    def __init__(self, date, customer_full_name):
        self.date = date
        self.customer_full_name = customer_full_name


class Item(db.Model):
    __tablename__ = 'item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=False)
    cost = db.Column(db.Float, nullable=False)

    def __init__(self, name, price, cost):
        self.name = name
        self.price = price
        self.cost = cost

    def __repr__(self):
        return f"Item('{self.name}', '{self.price}', '{self.cost}')"
