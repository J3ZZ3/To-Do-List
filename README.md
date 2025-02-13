# TaskMaster

TaskMaster is a modern task management web application built with React and Supabase, featuring a sleek user interface with animated smoke backgrounds and intuitive task organization capabilities.

## Features

- **User Authentication**
  - Secure email/password authentication
  - Protected routes for authenticated users
  - User profile management with avatar support

- **Task Management**
  - Create, read, update, and delete tasks
  - Task prioritization (High, Medium, Low)
  - Task status tracking (Pending, In Progress, Completed)
  - Due date management
  - Task filtering and search capabilities

- **Visual Features**
  - Animated smoke background
  - Responsive design for all screen sizes
  - Progress tracking with visual indicators
  - Task statistics and productivity scoring
  - Deadline notifications

- **User Experience**
  - Intuitive drag-and-drop interface
  - Real-time updates
  - Custom alert system
  - Loading indicators

## Technology Stack

- **Frontend**
  - React.js
  - React Router for navigation
  - React Spring for animations
  - CSS3 with custom animations

- **Backend**
  - Supabase for database and authentication
  - File storage for avatars

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/J3ZZ3/To-Do-List.git
   cd To-Do-List
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:

   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:

   ```bash
   npm start
   ```

### Database Setup

The application requires the following Supabase tables:

1. `profiles`
   - `id` (uuid, primary key)
   - `username` (text)
   - `avatar_url` (text)
   - `updated_at` (timestamp)

2. `tasks`
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key to profiles)
   - `name` (text)
   - `definition` (text)
   - `priority` (text)
   - `status` (text)
   - `due_date` (timestamp)
   - `created_at` (timestamp)
   - `completed_at` (timestamp)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Main application pages
├── utils/              # Utility functions
└── styles/             # Global styles
```

## Key Components

- `AuthContext`: Manages authentication state
- `TaskList`: Main task display and management
- `TaskForm`: Task creation and editing
- `TaskStats`: Analytics and statistics
- `SmokeBackground`: Animated background effect


## Acknowledgments

- React team for the amazing framework
- Supabase team for the backend infrastructure


