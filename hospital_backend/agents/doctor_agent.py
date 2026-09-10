from hospital_backend.database import doctors


def get_doctor_info():
    return doctors


def add_doctor(name, specialization):
    doctor = {
        "name": name,
        "specialization": specialization
    }

    doctors.append(doctor)

    return doctor
