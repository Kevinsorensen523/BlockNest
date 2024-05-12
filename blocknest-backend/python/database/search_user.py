import mysql.connector
import pandas as pd

def get_search_user(current_title):
    conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='tugas_akhir_if670'
        )
    query = "SELECT * FROM user WHERE username LIKE %s"
    df = pd.read_sql(query, conn, params=('%' + current_title + '%',))
    search_user = df.to_dict(orient='records')
    conn.close()

    if search_user:
        print("Users found:", search_user)
    else:
        print("No users found matching the criteria.")

    return search_user


