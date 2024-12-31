from flask import Flask, render_template, request, redirect, url_for
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)

# Database configuration from environment variables
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://survey_user:@db/survey_db')

def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

@app.route('/')
def index():
    return render_template('survey.html')

from flask import request, redirect, url_for, render_template

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        # Collect form data
        form_data = request.form.to_dict()
        print("📝 Received Form Data:", form_data)  # Debug: Print form data

        # Ensure required fields exist
        required_fields = ['rd_name', 'date_seen', 'mrn_patient', 'reason_for_visit']
        for field in required_fields:
            if field not in form_data or not form_data[field]:
                print(f"❌ Missing required field: {field}")
                return f"Missing required field: {field}", 400

        # Set defaults for optional fields if they are missing
        optional_fields = [
            'ina_reason', 'ra_reason', 'outcome_risk', 'ina_timeliness', 'ina_late_reason',
            'ina_reason_other', 'ina_days_late', 'ra_timeliness', 'ra_late_reason',
            'ra_reason_other', 'ra_days_late', 'consult_reason', 'consult_timeliness',
            'consult_late_reason', 'consult_reason_other', 'consult_days_late',
            'education', 'nutrition_support', 'malnutrition', 'additional_info_optional',
            'patient_care_time', 'formal_meeting_time'
        ]

        for field in optional_fields:
            if field not in form_data:
                form_data[field] = None  # Set to None if not provided

        try:
            # Connect to the database
            with get_db_connection() as db_connection:
                with db_connection.cursor() as cursor:
                    cursor.execute("""
                        INSERT INTO surveys (
                            rd_name, date_seen, mrn_patient, reason_for_visit, ina_reason,
                            ra_reason, outcome_risk, ina_timeliness, ina_late_reason,
                            ina_reason_other, ina_days_late, ra_timeliness, ra_late_reason,
                            ra_reason_other, ra_days_late, consult_reason, consult_timeliness,
                            consult_late_reason, consult_reason_other, consult_days_late,
                            education, nutrition_support, malnutrition, additional_info_optional,
                            patient_care_time, formal_meeting_time
                        ) VALUES (
                            %(rd_name)s, %(date_seen)s, %(mrn_patient)s, %(reason_for_visit)s, %(ina_reason)s,
                            %(ra_reason)s, %(outcome_risk)s, %(ina_timeliness)s, %(ina_late_reason)s,
                            %(ina_reason_other)s, %(ina_days_late)s, %(ra_timeliness)s, %(ra_late_reason)s,
                            %(ra_reason_other)s, %(ra_days_late)s, %(consult_reason)s, %(consult_timeliness)s,
                            %(consult_late_reason)s, %(consult_reason_other)s, %(consult_days_late)s,
                            %(education)s, %(nutrition_support)s, %(malnutrition)s, %(additional_info_optional)s,
                            %(patient_care_time)s, %(formal_meeting_time)s
                        )
                    """, form_data)
                db_connection.commit()
                print("✅ Form data committed to the database.")

            return redirect(url_for('thank_you'))

        except Exception as e:
            print("❌ Database Error:", e)
            import traceback
            traceback.print_exc()
            return f"Submission failed! Error: {e}", 500


@app.route('/thank_you')
def thank_you():
    return render_template('thank_you.html')



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
