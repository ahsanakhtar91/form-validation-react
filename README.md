# 📝 Form Validation (React App)

A sleek and responsive form example built with **React**, **TypeScript**, and **Ant Design**. It includes comprehensive form validation, real-time error handling with meaningful user feedback, and simulates a delayed API call during form submission for realistic behavior.

⚛️ **Live Demo**: https://form-validation-react-demo.netlify.app

---

## 🔧 Tech Stack
- **React**
- **TypeScript**
- **Ant Design** (for appealing UI components)
- **React Hook Form** (for efficient form state management)
- **Yup** (for comprehensive schema validation)

---

## ✨ Key Features

- **Real-time Validation**: Utilized **React Hook Form** for efficient form state management and **Yup** for schema-based validation with immediate feedback.
- **Modern UI/UX**: Beautiful **Ant Design** based components with smooth animations.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices, these breakpoints are implemented:
  - Desktop: 1025px and above
  - Tablet: 769px - 1024px
  - Mobile: 768px and below
  - Small Mobile: 480px and below
- **Mock API Call**: Mocks an API call to simulate form submission, displaying a loading state for one second before completing the process.
- **Error Handling**: Informative error messages are displayed to provide meaningful user feedback.
- **Success State**: A well-designed `Success` component animates into view when the form is successfully submitted (after all validations have passed).

---

## 📋 Form Fields & Validation Rules

- **First Name** (Required)
  - Minimum 2 characters, maximum 100 characters
  - Only letters and spaces allowed
  - Strict validation

- **Last Name** (Required)
  - Same validation rules as First Name
  - Ensures proper name formatting

- **Origin Country** (Required)
  - Dropdown with 200+ countries
  - OPEC member countries are highlighted
  - Searchable with keyboard

- **Project Code** (Required)
  - Format: `ABCD-1234` (4 uppercase letters + hyphen + 4 digits)
  - Example: `PROJ-2024`, `TEST-1234`
  - Strict pattern validation

- **Description** (Optional)
  - Maximum 150 characters
  - Multi-line text area

- **Payment Amount** (Required)
  - Positive numbers only
  - Decimal precision up to 2 places
  - Automatic number formatting with commas

- **Payment Currency** (Required)
  - 3-letter currency codes
  - Example: `USD`, `EUR`
  - 200+ currencies with full names
  - **Special Condition:** `USD` is auto-selected (cannot be changed) if `Origin Country` is an OPEC country
  - Searchable dropdown (filters currency codes as you type)

- **Validity Start Date** (Required)
  - Must be at least 15 days from current date
  - Prevents immediate start dates
  - Uses `DatePicker` from `Ant Design` (with calendar interface) to pick dates

- **Validity End Date** (Required)
  - Must be 1-3 years after start date
  - Cross-field validation with start date
  - Ensures reasonable project duration

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── FormInput/                  # Reusable input component (renders text, number, textarea, or date fields based on the specified type)
│   ├── FormDropdown/               # Dropdown component (renders select field)
│   ├── FinancingRequestForm/       # Main form component (uses FormInput, FormDropdown and Button components to render itself)
│   └── Success/                    # Success component appears when the form data is submitted successfully (after all validations passed)
├── schemas/
│   └── financingRequestSchema.ts   # Yup validation schema lives here (all validation rules are implemented here)
├── constants/
│   └── constants.ts                # Full list of countries, currencies, and field labels (countries and currencies populate the form dropdowns)
└── App.tsx                         # Main application component
```

---

## 🚀 Steps to run the app

### Prerequisites

- **Node** >= 16.0.0
- **Yarn** package manager

### Clone & Run

```bash
# Clone the repository
git clone git@github.com:ahsanakhtar91/form-validation-react.git

# Navigate to project directory
cd form-validation-react

# Install dependencies
yarn install

# Start development server
yarn start

# Access the application
# Open http://localhost:3000 in your browser
```

---

## 👨‍💻 Created By

**Ahsan Akhtar**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin)](https://www.linkedin.com/in/m-ahsan-akhtar) [![GitHub](https://img.shields.io/badge/GitHub-black?logo=github)](https://github.com/ahsanakhtar91)