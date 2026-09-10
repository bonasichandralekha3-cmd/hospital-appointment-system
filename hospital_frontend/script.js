const button = document.getElementById("findAppointment");

button.addEventListener("click", async function () {

    const patientName = document.getElementById("patientName").value;
    const request = document.getElementById("request").value;
    const result = document.getElementById("result");

    if (!patientName || !request) {
        result.innerHTML = "<p>Please enter all details.</p>";
        return;
    }

    result.innerHTML = "<p>Searching for appointment...</p>";

    try {
        const response = await fetch("https://hospital-appointment-system-44cr-jhei4iy4u-brain-bytes6.vercel.app/doctor");

        const doctors = await response.json();

        result.innerHTML = `
            <h3>Available Doctors</h3>
            <p>Patient: ${patientName}</p>
            <p>Request: ${request}</p>
            ${doctors.map(doctor => `
    <div class="doctor-card">
        <h4>👨‍⚕️ ${doctor.name}</h4>
        <p>Specialization: ${doctor.specialization}</p>
        <button onclick="bookAppointment('${doctor.name}', '${patientName}')">
    Book Appointment
</button>
    </div>
`).join("")}
        `;

    } catch (error) {
        result.innerHTML = "<p>Backend connection failed.</p>";
    }
});
async function bookAppointment(doctorName, patientName) {
    const date = prompt("Enter appointment date (YYYY-MM-DD):");
    if (!date) return;

    const time = prompt("Enter appointment time (e.g. 11:00):");
    if (!time) return;

    try {
        const response = await fetch(
            `https://hospital-appointment-system-44cr-jhei4iy4u-brain-bytes6.vercel.app/appointment?patient_name=${encodeURIComponent(patientName)}&doctor_name=${encodeURIComponent(doctorName)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`,
            {
                method: "POST"
            }
        );

        const appointment = await response.json();

        alert(
            `Appointment booked successfully!\n\nPatient: ${appointment.patient_name}\nDoctor: ${appointment.doctor_name}\nDate: ${appointment.date}\nTime: ${appointment.time}`
        );
    } catch (error) {
        alert("Could not book appointment. Please check that the backend is running.");
    }
}
async function loadAppointments() {
    try {
        const response = await fetch("https://hospital-appointment-system-44cr-jhei4iy4u-brain-bytes6.vercel.app/appointment");
        const appointments = await response.json();

        const container = document.getElementById("appointments");

        if (appointments.length === 0) {
            container.innerHTML = "<p>No appointments booked yet.</p>";
            return;
        }

        container.innerHTML = appointments.map(appointment => `
            <div class="appointment-card">
                <h4>📅 ${appointment.patient_name}</h4>
                <p>Doctor: ${appointment.doctor_name}</p>
                <p>Date: ${appointment.date}</p>
                <p>Time: ${appointment.time}</p>
            </div>
        `).join("");
    } catch (error) {
        document.getElementById("appointments").innerHTML =
            "<p>Could not load appointments.</p>";
    }
}

loadAppointments();
async function loadDashboard() {
    try {
        const response = await fetch("https://hospital-appointment-system-44cr-jhei4iy4u-brain-bytes6.vercel.app/dashboard");
        const data = await response.json();

        document.getElementById("totalPatients").textContent = data.total_patients;
        document.getElementById("availableDoctors").textContent = data.available_doctors;
        document.getElementById("totalAppointments").textContent = data.total_appointments;
        document.getElementById("priorityRequests").textContent = data.priority_requests;
    } catch (error) {
        console.log("Dashboard loading failed");
    }
}

loadDashboard();
document.getElementById("checkPriority").addEventListener("click", async function () {
    const priority = document.getElementById("priorityInput").value;

    if (!priority) {
        alert("Please enter a priority");
        return;
    }

    const response = await fetch(
        `https://hospital-appointment-system-44cr-jhei4iy4u-brain-bytes6.vercel.app/priority?priority=${encodeURIComponent(priority)}`
    );

    const result = await response.json();

    document.getElementById("priorityResult").innerHTML =
        `<p><strong>${result.status}</strong></p>`;
});
document.getElementById("checkEmergency").addEventListener("click", async () => {
    const patientName = document.getElementById("emergencyPatient").value;
    
    if (!patientName) {
        alert("Please enter patient name");
        return;
    }

    const response = await fetch(
        `https://hospital-appointment-system-44cr-jhei4iy4u-brain-bytes6.vercel.app/emergency/${encodeURIComponent(patientName)}`
    );

    const result = await response.json();

    document.getElementById("emergencyResult").innerHTML =
        `<p><strong>${result.status}</strong></p>`;
});
async function sendNotification() {
    const message = document.getElementById("notificationMessage").value;

    if (!message) {
        alert("Please enter a notification message");
        return;
    }

    try {
        const response = await fetch(
            `https://hospital-appointment-system-44cr-jhei4iy4u-brain-bytes6.vercel.app/notification?message=${encodeURIComponent(message)}`
        );

        const result = await response.json();

        document.getElementById("notificationResult").innerHTML =
            `<p><strong>${result.status}</strong></p>`;
    } catch (error) {
        document.getElementById("notificationResult").innerHTML =
            "<p>Notification failed. Check backend.</p>";
    }
}

document.getElementById("sendNotification").addEventListener("click", sendNotification);
async function loadDashboard() {
    try {
        const response = await fetch("https://hospital-appointment-system-44cr-jhei4iy4u-brain-bytes6.vercel.app/dashboard");
        const data = await response.json();

        document.getElementById("totalPatients").textContent = data.total_patients;
        document.getElementById("availableDoctors").textContent = data.available_doctors;
        document.getElementById("totalAppointments").textContent = data.total_appointments;
        document.getElementById("priorityRequests").textContent = data.priority_requests;
    } catch (error) {
        console.log("Dashboard error:", error);
    }
}

loadDashboard();
