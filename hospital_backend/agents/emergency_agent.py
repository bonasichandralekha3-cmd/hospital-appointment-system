from database import patients


def check_emergency(patient_name):
    for patient in patients:
        if patient["name"] == patient_name:
            return {
                "patient": patient_name,
                "status": "Emergency case identified"
            }

    return {
        "patient": patient_name,
        "status": "Patient not found"
    }