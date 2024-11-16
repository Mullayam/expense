# Personal Expense Tracker API Documentation

This application is a **Personal Expense Tracker** built to help users manage their expenses effectively.

## Technologies Used

### Frontend

- **React**
- **Redux**
- **Tailwind CSS**

### Backend

- **Node.js**
- **Express**
- **PostgreSQL** 
- **TypeScript**
- **Typeorm**
- **Authorization**

---

### Features

- User Can Set monthly expense limit and an toast notification will trigger if the user’s total expenses approach or exceed monthly limit.
- User Can add/update/delete daily expenses.
- A list of all user’s expenses (can filter via date range , category,income or expense)
- User Can add Income to budget.
- Dashboard : Area Chart, Categories Chart, Monthly Line Chart, Recent Transactions ,Percentage of the monthly limit spent in each category.

## API Routes

### **Authentication Routes**

#### 1. Login

- **Method**: `POST`
- **Endpoint**: `/api/v1/login`
- **Description**: Authenticates the user and returns a JWT token.

#### 2. Register

- **Method**: `POST`
- **Endpoint**: `/api/v1/register`
- **Description**: Creates a new user account.

#### 3. Refresh Token (Disabled)

- **Method**: `GET`
- **Endpoint**: `/api/v1/refresh-token`
- **Description**: Generates a new JWT token for the user.

#### 4. Logout

- **Method**: `GET`
- **Endpoint**: `/api/v1/logout`
- **Description**: Logs out the user by invalidating the token.

---

### **User Management**

#### 1. Get User Details

- **Method**: `GET`
- **Endpoint**: `/api/v1/user`
- **Description**: Retrieves the details of the currently authenticated user.

---

### **Expense Management**

#### 1. Add New Expense

- **Method**: `POST`
- **Endpoint**: `/api/v1/expense`
- **Description**: Adds a new expense to the user's record.

#### 2. Update Expense

- **Method**: `PUT`
- **Endpoint**: `/api/v1/expense/:id`
- **Description**: Updates an existing expense.

#### 3. Get All Expenses

- **Method**: `GET`
- **Endpoint**: `/api/v1/get-expense`
- **Description**: Retrieves a list of all expenses.

#### 4. Get Single Expense

- **Method**: `GET`
- **Endpoint**: `/api/v1/get-expense/:id`
- **Description**: Retrieves details of a specific expense.

---

### **Budget Management**

#### 1. Get Budget Limit

- **Method**: `POST`
- **Endpoint**: `/api/v1/get-budget-limit`
- **Description**: Retrieves the current budget limit.

#### 2. Set Budget Limit

- **Method**: `POST`
- **Endpoint**: `/api/v1/set-budget-limit`
- **Description**: Sets a new budget limit.

#### 3. Update Budget Limit

- **Method**: `PATCH`
- **Endpoint**: `/api/v1/set-budget-limit/:id`
- **Description**: Updates the existing budget limit.

---

### **Category Management**

#### 1. Add New Category

- **Method**: `POST`
- **Endpoint**: `/api/v1/add-expense-category`
- **Description**: Adds a new category for expense tracking.

#### 2. Get Expense Categories

- **Method**: `GET`
- **Endpoint**: `/api/v1/get-expense-category`
- **Description**: Retrieves a list of all expense categories.

#### 3. Delete Category

- **Method**: `DELETE`
- **Endpoint**: `/api/v1/delete-expense-category/:id`
- **Description**: Deletes a specific expense category.

---

### **Analytics**

#### 1. Get Analytics

- **Method**: `GET`
- **Endpoint**: `/api/v1/analytics`
- **Description**: Provides expense analytics for the user.

---

## Project Setup

### Prerequisites

- Node.js (v16 or above)
- MongoDB/PostgreSQL database setup

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/Mullayam/expense.git
```

2. Navigate to the folder:

```bash
   cd expense
```

3. Create a .env file with the required environment variable (for frontend) using the provided `.env.example` file:
4. Install dependencies:
5. Start the React Frontend:
