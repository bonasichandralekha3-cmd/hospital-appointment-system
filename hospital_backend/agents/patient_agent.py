from hospital_backend.database import patients


def get_patient_info():
    return patients


def add_patient(name, age, gender):
    patient = {
        "name": name,
        "age": age,
        "gender": gender
    }

    patients.append(patient)

    return patient
