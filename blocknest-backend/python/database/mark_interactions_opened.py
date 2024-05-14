import mysql.connector
from flask import request, jsonify

def mark_interactions_opened():
    conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='tugas_akhir_if670'
        )
    interaction_ids = request.json['ids']
    cursor = conn.cursor()
    query = "UPDATE user_interactions SET isOpen = TRUE WHERE id IN (%s)"
    format_strings = ','.join(['%s'] * len(interaction_ids))
    cursor.execute(query % format_strings, tuple(interaction_ids))
    conn.commit()
    cursor.close()
    conn.close()
    return {"status": "success"}