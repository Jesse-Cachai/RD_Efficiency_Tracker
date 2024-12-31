document.addEventListener('DOMContentLoaded', function () {
    // --- Auto-Populate Date Field ---
    const dateSeenInput = document.getElementById('date_seen');
    dateSeenInput.value = new Date().toISOString().split('T')[0];

    // --- Field Visibility Variables ---
    const reasonForVisitRadios = document.getElementsByName('reason_for_visit');
    const inaSection = document.getElementById('ina_reason_section');
    const raSection = document.getElementById('ra_reason_section');
    const outcomeRiskSection = document.getElementById('outcome_risk_section');

    const inaTimelinessSection = document.getElementById('ina_timeliness_section');
    const inaLateReasonSection = document.getElementById('ina_late_reason_section');
    const inaReasonOtherSection = document.getElementById('ina_reason_other_section');
    const inaDaysLateSection = document.getElementById('ina_days_late_section');
    const inaDaysLateInput = document.getElementById('ina_days_late');

    const raTimelinessSection = document.getElementById('ra_timeliness_section');
    const raLateReasonSection = document.getElementById('ra_late_reason_section');
    const raReasonOtherSection = document.getElementById('ra_reason_other_section');
    const raDaysLateSection = document.getElementById('ra_days_late_section');
    const raDaysLateInput = document.getElementById('ra_days_late');

    const inaReasonOtherInput = document.getElementById('ina_reason_other');
    const raReasonOtherInput = document.getElementById('ra_reason_other');

    const inaReasonRadios = document.getElementsByName('ina_reason');
    const raReasonRadios = document.getElementsByName('ra_reason');
    const inaTimelinessRadios = document.getElementsByName('ina_timeliness');
    const inaLateReasonRadios = document.getElementsByName('ina_late_reason'); // Added
    const raTimelinessRadios = document.getElementsByName('ra_timeliness');
    const raLateReasonRadios = document.getElementsByName('ra_late_reason'); // Added

    const consultReasonOtherSection = document.getElementById('consult_reason_other_section');
    const consultReasonOtherInput = document.getElementById('consult_reason_other');
    const consultDaysLateSection = document.getElementById('consult_days_late_section');
    const consultDaysLateInput = document.getElementById('consult_days_late');


    const surveyForm = document.getElementById('rd_productivity_form');




    // --- Debug Function ---
    function debugFieldVisibility(field, condition) {
        console.log(`${field} visibility: ${condition}`);
    }

// --- Conditional Logic for Reason for Visit ---
    reasonForVisitRadios.forEach(radio => {
        radio.addEventListener('change', function () {
        // Always clear dependent sections first
            clearDependentSections();

            if (this.value === 'Initial assessment') {
            // Show INA section, hide RA section
                inaSection.style.display = 'block';
                raSection.style.display = 'none';
                outcomeRiskSection.style.display = 'block';

            // Clear RA Reason and dependent fields
                clearSectionInputs(raSection);
                clearSectionInputs(raTimelinessSection);
                clearSectionInputs(raDaysLateSection);

            } else if (this.value === 'Reassessment') {
            // Show RA section, hide INA section
                raSection.style.display = 'block';
                inaSection.style.display = 'none';
                outcomeRiskSection.style.display = 'block';

            // Clear INA Reason and dependent fields
                clearSectionInputs(inaSection);
                clearSectionInputs(inaTimelinessSection);
                clearSectionInputs(inaDaysLateSection);

            } else {
            // Hide both sections if neither INA nor RA are selected
                inaSection.style.display = 'none';
                raSection.style.display = 'none';
                outcomeRiskSection.style.display = 'none';

            // Clear all dependent fields
                clearSectionInputs(inaSection);
                clearSectionInputs(raSection);
                clearSectionInputs(inaTimelinessSection);
                clearSectionInputs(raTimelinessSection);
                clearSectionInputs(inaDaysLateSection);
                clearSectionInputs(raDaysLateSection);
            }
        });
    });



// --- Clear Dependent Sections ---
    function clearDependentSections() {
    // --- INA Sections ---
        [inaTimelinessSection, inaLateReasonSection, inaReasonOtherSection, inaDaysLateSection].forEach(section => {
            if (section) section.style.display = 'none';
        });
        [inaTimelinessRadios, inaLateReasonRadios].forEach(radioGroup => {
            radioGroup.forEach(radio => {
                radio.checked = false;
                radio.required = false;
            });
        });
        if (inaReasonOtherInput) {
            inaReasonOtherInput.value = '';
            inaReasonOtherInput.required = false;
        }
        if (inaDaysLateInput) {
            inaDaysLateInput.value = '';
            inaDaysLateInput.required = false;
        }

    // --- RA Sections ---
        [raTimelinessSection, raLateReasonSection, raReasonOtherSection, raDaysLateSection].forEach(section => {
            if (section) section.style.display = 'none';
        });
        [raTimelinessRadios, raLateReasonRadios].forEach(radioGroup => {
            radioGroup.forEach(radio => {
                radio.checked = false;
                radio.required = false;
            });
        });
        if (raReasonOtherInput) {
            raReasonOtherInput.value = '';
            raReasonOtherInput.required = false;
        }
        if (raDaysLateInput) {
            raDaysLateInput.value = '';
            raDaysLateInput.required = false;
        }

    // --- Consult Sections ---
        [consultReasonSection, consultTimelinessSection, consultLateReasonSection, consultReasonOtherSection, consultDaysLateSection].forEach(section => {
            if (section) section.style.display = 'none';
        });
        [consultTimelinessRadios, consultLateReasonRadios].forEach(radioGroup => {
            radioGroup.forEach(radio => {
                radio.checked = false;
                radio.required = false;
            });
        });
        if (consultReasonOtherInput) {
            consultReasonOtherInput.value = '';
            consultReasonOtherInput.required = false;
        }
        if (consultDaysLateInput) {
            consultDaysLateInput.value = '';
            consultDaysLateInput.required = false;
        }

    // --- Consult Checkboxes ---
        consultReasonCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.required = false;
        });
    }





