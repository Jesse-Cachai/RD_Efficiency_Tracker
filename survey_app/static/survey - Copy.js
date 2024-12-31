document.addEventListener('DOMContentLoaded', function () {
    // --- Auto-Populate Date Field ---
    const dateSeenInput = document.getElementById('date_seen');
    dateSeenInput.value = new Date().toISOString().split('T')[0];

    // --- Field Visibility Variables ---
    const reasonForVisitRadios = document.getElementsByName('reason_for_visit');
    const inaSection = document.getElementById('ina_reason_section');
    const raSection = document.getElementById('ra_reason_section');
    const outcomeRiskSection = document.getElementsByName('outcome_risk');

    const inaTimelinessSection = document.getElementById('ina_timeliness_section');
    const inaLateReasonSection = document.getElementById('ina_late_reason_section');
    const inaReasonOtherSection = document.getElementById('ina_reason_other_section');
    const inaDaysLateSection = document.getElementById('ina_days_late_section');

    const raTimelinessSection = document.getElementById('ra_timeliness_section');
    const raLateReasonSection = document.getElementById('ra_late_reason_section');
    const raReasonOtherSection = document.getElementById('ra_reason_other_section');

    // --- Conditional Logic for Reason for Visit ---
    reasonForVisitRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'Initial assessment') {
                inaSection.style.display = 'block';
                raSection.style.display = 'none';
                outcomeRiskSection.forEach(el => el.parentElement.style.display = 'block');
            } else if (this.value === 'Reassessment') {
                raSection.style.display = 'block';
                inaSection.style.display = 'none';
                outcomeRiskSection.forEach(el => el.parentElement.style.display = 'block');
            } else {
                inaSection.style.display = 'none';
                raSection.style.display = 'none';
                outcomeRiskSection.forEach(el => el.parentElement.style.display = 'none');
            }
        });
    });

    // --- Conditional Logic for INA Timeliness ---
    const inaTimelinessRadios = document.getElementsByName('ina_timeliness');
    inaTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'No') {
                inaLateReasonSection.style.display = 'block';
                inaDaysLateSection.style.display = 'block';
            } else {
                inaLateReasonSection.style.display = 'none';
                inaDaysLateSection.style.display = 'none';
            }
        });
    });

    // --- Conditional Logic for INA Late Reason Other ---
    const inaLateReasonRadios = document.getElementsByName('ina_late_reason');
    inaLateReasonRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'Other') {
                inaReasonOtherSection.style.display = 'block';
            } else {
                inaReasonOtherSection.style.display = 'none';
            }
        });
    });

    // --- Conditional Logic for RA Timeliness ---
    const raTimelinessRadios = document.getElementsByName('ra_timeliness');
    raTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'No') {
                raLateReasonSection.style.display = 'block';
            } else {
                raLateReasonSection.style.display = 'none';
            }
        });
    });

    // --- Conditional Logic for RA Late Reason Other ---
    const raLateReasonRadios = document.getElementsByName('ra_late_reason');
    raLateReasonRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'Other') {
                raReasonOtherSection.style.display = 'block';
            } else {
                raReasonOtherSection.style.display = 'none';
            }
        });
    });

    // --- Ensure Initial State is Correct on Page Load ---
    const triggerInitialDisplay = () => {
        // Trigger initial visibility for reason_for_visit
        reasonForVisitRadios.forEach(radio => {
            if (radio.checked) {
                radio.dispatchEvent(new Event('change'));
            }
        });

        // Trigger initial visibility for INA Timeliness
        inaTimelinessRadios.forEach(radio => {
            if (radio.checked) {
                radio.dispatchEvent(new Event('change'));
            }
        });

        // Trigger initial visibility for INA Late Reason
        inaLateReasonRadios.forEach(radio => {
            if (radio.checked) {
                radio.dispatchEvent(new Event('change'));
            }
        });

        // Trigger initial visibility for RA Timeliness
        raTimelinessRadios.forEach(radio => {
            if (radio.checked) {
                radio.dispatchEvent(new Event('change'));
            }
        });

        // Trigger initial visibility for RA Late Reason
        raLateReasonRadios.forEach(radio => {
            if (radio.checked) {
                radio.dispatchEvent(new Event('change'));
            }
        });
    };

    triggerInitialDisplay();
});
