# Next Production Steps

## Product

- Replace demo copy placeholders with validated product messaging in FR, EN, and AR.
- Add real user journeys for card ordering, re-issuance, and family management.
- Expand emergency profiles for pregnancy, organ donor status, and condition-specific flags.

## Backend

- Connect Express services to a real backend data store.
- Move protected medical data behind backend authorization and audit policies.
- Add schema validation for every request and response.
- Add structured logging, rate limiting, and abuse protection.
- Implement real OTP provider and professional verification workflows.

## Security

- Add authentication and RBAC for patient, professional, partner, and admin roles.
- Add immutable audit trails for protected-data access.
- Add environment-specific secret management.
- Add privacy consent records and data export / deletion workflows.

## Frontend

- Replace client fallback mocks with controlled staging fixtures only.
- Add proper form validation and error handling states.
- Add route-level loading and empty-state components.
- Add richer Arabic localization and right-to-left polish across all pages.

## Infrastructure

- Add Vercel and Railway deployment configs.
- Add CI checks for lint, typecheck, and build.
- Add staging-demo environment variables and preview URLs.
- Add monitoring, uptime checks, and analytics for demo/staging.

## Data And Integrations

- Integrate Supabase for persisted patient and professional records.
- Integrate Redis for OTP/session throttling and ephemeral access windows.
- Integrate Resend or equivalent for notifications and audit emails.
- Add webhook-safe architecture for partner integrations.

## Compliance And Ops

- Define data retention, consent, and access review policies.
- Document emergency escalation workflows.
- Add operator playbooks for suspicious access investigations.
- Prepare legal review for demo-to-production transition.
