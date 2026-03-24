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

## Publish to GitHub Pages

1. Create a GitHub repository.
2. Add these files to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
3. Commit and push to the `main` branch.
4. In GitHub, open `Settings` → `Pages`.
5. Under `Build and deployment`, choose:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
6. Save the settings.
7. Wait for GitHub Pages to publish the site.
8. Share the generated GitHub Pages URL.

## Suggested Git Commands

```bash
git init
git add index.html styles.css app.js README.md
git commit -m "Add Fivetran L1 Support Agent prototype"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

If the repo already exists:

```bash
git add index.html styles.css app.js README.md
git commit -m "Add GitHub Pages prototype"
git push
```

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

