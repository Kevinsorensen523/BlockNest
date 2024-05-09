import mysql.connector
import pandas as pd

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
