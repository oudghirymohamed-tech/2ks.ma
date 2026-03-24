# 2ks Project Copilot Instructions

## Project Overview
2ks is a medical platform connected to an NFC medical card.
When a patient taps the NFC card on a phone, the platform opens instantly.

The project is currently a demo for a startup presentation at GITEX.
The goal is to create a professional, clean, fast, and convincing demo.

## Main Demo Goal
The demo must clearly show:
- a landing page
- an urgent/emergency button
- a "plus d'informations" button
- patient login
- new user registration
- OTP verification for new users
- support for Arabic and English
- a clean patient dashboard
- a logout button
- smooth navigation back to the home page

## Core Product Logic
The NFC card should direct the user to the platform.
The first visible experience must be simple and impressive.

The landing page must prioritize two actions:
1. Urgent
2. Plus d'informations

### Urgent Button
The urgent button is for emergency situations.
It should quickly display critical patient information such as:
- blood type
- chronic diseases
- allergies
- emergency notes

This view must be fast, minimal, and readable.
Do not overload the urgent page with too much information.

### Plus d'informations Button
This button should lead to the main platform experience:
- login
- registration
- patient account access
- access to medical records and uploaded files

## User Roles
There are at least two user roles:
- Patient
- Doctor

The demo can focus primarily on the patient experience, but code structure should be ready for doctor access in the future.

## Registration Rules
For a new patient registration:
- require OTP verification by phone
- registration flow must feel secure and modern
- validate inputs carefully
- handle invalid or missing data gracefully

## Card Purchase Logic
Before creating an account, the platform may require the patient to get the NFC card first.

Support one or both demo flows:
1. The user buys the NFC card before account creation
2. The user can contact support through WhatsApp or phone number to request the card

When generating UI, include a clear and professional card acquisition step before full registration if relevant.

## Dashboard Requirements
The patient dashboard should be simple and modern.
Include:
- profile summary
- uploaded medical files
- important medical info
- navigation menu
- logout button
- link to home page

The dashboard should feel like a real product, not a school project.

## Medical File Handling
The platform should support medical file organization such as:
- analysis reports
- radiology files
- ECG documents
- prescriptions
- other medical documents

Generate clean UI for file upload and display.
Use categories when appropriate.
Do not make the interface crowded.

## Design Style
Use a professional medical-tech startup style.
The interface must feel:
- modern
- minimal
- trustworthy
- fast
- mobile-friendly
- demo-ready

Prefer elegant spacing, clear hierarchy, rounded components, and readable typography.

Avoid:
- cluttered layouts
- childish colors
- overly complex UI
- unnecessary animations
- generic template feeling

## Color and Branding
Use a medical startup visual style.
Prioritize clarity and trust.
Keep the design premium and polished for exhibition/demo presentation.

## Languages
The platform must support:
- Arabic
- English

All generated UI should be designed with multilingual support in mind.
Support RTL for Arabic properly.
Do not hardcode layout assumptions that break Arabic support.

## Frontend Standards
- Use clean, modular, reusable components
- Prefer TypeScript for frontend code
- Write readable and maintainable code
- Use clear naming
- Keep components small and focused
- Add helpful comments only where logic is not obvious

## UX Standards
Always optimize for:
- first impression during live demo
- clarity of navigation
- fast understanding
- mobile responsiveness
- accessibility of important actions

The urgent button must always be easy to find.

## Security and Data Handling
This project deals with sensitive medical information.
Generated code must:
- validate all user inputs
- avoid insecure patterns
- separate urgent public info from protected private info
- use safe authentication patterns
- avoid exposing sensitive data unnecessarily

## Code Generation Behavior
When generating code for this project:
- always align with the 2ks medical NFC concept
- prefer simple and robust solutions
- avoid unnecessary complexity
- think in terms of a startup demo that can later evolve into a real product
- keep the project structure scalable for future expansion

## Demo Priority
For the current phase, prioritize what looks strong in a live demo:
- landing page
- urgent flow
- plus d'informations flow
- login/register
- OTP verification
- patient dashboard
- bilingual support
- professional UI polish

## Navigation Rules
Important navigation items may include:
- Accueil / Home
- Urgent
- Plus d'informations
- Login
- Register
- Dashboard
- Logout

Navigation should always be clear and consistent.

## What Copilot Should Avoid
- Do not generate random generic healthcare templates without the NFC logic
- Do not ignore the urgent emergency use case
- Do not build messy interfaces
- Do not produce low-quality placeholder UX
- Do not forget Arabic/English support
- Do not ignore mobile-first responsiveness

## Expected Output Quality
All generated code, components, pages, and flows should feel production-minded, investor-ready, and suitable for a professional startup demo at GITEX.