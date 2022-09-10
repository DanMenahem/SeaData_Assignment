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
        itemsCatalog = []
        # create items catalog
        for i in range(1000):
            name = ''.join(random.choices(
                string.ascii_uppercase + string.digits, k=10))
            price = round(random.uniform(5.0, 500), 2)
            cost = round(price * random.uniform(0.55, 0.9), 1)
            itemToDb = Item(name, price, cost)
            itemsCatalog.append(itemToDb)
            db.session.add(itemToDb)
        db.session.commit()

        # create orders
        for i in range(20000):
            date = datetime.now().date() - timedelta(days=random.randint(0, 30))
            customer_full_name = names.get_full_name(gender=genGender())
            order = Order(date, customer_full_name)
            randomItem = []
            for j in range(random.randint(1, 10)):
                randomNumber = random.randint(1, 1000)
                while randomNumber in randomItem:
                    randomNumber = random.randint(1, 1000)
                randomItem.append(randomNumber)
                item = itemsCatalog[randomNumber - 1]
                order.order_items.append(
                    OrderItem(item, random.randint(1, 10)))
            db.session.add(order)
        db.session.commit()
        return True
    except Exception as e:
        print(e)