// --- Conditional Logic for INA Timeliness (Field 8) ---
    inaReasonRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            const isConsult = this.value === 'Consult';
            inaTimelinessSection.style.display = isConsult ? 'none' : 'block';

            if (isConsult) {
            // Hide and clear dependent sections if INA Reason is "Consult"
                inaLateReasonSection.style.display = 'none';
                inaDaysLateSection.style.display = 'none';
                inaReasonOtherSection.style.display = 'none';

                clearSectionInputs(inaTimelinessSection);
                clearSectionInputs(inaLateReasonSection);
                clearSectionInputs(inaDaysLateSection);
                clearSectionInputs(inaReasonOtherSection);
            }
        });
    });

// Ensure INA Days Late clears explicitly when INA Timeliness changes
    inaTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'No') {
                inaDaysLateSection.style.display = 'block';
                inaDaysLateInput.required = true;
            } else {
                inaDaysLateSection.style.display = 'none';
                inaDaysLateInput.required = false;
            inaDaysLateInput.value = ''; // Clear input
        }
    });
    });

// --- Conditional Logic for RA Timeliness (Field 12) ---
    raReasonRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            const isConsult = this.value === 'Consult';
            raTimelinessSection.style.display = isConsult ? 'none' : 'block';

            if (isConsult) {
            // Hide and clear dependent sections if RA Reason is "Consult"
                raLateReasonSection.style.display = 'none';
                raReasonOtherSection.style.display = 'none';
                raDaysLateSection.style.display = 'none';

                clearSectionInputs(raTimelinessSection);
                clearSectionInputs(raLateReasonSection);
                clearSectionInputs(raReasonOtherSection);
                clearSectionInputs(raDaysLateSection);
            }
        });
    });

// Ensure RA Days Late clears explicitly when RA Timeliness changes
    raTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'No') {
                raDaysLateSection.style.display = 'block';
                raDaysLateInput.required = true;
            } else {
                raDaysLateSection.style.display = 'none';
                raDaysLateInput.required = false;
            raDaysLateInput.value = ''; // Clear input
        }
    });
    });

    // --- Conditional Logic for INA Late Reason (Fields 9–11) ---
    inaTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            const isLate = this.value === 'No';
            inaLateReasonSection.style.display = isLate ? 'block' : 'none';
            inaDaysLateSection.style.display = isLate ? 'block' : 'none';

            if (!isLate) {
                clearSectionInputs(inaLateReasonSection);
                clearSectionInputs(inaDaysLateSection);
            }
        });
    });

    inaLateReasonRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'Other') {
                inaReasonOtherSection.style.display = 'block';
            } else {
                inaReasonOtherSection.style.display = 'none';
                clearSectionInputs(inaReasonOtherSection);
            }
        });
    });

    // --- Conditional Logic for RA Late Reason (Fields 13–14) ---
    raTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            const isLate = this.value === 'No';
            raLateReasonSection.style.display = isLate ? 'block' : 'none';

            if (!isLate) {
                clearSectionInputs(raLateReasonSection);
            }
        });
    });

    raLateReasonRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'Other') {
                raReasonOtherSection.style.display = 'block';
            } else {
                raReasonOtherSection.style.display = 'none';
                clearSectionInputs(raReasonOtherSection);
            }
        });
    });

    // --- Utility Function to Clear Section Inputs ---
    function clearSectionInputs(section) {
        const inputs = section.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                input.checked = false;
                input.required = false;
            } else {
                input.value = '';
            }
        });
    }


    // --- Field 15: RA Days Late (Conditional) ---

    raTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'No') {
                raDaysLateSection.style.display = 'block';
                raDaysLateSection.querySelector('input').required = true;
            } else {
                raDaysLateSection.style.display = 'none';
                raDaysLateSection.querySelector('input').required = false;
                raDaysLateSection.querySelector('input').value = ''; // Clear input
            }
        });
    });

