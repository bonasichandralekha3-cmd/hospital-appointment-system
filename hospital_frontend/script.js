const API_URL = "https://hospital-appointment-system-44cr.vercel.app";


// ==========================================
// FIND APPOINTMENT / FIND DOCTOR
// ==========================================

const button = document.getElementById("findAppointment");

if (button) {
    button.addEventListener("click", async function () {

        const patientName =
            document.getElementById("patientName").value;

        const request =
            document.getElementById("request").value;

        const result =
            document.getElementById("result");

        if (!patientName || !request) {
            result.innerHTML =
                "<p>Please enter all details.</p>";
            return;
        }

        result.innerHTML =
            "<p>Searching for appointment...</p>";

        try {

            const response =
                await fetch(`${API_URL}/doctor`);

            if (!response.ok) {
                throw new Error("Doctor API failed");
            }

            const doctors =
                await response.json();

            result.innerHTML = `
                <h3>Available Doctors</h3>

                <p>Patient: ${patientName}</p>
                <p>Request: ${request}</p>

                ${doctors.map(doctor => `
                    <div class="doctor-card">

                        <h4>👨‍⚕️ ${doctor.name}</h4>

                        <p>
                            Specialization:
                            ${doctor.specialization}
                        </p>

                        <button
                            onclick="bookAppointment(
                                '${doctor.name}',
                                '${patientName}'
                            )">
                            Book Appointment
                        </button>

                    </div>
                `).join("")}
            `;

        } catch (error) {

            console.error(
                "Backend connection error:",
                error
            );

            result.innerHTML =
                "<p>Backend connection failed.</p>";
        }
    });
}


// ==========================================
// BOOK APPOINTMENT
// ==========================================

async function bookAppointment(
    doctorName,
    patientName
) {

    const date =
        prompt(
            "Enter appointment date (YYYY-MM-DD):"
        );

    if (!date) {
        return;
    }

    const time =
        prompt(
            "Enter appointment time (e.g. 11:00):"
        );

    if (!time) {
        return;
    }

    try {

        const url =
            `${API_URL}/appointment` +
            `?patient_name=${encodeURIComponent(patientName)}` +
            `&doctor_name=${encodeURIComponent(doctorName)}` +
            `&date=${encodeURIComponent(date)}` +
            `&time=${encodeURIComponent(time)}`;

        const response =
            await fetch(url, {
                method: "POST"
            });

        if (!response.ok) {
            throw new Error(
                "Appointment booking failed"
            );
        }

        const appointment =
            await response.json();

        alert(
            "Appointment booked successfully!\n\n" +
            "Patient: " +
            appointment.patient_name +
            "\nDoctor: " +
            appointment.doctor_name +
            "\nDate: " +
            appointment.date +
            "\nTime: " +
            appointment.time
        );

        loadAppointments();
        loadDashboard();

    } catch (error) {

        console.error(
            "Appointment error:",
            error
        );

        alert(
            "Could not book appointment. " +
            "Please check the backend."
        );
    }
}


// ==========================================
// LOAD APPOINTMENTS
// ==========================================

