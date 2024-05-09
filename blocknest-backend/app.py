from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
import pandas as pd

app = Flask(__name__)

CORS(app)

def get_top_tags():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='tugas_akhir_if670'
    )

    query = "SELECT content FROM post"
    df = pd.read_sql(query, conn)

    tags_series = df['content'].str.findall(r'#\w+').explode()

    top_tags = tags_series.value_counts().nlargest(4).index.tolist()
    
    conn.close()

    return top_tags

def get_top_users():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='tugas_akhir_if670'
    )

    query = """
    SELECT username, profile_pic, followers
    FROM user
    ORDER BY followers DESC
    LIMIT 4
    """
    df = pd.read_sql(query, conn)

    top_users = df.to_dict(orient='records')

    conn.close()

    return top_users


@app.route('/api/top-tags', methods=['GET'])
def top_tags():
    tags = get_top_tags()
    return jsonify(tags)

@app.route('/api/top-users', methods=['GET'])
def top_users():
    users = get_top_users()
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)
