from flask import Flask, jsonify, request
from flask_cors import CORS
from shared.db import db
from insertToDataBase import insertRandomData
from queries import getProfitPrecentage, getMostSoldItems, getTotalDayProfit, getTotalDayIncome, getOrdersByDate


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ovkccssvkxffaq:df53350e633e7b7ccd21463088212f847ed29c95760eed5e04dbd240a513d0c0@ec2-54-228-125-183.eu-west-1.compute.amazonaws.com:5432/d6c31qe72s4ev7'
db.init_app(app)

with app.app_context():
    db.drop_all()
    db.create_all()
    insertRandomData()


@ app.route('/')
def hello():
    return 'Hello And Welcome To My Assignment Server'


@ app.route('/ordersByDate', methods=['GET'])
def ordersByDate():
    arg = request.args
    result = getOrdersByDate(int(arg['day']))
    print(result)
    return jsonify(result)


@ app.route('/totalDayIncome', methods=['GET'])
def totalDayIncome():
    arg = request.args
    result = getTotalDayIncome(int(arg['day']))
    return jsonify(result)


@ app.route('/totalDayProfit', methods=['GET'])
def totalDayProfit():
    arg = request.args
    result = getTotalDayProfit(int(arg['day']))
    return jsonify(result)


@ app.route('/mostSoldItems', methods=['GET'])
def mostSoldItem():
    arg = request.args
    result = getMostSoldItems(int(arg['day']))
    return jsonify(result)


@ app.route('/profitPrecentage', methods=['GET'])
def profitPrecentage():
    arg = request.args
    result = getProfitPrecentage(int(arg['day']))
    return result


if __name__ == '__main__':
    app.run()