// --- Field 16: Consult Reason (Conditional) ---
    const consultReasonSection = document.getElementById('consult_reason_section');
    const consultReasonCheckboxes = document.getElementsByName('consult_reason');

// Validate if at least one checkbox is checked
    function validateConsultReason() {
        const isAnyChecked = Array.from(consultReasonCheckboxes).some(checkbox => checkbox.checked);
        consultReasonCheckboxes.forEach(checkbox => {
        checkbox.required = !isAnyChecked; // Required only if none are checked
    });
    }

// Update visibility and reset validation
    function updateConsultReasonVisibility() {
        const inaReasonSelected = Array.from(inaReasonRadios).some(radio => radio.checked && radio.value === 'Consult');
        const raReasonSelected = Array.from(raReasonRadios).some(radio => radio.checked && radio.value === 'Consult');

        if (inaReasonSelected || raReasonSelected) {
            consultReasonSection.style.display = 'block';
            validateConsultReason();
        } else {
            consultReasonSection.style.display = 'none';
            consultReasonCheckboxes.forEach(checkbox => {
                checkbox.required = false;
            checkbox.checked = false; // Clear selections
        });
        }
    }

// Add event listeners to validate checkboxes dynamically
    consultReasonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateConsultReason);
    });


    // Attach listeners to both ina_reason and ra_reason radios
    inaReasonRadios.forEach(radio => {
        radio.addEventListener('change', updateConsultReasonVisibility);
    });

    raReasonRadios.forEach(radio => {
        radio.addEventListener('change', updateConsultReasonVisibility);
    });

    // --- Field 17: Consult Timeliness (Conditional) ---
    const consultTimelinessSection = document.getElementById('consult_timeliness_section');
    const consultTimelinessRadios = document.getElementsByName('consult_timeliness');

    if (consultTimelinessSection) {
        function updateConsultTimelinessVisibility() {
            const inaReasonSelected = Array.from(inaReasonRadios).some(radio => radio.checked && radio.value === 'Consult');
            const raReasonSelected = Array.from(raReasonRadios).some(radio => radio.checked && radio.value === 'Consult');
            
            if (inaReasonSelected || raReasonSelected) {
                consultTimelinessSection.style.display = 'block';
                consultTimelinessRadios.forEach(radio => radio.required = true);
            } else {
                consultTimelinessSection.style.display = 'none';
                consultTimelinessRadios.forEach(radio => {
                    radio.required = false;
                    radio.checked = false; // Clear selections
                });
            }
        }

        // Attach listeners to both ina_reason and ra_reason radios
        inaReasonRadios.forEach(radio => {
            radio.addEventListener('change', updateConsultTimelinessVisibility);
        });

        raReasonRadios.forEach(radio => {
            radio.addEventListener('change', updateConsultTimelinessVisibility);
        });
    } else {
        console.error('consult_timeliness_section not found in the DOM.');
    }

    // --- Field 18: Consult Late Reason (Conditional) ---
    const consultLateReasonSection = document.getElementById('consult_late_reason_section');
    const consultLateReasonRadios = document.getElementsByName('consult_late_reason');

    function updateConsultLateReasonVisibility() {
        const consultTimelinessSelected = Array.from(consultTimelinessRadios).some(radio => radio.checked && radio.value === 'No');
        
        if (consultTimelinessSelected) {
            consultLateReasonSection.style.display = 'block';
            consultLateReasonRadios.forEach(radio => radio.required = true);
        } else {
            consultLateReasonSection.style.display = 'none';
            consultLateReasonRadios.forEach(radio => {
                radio.required = false;
                radio.checked = false; // Clear selections
            });
        }
    }

    // Attach listeners to consult_timeliness radios
    consultTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', updateConsultLateReasonVisibility);
    });

    // --- Field 19: Consult Reason Other (Conditional) ---

    function updateConsultReasonOtherVisibility() {
        const consultLateReasonSelected = Array.from(consultLateReasonRadios).some(radio => radio.checked && radio.value === 'Other');
        
        if (consultLateReasonSelected) {
            consultReasonOtherSection.style.display = 'block';
            consultReasonOtherInput.required = true;
        } else {
            consultReasonOtherSection.style.display = 'none';
            consultReasonOtherInput.required = false;
            consultReasonOtherInput.value = ''; // Clear input
        }
    }

    // Attach listeners to existing consult_late_reason radios
    consultLateReasonRadios.forEach(radio => {
        radio.addEventListener('change', updateConsultReasonOtherVisibility);
    });

    // --- Field 20: Consult Days Late (Conditional) ---

    function updateConsultDaysLateVisibility() {
        const consultTimelinessSelected = Array.from(consultTimelinessRadios).some(radio => radio.checked && radio.value === 'No');
        
        if (consultTimelinessSelected) {
            consultDaysLateSection.style.display = 'block';
            consultDaysLateInput.required = true;
        } else {
            consultDaysLateSection.style.display = 'none';
            consultDaysLateInput.required = false;
            consultDaysLateInput.value = ''; // Clear input
        }
    }

    // --- Field 21: Education (Conditional) ---
    const educationSection = document.getElementById('education_section');
    const educationCheckboxes = document.getElementsByName('education');

    function updateEducationVisibility() {
        const validReasons = ['Initial assessment', 'Reassessment', 'Brief note'];
        const reasonSelected = Array.from(reasonForVisitRadios).find(radio => radio.checked)?.value;

        if (validReasons.includes(reasonSelected)) {
            educationSection.style.display = 'block';
        } else {
            educationSection.style.display = 'none';
            educationCheckboxes.forEach(checkbox => checkbox.checked = false); // Clear selections
        }
    }

    reasonForVisitRadios.forEach(radio => {
        radio.addEventListener('change', updateEducationVisibility);
    });

    // --- Field 22: Nutrition Support (Always Visible) ---
    // No conditional logic needed; always displayed.

    // --- Field 23: Malnutrition (Conditional) ---
    const malnutritionSection = document.getElementById('malnutrition_section');
    const malnutritionRadios = document.getElementsByName('malnutrition');

    function updateMalnutritionVisibility() {
        const validReasons = ['Initial assessment', 'Reassessment'];
        const reasonSelected = Array.from(reasonForVisitRadios).find(radio => radio.checked)?.value;

        if (validReasons.includes(reasonSelected)) {
            malnutritionSection.style.display = 'block';
        } else {
            malnutritionSection.style.display = 'none';
            malnutritionRadios.forEach(radio => {
                radio.checked = false; // Clear selections
            });
        }
    }

    reasonForVisitRadios.forEach(radio => {
        radio.addEventListener('change', updateMalnutritionVisibility);
    });

    // --- Field 24: Additional Info Optional (Always Visible) ---
    const additionalInfoOptionalCheckboxes = document.getElementsByName('additional_info_optional');

    function clearAdditionalInfoOptional() {
        additionalInfoOptionalCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    // Optional: Clear selections on page load
    window.addEventListener('load', clearAdditionalInfoOptional);


    // Attach listeners to consult_timeliness radios
    consultTimelinessRadios.forEach(radio => {
        radio.addEventListener('change', updateConsultDaysLateVisibility);
    });

    // --- Field 25: Patient Care Time (Always Visible) ---
    const patientCareTimeInput = document.getElementById('patient_care_time');

    function clearPatientCareTime() {
        patientCareTimeInput.value = '';
    }

    // --- Field 26: Formal Meeting Time (Always Visible) ---
    const formalMeetingTimeInput = document.getElementById('formal_meeting_time');

    function clearFormalMeetingTime() {
        formalMeetingTimeInput.value = '';
    }

    // Clear both fields on page load
    window.addEventListener('load', () => {
        clearPatientCareTime();
        clearFormalMeetingTime();
    });


// --- Ensure Initial State is Correct on Page Load ---
    const triggerInitialDisplay = () => {
        [
            reasonForVisitRadios,
            inaTimelinessRadios,
            inaLateReasonRadios,
            raTimelinessRadios,
            raLateReasonRadios,
            consultTimelinessRadios,
            consultLateReasonRadios
            ].forEach(radioGroup => {
                radioGroup.forEach(radio => {
                    if (radio.checked) {
                        radio.dispatchEvent(new Event('change'));
                    }
                });
            });
            // Update required indicators globally
            updateRequiredIndicators();
        };

        // --- Add Required Field Indicator ---
        function updateRequiredIndicators() {
            document.querySelectorAll('.form-field').forEach(field => {
                const label = field.querySelector('label');
                const input = field.querySelector('input, select, textarea');

                if (label && input) {
                    if (input.required) {
                        if (!label.querySelector('.required-indicator')) {
                            label.innerHTML += ' <span class="required-indicator">*</span>';
                        }
                    } else {
                        const indicator = label.querySelector('.required-indicator');
                        if (indicator) {
                            indicator.remove();
                        }
                    }
                }
            });


        }

// Trigger initial indicators after DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            updateRequiredIndicators();
        });


        triggerInitialDisplay();
    });
