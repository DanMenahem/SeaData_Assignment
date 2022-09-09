from datetime import datetime, timedelta
import random
import string
import names
from shared.db import db
from models import Order, Item, OrderItem


if __name__ == "__main__":
    db.drop_all()

    # Add random data to the database
    # -------------------------------------------------------------------------------------------------------------------
    # return the number of order per day and the day in a day range order by date
    def numberOfOrders(day=30):
        queryRes = {}
        try:
            dayRange = datetime.now().date() - timedelta(days=day)
            result = db.session.query(func.count(Order.id), Order.date).filter(
                and_(Order.date > dayRange)).group_by(Order.date).all().order_by(Order.date)
            for row in result:
                queryRes[row[1].strftime("%Y-%m-%d")] = row[0]
            return queryRes
        except Exception as e:
            print(e)


    # return the total income per day and the day in a day range
try:
    dayRange = datetime.now().date() - timedelta(days=30)
    result = session.query(func.sum(OrderItem.amount * Item.price), Order.date).join(
        OrderItem).join(Item).filter(and_(Order.date >= dayRange)).group_by(Order.date).all()
    print(result)
except Exception as e:
    print(e)

    # return the total profit per day and the day in a day range
try:
    dayRange = datetime.now().date() - timedelta(days=30)
    result = session.query(func.sum(OrderItem.amount * (Item.price - Item.cost)), Order.date).join(
        OrderItem).join(Item).filter(and_(Order.date >= dayRange)).group_by(Order.date).all()
    print(result)
except Exception as e:
    print(e)

# return the the 10 most sold items in the last 30 days, by name and amount
try:
    dayRange = datetime.now().date() - timedelta(days=30)
    result = session.query(
        Item.name, func.sum(OrderItem.amount).label("amount")
    ).join(OrderItem).join(Order).filter(
        Order.date >= dayRange
    ).group_by(Item.name).order_by(
        func.sum(OrderItem.amount).desc()
    ).limit(10).all()
    print(result)
except Exception as e:
    print(e)

    # return the name of the top customer by total profit in the last 30 days
    # try:
    #     dayRange = datetime.now().date() - timedelta(days=30)
    #     result = session.query(
    #         Order.customer_full_name, func.sum(
    #             OrderItem.amount * Item.price).label("profit")
    #     ).join(OrderItem).join(Item).filter(
    #         Order.date >= dayRange
    #     ).group_by(Order.customer_full_name).order_by(
    #         func.sum(OrderItem.amount * Item.price).desc()
    #     ).limit(1).all()
    #     print(result)
    # except Exception as e:
    #     print(e)

    # ------------------------------------------------------------------------------------------------------------------------------

    # try:
    #     # create catalog
    #     phone, mouse, computer, keyBoard, tShirt, mug, hat = (
    #         Item("phone", 10.99),
    #         Item("mouse", 6.50),
    #         Item("computer", 8.99),
    #         Item("keyBoard", 16.99),
    #         Item("tShirt", 5.00),
    #         Item("mug", 3.00),
    #         Item("hat", 2.00)
    #     )
    #     session.add_all([phone, mouse, computer, keyBoard, tShirt, mug, hat])
    #     session.commit()

    #     computer = session.query(Item).filter(Item.name == "computer").first()
    #     mug = session.query(Item).filter(Item.name == "mug").first()
    #     hat = session.query(Item).filter(Item.name == "hat").first()

    #     order = Order(datetime.now().date(), "Dan Menahem")

    # #   add three OrderItem associations to the Order and save
    #     order.order_items.append(OrderItem(computer, 7))
    #     order.order_items.append(OrderItem(mug, 2))
    #     order.order_items.append(OrderItem(hat, 10))
    #     session.add(order)
    #     session.commit()
    # except Exception as e:
    #     print(e)
