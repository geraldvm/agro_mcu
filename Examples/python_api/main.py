from flask import Flask
from flask import request
import requests
#from config import DevelopmentConfig

PORT = 2727 #define port channel
app = Flask(__name__) #Server instance
#app.config.from_object(DevelopmentConfig)


import time
import atexit

from apscheduler.schedulers.background import BackgroundScheduler

##Detection function
"""
    Function: leack_dect
    in date range detect if exist a leak
"""
def leak_dect():
    limit = 500 # Leak limit
    email = 'geraldvalverde90@gmail.com'
    idmeter = '1' #id meter
    day_min='5' #min day
    month_min='3' #min month
    year_min='2021' #min year
    day_max='5' #max day
    month_max='3' #max month
    year_max='2021' #max year
    #Request to get a min value
    min_value = requests.get('http://localhost:1616/api/flow?id='+idmeter+'&day='+day_min+'&month='+
                             month_min+'&year='+year_min+'&type=min').json()[0]["min"]
    #Request to get a max value
    max_value = requests.get('http://localhost:1616/api/flow?id='+idmeter+'&day='+day_max+'&month='+
                             month_max+'&year='+year_max+'&type=max').json()[0]["max"]
    #Differential value
    diff=max_value-min_value #Calculates flow consumption in a range
    #if differential exceed
    if(diff>limit):
        url = 'http://localhost:4000/notification' #Email Service
        myobj = {'receiverEmail': email, 'subject': 'Testing Leak Service','content':'Alert!'}#Email content
        r = requests.post(url, json = myobj)# Sen request
        #print("LEAK!!!!!")
    #else:
    #   print('OK!')


      
# SET BACKGROUD

scheduler = BackgroundScheduler()
scheduler.add_job(func=leak_dect, trigger="interval", seconds=5)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())


@app.before_request
def before_request():
    print("before request")

@app.after_request
def after_request(response):
    print("after request")
    return response
                
@app.errorhandler(404)
def error_msg():
    return '{Error: 404}',404
@app.route('/',methods =['GET','POST']) #wrap or decorator
def index():
    if request.method == 'GET':
        print('GET METHOD')
    return 'Leak Detection Service' #return a string


#http://127.0.0.1:2727/params?params1=ooo
@app.route('/params')
def params():
    param = request.args.get('params1','no param contained')
    param2 = request.args.get('params2','no param contained')
    return 'El parametro es : {} , {}'.format(param,param2)


@app.route('/path')
@app.route('/path/<name>')
@app.route('/path/<name>/<lastname>')
@app.route('/path/<name>/<lastname>/<int:idno>')
def path(name='default value',ln='default', idno=0):#if not name
    return 'El parametro es : {} , {}'.format(name,ln,idno)


@app.route('/hello')
def hello():
    print('GOOGLEEEEE')
    r = requests.get('http://www.google.com')
    print(r.text)
    return r.text


@app.route('/test') #https://docs.python-requests.org/en/latest/
def api():
    print('METERS')
    r = requests.get('http://localhost:1616/api/meters')
    print(r.text)
    return r.text


@app.route('/testd')
def apid():
    print('METERS')
    r = requests.get('http://localhost:1616/api/meters')
    print(r.json())
    return r.text

@app.route('/notif')
def api_notif():
    print('Notif')
    url = 'http://localhost:4000/notification'
    myobj = {'receiverEmail': 'geraldvalverde90@gmail.com', 'subject': 'Testing Leak Service','content':'Alert!'}
    r = requests.post(url, json = myobj)
    return r.text


@app.route('/leak')
def api_leak():
    limit = request.args.get('limit','1000000')
    idmeter = '1'
    day_min='5'
    month_min='3'
    year_min='2021'
    day_max='5'
    month_max='3'
    year_max='2021'
    min_value = requests.get('http://localhost:1616/api/flow?id='+idmeter+'&day='+day_min+'&month='+
                             month_min+'&year='+year_min+'&type=min').json()[0]["min"]
    max_value = requests.get('http://localhost:1616/api/flow?id='+idmeter+'&day='+day_max+'&month='+
                             month_max+'&year='+year_max+'&type=max').json()[0]["max"]
    email= requests.get('http://localhost:1616/api/email?id='+idmeter).json()[0]["email"]
    diff=max_value-min_value
    if(diff>int(limit)):
        url = 'http://localhost:4000/notification'
        myobj = {'receiverEmail': email, 'subject': 'Testing Leak Service','content':'Alert!'}
        r = requests.post(url, json = myobj)
        print("LEAK!!!!!")
        return 'LEAK!!!!!'
    return 'OK!'


if __name__=='__main__':
    #Server execute
    app.run(debug=False,port=PORT)#debug True: listen changes on file

