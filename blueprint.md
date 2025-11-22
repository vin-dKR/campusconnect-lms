# Project Blueprint

## Overview

This project is a student and admin dashboard application. Students can log in to view their information, while admins can manage student data.

## Features

*   **Authentication:** Secure login for students and admins using Supabase.
*   **Login Page:** A dedicated page for users to sign in or sign up.
*   **Middleware:** Route protection to redirect unauthenticated users to the login page.
*   **Server Actions:** A server action for handling user sign-out.
*   **`useUser` Hook:** A reusable hook to access user and session information within components.
*   **Student Dashboard:** View personal information, grades, and course schedules.
*   **Admin Dashboard:** Manage student accounts, view analytics, and update course information.

## Design

*   **Styling:** The application will use Tailwind CSS for a modern and responsive design.
*   **Components:** Reusable UI components will be built using shadcn.

## Current Plan

*   Build out the student and admin dashboards.
*   Connect the application to a Supabase database to manage student data.
