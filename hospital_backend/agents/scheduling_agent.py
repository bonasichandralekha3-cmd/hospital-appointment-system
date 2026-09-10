from database import appointments


def get_appointments():
    return appointments


def add_appointment(patient_name, doctor_name, date, time):
    appointment = {
        "patient_name": patient_name,
        "doctor_name": doctor_name,
        "date": date,
        "time": time
    }

    appointments.append(appointment)

    return appointment