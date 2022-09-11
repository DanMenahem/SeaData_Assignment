from sqlalchemy import func, and_
from datetime import datetime, timedelta
from shared.db import db
from models import Order, Item, OrderItem


def rowAsDictForDateValue(result):
    array = []
    for row in result:
        queryRes = {}
        queryRes["date"] = row[1].strftime("%Y-%m-%d")
        queryRes["value"] = row[0]
        array.append(queryRes)
    return array


def rowAsDictForStrValue(result):
    array = []
    for row in result:
        queryRes = {}
        queryRes["name"] = row[0]
        queryRes["value"] = row[1]
        array.append(queryRes)
    return array


def rowAsDictForProfitPrecentage(result):
    array = []
    for row in result:
        queryRes = {}
        queryRes["date"] = row[0].strftime("%Y-%m-%d")
        queryRes["expense"] = row[1]
        queryRes["profit"] = row[2]
        array.append(queryRes)
    return array

# return the number of order per day and the day in a day range order by date


def getOrdersByDate(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(func.count(Order.id), Order.date).filter(
            and_(Order.date > dayRange)).group_by(Order.date).order_by(Order.date).all()
        return rowAsDictForDateValue(result)
    except Exception as e:
        return e

# return the total income per day and the day in a day range


def getTotalDayIncome(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(func.sum(OrderItem.amount * Item.price), Order.date).join(
            OrderItem).join(Item).filter(and_(Order.date > dayRange)).group_by(Order.date).order_by(Order.date).all()
        return rowAsDictForDateValue(result)
    except Exception as e:
        return e


# return the total profit per day and the day in a day range
def getTotalDayProfit(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(func.sum(OrderItem.amount * (Item.price - Item.cost)), Order.date).join(
            OrderItem).join(Item).filter(and_(Order.date > dayRange)).group_by(Order.date).order_by(Order.date).order_by(Order.date).all()
        return rowAsDictForDateValue(result)
    except Exception as e:
        return e

# return the the 10 most sold items in the last 30 days, by name and amount


def getMostSoldItems(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(
            Item.name, func.sum(OrderItem.amount).label("amount")
        ).join(OrderItem).join(Order).filter(
            Order.date > dayRange
        ).group_by(Item.name).order_by(
            func.sum(OrderItem.amount).desc()
        ).limit(10).all()
        return rowAsDictForStrValue(result)
    except Exception as e:
        return e


# retrun total expense and profit per day and the day in a day range
def getProfitPrecentage(day=30):
    try:
        dayRange = datetime.now().date() - timedelta(days=day)
        result = db.session.query(
            Order.date,
            func.sum(OrderItem.amount * Item.cost).label("expense"),
            func.sum(OrderItem.amount *
                     (Item.price - Item.cost)).label("profit")
        ).join(OrderItem).join(Item).filter(
            Order.date > dayRange
        ).group_by(Order.date).order_by(Order.date).all()
        return rowAsDictForProfitPrecentage(result)
    except Exception as e:
        return e
