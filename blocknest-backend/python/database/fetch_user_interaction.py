import mysql.connector
import pandas as pd

def fetch_user_interactions(target_user_id):
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',
        database='tugas_akhir_if670'
    )
    cursor = conn.cursor(dictionary=True)
    query = """
        SELECT ui.*, post.image AS post_image, user.username AS username, user.profile_pic AS profile_pic
        FROM user_interactions AS ui
        LEFT JOIN post ON post.post_id = ui.post_id
        JOIN user ON user.user_id = ui.user_id
        WHERE target_user_id = %s
    """
    cursor.execute(query, (target_user_id,))
    interactions = cursor.fetchall()
    cursor.close()
    conn.close()
    return interactions