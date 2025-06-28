# Campus App

Campus App is a mobile application designed to assist college students with placement preparation, semester exam resources, feedback submission, and more. It features user authentication, email verification, admin controls, and a modular dashboard interface.

---

## Features

- Secure Authentication
  - Email + Password Signup
  - Email Verification via OTP
  - JWT-based Login
  - Forgot Password with Email Reset Link
  - Resend OTP functionality

- User Dashboard
  - College Placement
  - Learning Resources
  - Semester Prep
  - Feedback System

- Admin Dashboard
  - Add Admin
  - Add Placement Questions

- Profile Image
  - Auto-generated avatars using DiceBear API

---

## Tech Stack

### Frontend (React Native)
- react-native
- axios
- @react-native-async-storage/async-storage  //IN PROGRESS
- react-navigation
- @env for environment config

### Backend (Node.js + Express)
- express
- mongoose
- bcrypt
- jsonwebtoken
- nodemailer
- dotenv
- cron (to keep Render backend awake)

### Deployment
- Backend: Render
- Frontend: Built into standalone APK for Android

---

## Getting Started

### Backend Setup

git clone https://github.com/pikachusensei/Radon001.git
cd backend
npm install
touch .env

### Frontend Setup
cd ../frontend
npm install
touch .env


### Run on Android
npx react-native run-android

### APK Build
cd android
./gradlew assembleRelease


You can now share and install the APK without USB connection.


...

## Author

Shreyansh Singh  
GitHub: [@pikachusensei](https://github.com/pikachusensei)  
Email: sshreyansh962@gmail.com

## License

This project is licensed under the MIT License.

