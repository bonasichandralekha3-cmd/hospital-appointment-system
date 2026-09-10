from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import patients,doctors,appointments

from agents.patient_agent import get_patient_info, add_patient
from agents.doctor_agent import get_doctor_info, add_doctor
from agents.scheduling_agent import get_appointments, add_appointment 
from agents.emergency_agent import check_emergency
from agents.notification_agent import send_notification
from agents.priority_agent import check_priority

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Hospital Backend is running"}


@app.get("/patient")
def patient():
    return get_patient_info()


@app.post("/patient")
def create_patient(name: str, age: int, gender: str):
    return add_patient(name, age, gender)


@app.get("/doctor")
def doctor():
    return get_doctor_info()


@app.post("/doctor")
def create_doctor(name: str, specialization: str):
    return add_doctor(name, specialization)


@app.get("/appointment")
def appointment():
    return get_appointments()


@app.post("/appointment")
def create_appointment(
    patient_name: str,
    doctor_name: str,
    date: str,
    time: str
):
    return add_appointment(
        patient_name,
        doctor_name,
        date,
        time
    )

@app.get("/emergency/{patient_name}")
def emergency(patient_name: str):
    return check_emergency(patient_name)

@app.get("/notification")
def notification(message: str):
    return send_notification(message)

@app.get("/priority")
def priority(priority: str):
    return check_priority(priority)

@app.get("/dashboard")
def dashboard():
    return {
        "total_patients": len(patients),
        "available_doctors": len(doctors),
        "total_appointments": len(appointments),
        "priority_requests": 0
    }

