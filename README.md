# Medical-Consultation
ITD-110 Final project 
to enchance:
1. Background picture in login
2. change the actual project name "Medical consultation'
3. check it 


Recommended folder structure
Medical-Consultation/
│
├── frontend/
│   ├── index.html              ← your existing HTML (keep as-is)
│   ├── assets/
│   │   └── hospital.jfif
│   └── js/
│       ├── api.js              ← all fetch() calls to backend
│       ├── auth.js             ← login/logout logic
│       └── ui.js               ← switchTab, openModal, closeModal
│
├── backend/
│   ├── server.js               ← Express entry point
│   ├── package.json
│   ├── .env                    ← MONGO_URI + PORT
│   ├── db/
│   │   └── connection.js       ← Mongoose connect
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   ├── Consultation.js
│   │   └── Billing.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── patients.js
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   ├── consultations.js
│   │   └── billing.js
│   └── controllers/
│       ├── authCtrl.js
│       ├── patientCtrl.js
│       ├── doctorCtrl.js
│       ├── appointmentCtrl.js
│       ├── consultationCtrl.js
│       └── billingCtrl.js
│
├── .gitignore
└── README.md