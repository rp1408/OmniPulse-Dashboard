# OmniPulse Dashboard

A sophisticated, feature-rich dashboard application built with **React**, **Vite**, and **Tailwind CSS**. This dashboard provides a unified interface for managing multiple social media platforms, business analytics, and marketplace operations.

## 🚀 Features

- **Multi-Platform Integration**:
  - **Facebook Dashboard**: Specialized view for Facebook business metrics and interactions.
  - **Instagram Dashboard**: Dedicated interface for Instagram engagement and content management.
  - **Meta Camping**: Manage and track Meta ad campaigns efficiently.
- **Role-Based Views**:
  - **Admin View**: Comprehensive controls for platform administrators.
  - **Customer View**: Tailored experience for end-users.
  - **Vendor View**: Specific tools and analytics for business vendors.
- **Operations & Management**:
  - **Marketplace**: Integrated marketplace for product or service management.
  - **Schedule**: Advanced scheduling system for posts and tasks.
  - **Timer**: Built-in productivity and event tracking timer.
- **Authentication**: Secure authentication flow using Context API and external providers.
- **Advanced Visualizations**: Interactive charts and data representations using Nivo, Chart.js, and Recharts.
- **Premium UI/UX**:
  - Responsive layout with **Tailwind CSS**.
  - Modern UI components from **Chakra UI**, **Material UI**, **Ant Design**, and **Shadcn UI**.
  - Smooth animations powered by **Framer Motion** and **GSAP**.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)
- **UI Libraries**: Chakra UI, MUI, Ant Design, Shadcn UI, Lucide React, React Icons
- **State Management**: Redux Toolkit, Recoil, Zustand
- **Form Handling**: React Hook Form, Formik, Zod, Yup
- **Charts**: Nivo, Chart.js, Recharts, React Chartjs 2
- **Animations**: Framer Motion, GSAP, React Spring
- **Utilities**: Axios, Classnames, Firebase, Notistack, React Player, React Toastify

## 📦 Project Structure

```text
Dashboard/
├── src/
│   ├── Components/        # Functional React components
│   │   ├── AdminView.jsx
│   │   ├── Facebookdash.jsx
│   │   ├── Instagramdash.jsx
│   │   ├── Home.jsx
│   │   └── ...
│   ├── assets/            # Static assets (images, icons)
│   ├── AuthContext.jsx   # Authentication context provider
│   ├── main.jsx          # Entry point and routing
│   ├── App.css           # Global styles
│   ├── index.css         # Tailwind directives
│   └── ...
├── public/                # Public assets
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

- **Development Mode**:

  ```bash
  npm run dev
  ```

  The app will be available at `http://localhost:5173`.

- **Production Build**:

  ```bash
  npm run build
  ```

- **Preview Production Build**:

  ```bash
  npm run preview
  ```

- **Linting**:
  ```bash
  npm run lint
  ```

## 🧪 Testing

The project includes setup for:

- **Unit Testing**: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **End-to-End Testing**: [Cypress](https://www.cypress.io/)

## 📄 License

This project is private and for internal use only.
