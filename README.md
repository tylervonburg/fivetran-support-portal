# Fivetran L1 Support Agent Prototype

This is a static front-end prototype of the Fivetran L1 Support AI Agent experience.

It is designed for GitHub Pages and demonstrates:

- AI-first support intake on the `Home` view
- direct human ticket bypass
- support routing and required intake collection
- security-sensitive escalation behavior
- safe refusal for internal-only and other-customer data requests
- a `My Tickets` experience with mock open and closed support tickets
- ticket detail and reply-thread mockups

## Files

- `index.html`: main GitHub Pages entrypoint
- `styles.css`: visual styling and layout
- `app.js`: front-end interaction logic and mock state machine behavior

## What This Prototype Is

- A static demo of the support experience
- A UI prototype for review, feedback, and sharing
- A way to demonstrate the interaction model without a backend

## What This Prototype Is Not

- Not a production support system
- Not connected to a real LLM
- Not connected to real customer accounts or ticketing systems
- Not suitable for real support operations without backend services, auth, logging, and policy enforcement

## Run Locally

Open `index.html` in a browser.

## Prototype Features

### Home

- Quick scenario buttons for common support flows
- chat-first customer interaction
- runtime state panel
- intake checklist
- escalation preview

### My Tickets

- mock list of account-associated support tickets
- status filters
- ticket detail view
- mock customer-visible reply thread

## Notes for Reviewers

- All ticket data is mock data.
- All support logic is simulated in the browser.
- The prototype intentionally demonstrates policy behaviors such as:
  - human bypass availability
  - security-sensitive escalation
  - refusal to expose internal or other-customer data
