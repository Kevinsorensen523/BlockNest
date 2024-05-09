import mysql.connector
import pandas as pd

def get_top_search():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='tugas_akhir_if670'
    )

    query = """
    SELECT SUBSTRING_INDEX(REPLACE(content, '#', ''), ' ', 5) AS top_sentence, COUNT(*) AS sentence_count
    FROM post
    GROUP BY top_sentence
    ORDER BY sentence_count DESC
    LIMIT 8;
    """
    
    df = pd.read_sql(query, conn)

    top_search = df.to_dict(orient='records')

    conn.close()

    return top_search
