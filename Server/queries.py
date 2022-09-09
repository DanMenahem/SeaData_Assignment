from array import array
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from shared.db import db
from models import Order, Item, OrderItem


def rowAsDictForDate(result):
    array = []
    for row in result:
        queryRes = {}
        queryRes["date"] = row[1].strftime("%Y-%m-%d")
        queryRes["value"] = row[0]
        array.append(queryRes)
    return array


def rowAsDictForStr(result):
    array = []
    for row in result:
        queryRes = {}
        queryRes["item"] = row[0]
        queryRes["value"] = row[1]
        array.append(queryRes)
    return array

# return the number of order per day and the day in a day range order by date


def ordersByDate(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(func.count(Order.id), Order.date).filter(
            and_(Order.date > dayRange)).group_by(Order.date).order_by(Order.date).all()
        return rowAsDictForDate(result)
    except Exception as e:
        return e

# return the total income per day and the day in a day range


def totalDayIncome(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(func.sum(OrderItem.amount * Item.price), Order.date).join(
            OrderItem).join(Item).filter(and_(Order.date > dayRange)).group_by(Order.date).order_by(Order.date).all()
        return rowAsDictForDate(result)
    except Exception as e:
        return e


# return the total profit per day and the day in a day range
def totalDayProfit(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(func.sum(OrderItem.amount * (Item.price - Item.cost)), Order.date).join(
            OrderItem).join(Item).filter(and_(Order.date > dayRange)).group_by(Order.date).order_by(Order.date).order_by(Order.date).all()
        return rowAsDictForDate(result)
    except Exception as e:
        return e

# return the the 10 most sold items in the last 30 days, by name and amount


def mostSoldItems(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(
            Item.name, func.sum(OrderItem.amount).label("amount")
        ).join(OrderItem).join(Order).filter(
            Order.date > dayRange
        ).group_by(Item.name).order_by(
            func.sum(OrderItem.amount).desc()
        ).limit(10).all()
        return rowAsDictForStr(result)
    except Exception as e:
        return e
