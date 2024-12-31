from flask import Flask, render_template, request, Response
import psycopg2
import csv
import io
import os

app = Flask(__name__)

# Database configuration
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://survey_user:survey_pass@db/survey_db')

# Connect to the database
def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

# Route to display the export page
@app.route('/')
def index():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT rd_name FROM surveys;")
    rd_names = [row[0] for row in cursor.fetchall()]
    cursor.close()
    conn.close()
    return render_template('index.html', rd_names=rd_names)

# Route to generate and download CSV
@app.route('/export', methods=['POST'])
def export_csv():
    rd_name = request.form.get('rd_name')
    month = request.form.get('month')
    year = request.form.get('year')

    if not (rd_name and month and year):
        return "Missing required fields", 400

    query = """
        SELECT * FROM surveys
        WHERE rd_name = %s AND EXTRACT(MONTH FROM date_seen) = %s AND EXTRACT(YEAR FROM date_seen) = %s;
    """

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query, (rd_name, month, year))
    records = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()
    conn.close()

    # Generate CSV in memory
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(column_names)
    writer.writerows(records)
    output.seek(0)

    # Send CSV file as response
    filename = f"{rd_name}_{year}-{month}_export.csv"
    return Response(
        output,
        mimetype='text/csv',
        headers={
            'Content-Disposition': f'attachment;filename={filename}'
        }
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