async function loadAppointments() {

    const container =
        document.getElementById("appointments");

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/appointment`
            );

        if (!response.ok) {
            throw new Error(
                "Appointments API failed"
            );
        }

        const appointments =
            await response.json();

        if (appointments.length === 0) {

            container.innerHTML =
                "<p>No appointments booked yet.</p>";

            return;
        }

        container.innerHTML =
            appointments.map(appointment => `
                <div class="appointment-card">

                    <h4>
                        📅 ${appointment.patient_name}
                    </h4>

                    <p>
                        Doctor:
                        ${appointment.doctor_name}
                    </p>

                    <p>
                        Date:
                        ${appointment.date}
                    </p>

                    <p>
                        Time:
                        ${appointment.time}
                    </p>

                </div>
            `).join("");

    } catch (error) {

        console.error(
            "Appointments error:",
            error
        );

        container.innerHTML =
            "<p>Could not load appointments.</p>";
    }
}


// Load appointments when page opens
loadAppointments();


// ==========================================
// DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        const response =
            await fetch(
                `${API_URL}/dashboard`
            );

        if (!response.ok) {
            throw new Error(
                "Dashboard API failed"
            );
        }

        const data =
            await response.json();

        const totalPatients =
            document.getElementById(
                "totalPatients"
            );

        const availableDoctors =
            document.getElementById(
                "availableDoctors"
            );

        const totalAppointments =
            document.getElementById(
                "totalAppointments"
            );

        const priorityRequests =
            document.getElementById(
                "priorityRequests"
            );


        if (totalPatients) {
            totalPatients.textContent =
                data.total_patients;
        }

        if (availableDoctors) {
            availableDoctors.textContent =
                data.available_doctors;
        }

        if (totalAppointments) {
            totalAppointments.textContent =
                data.total_appointments;
        }

        if (priorityRequests) {
            priorityRequests.textContent =
                data.priority_requests;
        }

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );
    }
}


// Load dashboard when page opens
loadDashboard();


// ==========================================
// PRIORITY CHECK
// ==========================================

const priorityButton =
    document.getElementById(
        "checkPriority"
    );

if (priorityButton) {

    priorityButton.addEventListener(
        "click",
        async function () {

            const priority =
                document.getElementById(
                    "priorityInput"
                ).value;

            const result =
                document.getElementById(
                    "priorityResult"
                );

            if (!priority) {

                alert(
                    "Please enter a priority"
                );

                return;
            }

            try {

                const response =
                    await fetch(
                        `${API_URL}/priority?priority=${encodeURIComponent(priority)}`
                    );

                if (!response.ok) {
                    throw new Error(
                        "Priority API failed"
                    );
                }

                const data =
                    await response.json();

                result.innerHTML =
                    `<p>
                        <strong>
                            ${data.status}
                        </strong>
                    </p>`;

            } catch (error) {

                console.error(
                    "Priority error:",
                    error
                );

                result.innerHTML =
                    "<p>Priority check failed.</p>";
            }
        }
    );
}


// ==========================================
// EMERGENCY CHECK
// ==========================================

const emergencyButton =
    document.getElementById(
        "checkEmergency"
    );

if (emergencyButton) {

    emergencyButton.addEventListener(
        "click",
        async function () {

            const patientName =
                document.getElementById(
                    "emergencyPatient"
                ).value;

            const result =
                document.getElementById(
                    "emergencyResult"
                );

            if (!patientName) {

                alert(
                    "Please enter patient name"
                );

                return;
            }

            try {

                const response =
                    await fetch(
                        `${API_URL}/emergency/${encodeURIComponent(patientName)}`
                    );

                if (!response.ok) {
                    throw new Error(
                        "Emergency API failed"
                    );
                }

                const data =
                    await response.json();

                result.innerHTML =
                    `<p>
                        <strong>
                            ${data.status}
                        </strong>
                    </p>`;

            } catch (error) {

                console.error(
                    "Emergency error:",
                    error
                );

                result.innerHTML =
                    "<p>Emergency check failed.</p>";
            }
        }
    );
}


// ==========================================
// SEND NOTIFICATION
// ==========================================

async function sendNotification() {

    const message =
        document.getElementById(
            "notificationMessage"
        ).value;

    const result =
        document.getElementById(
            "notificationResult"
        );

    if (!message) {

        alert(
            "Please enter a notification message"
        );

        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/notification?message=${encodeURIComponent(message)}`
            );

        if (!response.ok) {
            throw new Error(
                "Notification API failed"
            );
        }

        const data =
            await response.json();

        result.innerHTML =
            `<p>
                <strong>
                    ${data.status}
                </strong>
            </p>`;

    } catch (error) {

        console.error(
            "Notification error:",
            error
        );

        result.innerHTML =
            "<p>Notification failed. Check backend.</p>";
    }
}


// Notification button
const notificationButton =
    document.getElementById(
        "sendNotification"
    );

if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        sendNotification
    );
}
