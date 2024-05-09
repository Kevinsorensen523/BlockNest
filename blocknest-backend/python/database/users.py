import mysql.connector
import pandas as pd

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
