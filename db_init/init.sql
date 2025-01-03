-- Create the surveys table
CREATE TABLE IF NOT EXISTS surveys (
    id SERIAL PRIMARY KEY,
    rd_name TEXT NOT NULL,
    date_seen DATE NOT NULL,
    mrn_patient TEXT NOT NULL,
    reason_for_visit TEXT NOT NULL,
    ina_reason TEXT,
    ra_reason TEXT,
    outcome_risk TEXT,
    ina_timeliness TEXT,
    ina_late_reason TEXT,
    ina_reason_other TEXT,
    ina_days_late TEXT,
    ra_timeliness TEXT,
    ra_late_reason TEXT,
    ra_reason_other TEXT,
    ra_days_late TEXT,
    consult_reason TEXT,
    consult_timeliness TEXT,
    consult_late_reason TEXT,
    consult_reason_other TEXT,
    consult_days_late TEXT,
    education TEXT,
    nutrition_support TEXT,
    malnutrition TEXT,
    additional_info_optional TEXT,
    patient_care_time TEXT NOT NULL,
    formal_meeting_time TEXT
);