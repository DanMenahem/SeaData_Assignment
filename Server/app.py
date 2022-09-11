from flask import Flask, jsonify, request
from sqlalchemy import func, and_
from shared.db import db
from insertToDataBase import insertRandomData
import queries


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dan:userpassword@34.154.36.175:5432/postgres'
db.init_app(app)

# with app.app_context():
#     db.drop_all()
#     db.create_all()
#     insertRandomData()


@ app.route('/')
def hello():
    return 'Hello World!'


@ app.route('/ordersByDate', methods=['GET'])
def ordersByDate():
    arg = request.args
    result = queries.ordersByDate(int(arg['day']))
    print(result)
    return jsonify(result)


@ app.route('/totalDayIncome', methods=['GET'])
def totalDayIncome():
    arg = request.args
    result = queries.totalDayIncome(int(arg['day']))
    return jsonify(result)


@ app.route('/totalDayProfit', methods=['GET'])
def totalDayProfit():
    arg = request.args
    result = queries.totalDayProfit(int(arg['day']))
    return jsonify(result)


@ app.route('/mostSoldItems', methods=['GET'])
def mostSoldItem():
    arg = request.args
    result = queries.mostSoldItems(int(arg['day']))
    return jsonify(result)


@ app.route('/profitPrecentage', methods=['GET'])
def profitPrecentage():
    arg = request.args
    result = queries.profitPrecentage(int(arg['day']))
    return result


if __name__ == '__main__':
    app.run()
