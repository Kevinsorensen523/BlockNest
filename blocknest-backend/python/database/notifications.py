import mysql.connector

def get_notification_count(user_id):
    conn = mysql.connector.connect(
        host='localhost', 
        user='root', 
        password='', 
        database='tugas_akhir_if670'
    )
    cursor = conn.cursor()
    query = "SELECT COUNT(*) FROM user_interactions WHERE target_user_id = %s AND isOpen = FALSE"
    cursor.execute(query, (int(user_id),))
    count = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return count