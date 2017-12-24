# -*- coding: utf-8 -*-
from bottle import get, run, HTTPResponse, static_file
import json


@get('/')
def index():
    return static_file('index.html', './')


@get('/<filename:path>')
def static(filename):
    return static_file(filename, './')


@get('/get/schedule')
def getSchedule():
    body = json.dumps([{
                'name': "田中",
                'schedule': [{
                        'time': "11:00",
                        'name': "会議"
                    },
                    {
                        'time': "14:00",
                        'name': "会議"
                    }
                ]
            }
        ], ensure_ascii=False)
    print(body)
    r = HTTPResponse(status=200, body=body)
    r.set_header('Content-Type', 'application/json')
    return r

run(host='127.0.0.1', port=8080, debug=True)
