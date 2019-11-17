from flask import Flask, jsonify, request, abort
from app import app
from app.models import models
from random import seed
from random import sample

client = models.newsClient()

@app.route('/v1/news/search', methods=['GET'])
def search():
    query = request.args.get('q', type = str)
    lang = request.args.get('lang', default='en', type=str)
    if query is None:
        return jsonify(status="failure", code=400, error="invalid query parameter"), 400
    res = client.searchNews(query, lang)
    if res["status"] != "ok":
        return jsonify({"status": "failure", "code": "500"})
    if res["totalResults"] == 0:
        return jsonify(status="success", code=200, message="no news at the moment"), 200
    article = sample(res["articles"],1)[0]
    dataRaw = {"title": article["title"], "url": article["url"], "author": article["author"]}
    body = {"satus":"success", "code":200, "data":dataRaw}
    return jsonify(body)

@app.route('/v1/news/headlines', methods=['GET'])
def headlines():
    query = request.args.get('q', type = str)
    lang = request.args.get('lang', default='en', type=str)
    if query is None:
        return jsonify(status="failure", code=400, error="invalid query parameter"), 400
    res = client.getHeadlines(query, lang)
    if res["status"] != "ok":
        return jsonify({"status": "failure", "code": "500"})
    if res["totalResults"] == 0:
        return jsonify(status="success", code=200, message="no headlines at the moment"), 200
    article = sample(res["articles"],1)[0]
    dataRaw = {"title": article["title"], "url": article["url"], "author": article["author"]}
    body = {"satus":"success", "code":200, "data":dataRaw}
    return jsonify(body)

@app.route('/v1/news/headlines/country', methods=['GET'])
def countryHeadlines():
    country = request.args.get('country', type = str)
    lang = request.args.get('lang', default='en', type=str)
    if country is None:
        return jsonify(status="failure", code=400, error="invalid country parameter"), 400
    res = client.getHeadlinesCountry(country, lang)
    if res["status"] != "ok":
        return jsonify({"status": "failure", "code": "500"})
    if res["totalResults"] == 0:
        return jsonify(status="success", code=200, message="no headlines at the moment"), 200
    article = sample(res["articles"],1)[0]
    dataRaw = {"title": article["title"], "url": article["url"], "author": article["author"]}
    body = {"satus":"success", "code":200, "data":dataRaw}
    return jsonify(body)