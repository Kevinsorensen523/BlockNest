from flask import Flask, request, jsonify
from flask_cors import CORS
from database.tags import get_top_tags
from database.users import get_top_users
from database.search import get_top_search
from database.search_user import get_search_user

app = Flask(__name__)
CORS(app)

@app.route('/api/top-tags', methods=['GET'])
def top_tags():
    tags = get_top_tags()
    return jsonify(tags)

@app.route('/api/top-users', methods=['GET'])
def top_users():
    users = get_top_users()
    return jsonify(users)

@app.route('/api/top-search', methods=['GET'])
def top_search():
    search = get_top_search()
    return jsonify(search)

@app.route('/api/search_user', methods=['GET'])
def search_user():
    current_title = request.args.get('currentTitle', '')
    search_user = get_search_user(current_title)
    return jsonify(search_user)

if __name__ == '__main__':
    app.run(debug=True)
