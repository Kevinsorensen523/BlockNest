import mysql.connector
import pandas as pd

def get_search_prompt():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='tugas_akhir_if670'
    )

    query = "SELECT * FROM post"
    df = pd.read_sql(query, conn)

    search_prompt = df.to_dict(orient='records')

    conn.close()

    return search_prompt
