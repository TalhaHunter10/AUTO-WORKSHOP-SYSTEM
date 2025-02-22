# Auto Workshop Management System (MERN Stack)

A full-featured MERN stack app for managing auto workshop appointments, inventory, finances, and customer queries.

### Overview

The Auto Workshop Management System is a complete MERN stack web application designed to streamline the operations of automobile workshops. It offers a user-friendly interface for scheduling appointments, managing car parts inventory, tracking financial transactions, and answering customer queries via an integrated chatbot. The system aims to enhance workshop efficiency by providing a seamless experience for both the workshop staff and customers.

### Technology

- **Frontend**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Ant Design](https://ant.design/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [JWT (JSON Web Token)](https://jwt.io/)
- **State Management**: React Context API
- **File Storage**: Images stored as byte arrays in MongoDB
- **Chatbot**: Python backend with Excel data integration

## Environment Variables

To run this project, you will need to add the following environment variables to your

**server .env file**

`PORT =`

`MONGO_URI =`

`NODE_ENV=development`

`JWT_SECRET =`

`OPENAI_API_KEY= <Your_OpenAI_key>`

`EMAIL_HOST = smtp.gmail.com`

`EMAIL_USER = <your_gmail_address>`

`EMAIL_PASS = <your_gmail_password>`

`FRONTEND_URL = <url:port>`

**client .env file**

`REACT_APP_BACKEND_URL = <url:port>`

## Initializing Project

Create a clone of this project and open the root folder in the terminal.

### For Chatbot (Python)

**Install python** first in your system. Open cmd and type the following :

```cmd
  python --version
```

this will verify the installation by displaying the current installed version.
Then type the following command to install the required libraries :

```cmd
 pip install langchain_openai langchain_community faiss-cpu
```

```cmd
 pip install pandas python-dotenv
```

Chatbot is all set up.

### For WebApp

**Open separate terminals for client and server.**

Run the following command in both terminals.

```bash
  npm install
```

In case of any issue with dependencies, run :

```bash
  npm install --legacy-peer-deps
```

Now start both client and server using :

```bash
  npm start
```

If any issue arises, install or update the relevant package.

## Admin API

To create the admin (Workshop Manager) account use postman to target the following api with the specific data below.

#### Get all items

Replace <url:port> below with your url and backend server port e.g localhost:8080

```http
  POST <url:port>/api/auth/register_wm
```

x-www-form-urlencoded :

| Key        | Value    |
| :--------- | :------- |
| `name`     | `string` |
| `email`    | `string` |
| `phoneno`  | `string` |
| `password` | `string` |

**Password should be greater than 6 digits**

## Features

### For Users

- **Appointment Booking**

  - Easily schedule appointments for vehicle services.
  - Enter car details including car name and number.
  - Add a description of the issue or service request.
  - View the status of appointments (Pending, Approved, Completed).

- **Appointment History**

  - View upcoming appointments and service history.
  - Check the status of each booking.
  - Receive update emails for appointment changes.

- **Chatbot Support**

  - Get automated responses for common vehicle issues.
  - Immediate help for basic troubleshooting tips.

- **User Profile Management**

  - Create and update personal profile.

- **Browse Parts**

  - Browse and view available parts and their prices.

- **Reviews**
  - Can give reviews on previously completed jobs.

### For Workshop Manager

- **Comprehensive Dashboard**

  - Get an overview of appointments and financial metrics.
  - Analytics for monthly and weekly new users.

- **Appointment Management**

  - View, approve, or decline service appointments.
  - Update the status of each appointment (In Progress, Completed).
  - Filter and sort appointments by date, status, or customer.

- **Inventory Management**

  - Add, edit, and delete car parts from the inventory.
  - Track stock levels and prices.

- **Financial Tracking**

  - Record incoming payments and expenses.
  - View transaction history with filters for date, category, and payment method.

- **Accounts Management**

  - Add and remove more workshop managers that can access admin features.

- **View Reviews**
  - View all the reviews of the clients that have gotten their jobs completed.

## Sample Views

### Landing Page

![Landing Page 1](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/landing1.png?raw=true)

![Landing Page 2](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/landing2.png?raw=true)

![Landing Page 3](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/landing3.png?raw=true)

![Landing Page 4](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/landing4.png?raw=true)

![Landing Page 5](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/landing5.png?raw=true)

### Login Page

![Login View](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/login.png?raw=true)

### Register Page

![Signup View](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/register.png?raw=true)

### Forgot Password

![Forgot Password View](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/forgot%20password.png?raw=true)

### Chat-Bot

![Chat Bot View](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/empty%20chat.png?raw=true)

![Chat Bot processing](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/chatprogress.png?raw=true)

![Chat Bot Results](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/chat%20result.png?raw=true)

### Services

![Services View](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/services.png?raw=true)

### Book Appointment

![Book Appointment View](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/Book%20appointment.png?raw=true)

### My Appointments

![My Appointments View](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/my%20appointments.png?raw=true)

### Admin Dashboard

![Admin Dasboard](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/admin%20dashboard.png?raw=true)

### Handle Appointments

![Handle Appointments](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/handle%20appointments.png?raw=true)

### Track Finances

![Track Finances](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/track%20finances.png?raw=true)

### Account Management

![Account Management](https://github.com/TalhaHunter10/AUTO-WORKSHOP-SYSTEM/blob/main/Sample%20Views/account%20management.png?raw=true)

## FAQ

1. **How to login as Admin once we have created it using postman ?**
   -Whenever you login using the admin credentials, the system opens the admin dashboard as there is no normal view for the admin.

2. **What is the Auto Workshop Management System?**

   - It’s a web application designed to help automobile workshops manage their operations, including appointments, inventory, financial tracking, and customer support.

3. **Who can use this system?**

   - The system is designed for both workshop managers and customers. Workshop managers can use it for managing operations, while customers can use it for booking appointments and getting support.

4. **How do I book an appointment?**

   - Simply create an account, navigate to the 'Book Appointment' section, provide your car details and problem description, and submit the request.

5. **Can I edit or cancel an appointment after booking?**

   - Yes, you can edit or cancel your appointment from your dashboard, provided the appointment status is still pending.

6. **How is my data secured?**

   - We use JWT (JSON Web Token) for secure user authentication, and all sensitive information, like passwords, is encrypted using bcrypt.

7. **How do I reset my password if I forget it?**

   - Click on the ‘Forgot Password’ link on the login page. You’ll receive an email with instructions to reset your password.

8. **Where do I get the OpenAI API key?**
   - To get an OpenAI API key, follow these steps:
     1. Go to [OpenAI's platform website](https://platform.openai.com/).
     2. Log in with your OpenAI account, or sign up if you don't have one.
     3. Navigate to the **API Keys** section in your account settings.
     4. Click on **Create new secret key**, then copy and save it in a secure place.

**Important:** Keep your API key private. Do not expose it in your code or public repositories.
