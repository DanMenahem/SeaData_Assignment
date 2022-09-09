import random
import string
import names
from datetime import datetime, timedelta
from shared.db import db
from models import Order, Item, OrderItem


def genGender():
    arr = ["Male", "Female"]
    gender = random.choices(arr, cum_weights=(50, 100), k=1)
    return gender[0]


def insertRandomData():
    try:
        # create items catalog
        for i in range(1000):
            name = ''.join(random.choices(
                string.ascii_uppercase + string.digits, k=10))
            price = round(random.uniform(5.0, 2000), 1)
            cost = round(price * random.uniform(0.10, 0.90), 2)
            db.session.add(Item(name, price, cost))
            db.session.commit()

        # create orders
        for i in range(2000):
            print(i)
            date = datetime.now().date() - timedelta(days=random.randint(0, 30))
            customer_full_name = names.get_full_name(gender=genGender())
            order = Order(date, customer_full_name)
            randomItem = []
            for j in range(random.randint(1, 10)):
                randomNumber = random.randint(1, 1000)
                while randomNumber in randomItem:
                    randomNumber = random.randint(1, 1000)
                # while True:
                #     if randomNumber not in item:
                #         break
                #     randomNumber = random.randint(1, 1000)
                randomItem.append(randomNumber)
                item = db.session.query(Item).filter(
                    Item.id == randomNumber).first()
                order.order_items.append(
                    OrderItem(item, random.randint(1, 10)))
            db.session.add(order)
            db.session.commit()
        return True
    except Exception as e:
        print(e)
