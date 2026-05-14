# SETUP PROMPT — Copy this entire block and paste it to any AI assistant

---

I have a React web app called **WaterPulse** that I need to set up and run locally.
It is a water outage tracker built for a hackathon set in Morocco.

Here is the full file structure:

```
waterpulse/
├── index.html
├── package.json
├── vite.config.js
├── FEATURES.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── store.jsx
    ├── data/
    │   └── seed.js
    └── components/
        ├── Header.jsx
        ├── StatsBar.jsx
        ├── FilterBar.jsx
        ├── MapView.jsx
        ├── ListView.jsx
        ├── ReportCard.jsx
        ├── ReportForm.jsx
        └── Toast.jsx
```

**Tech stack:**
- React 18 (via Vite)
- Leaflet + react-leaflet for the interactive map
- date-fns for time formatting
- lucide-react for icons
- No backend — all state is in-memory using React Context

**Please give me step-by-step instructions to:**

1. Install Node.js if I don't have it (mention LTS version, link to nodejs.org)
2. Open a terminal and navigate to the `waterpulse/` folder
3. Run `npm install` to install all dependencies
4. Run `npm run dev` to start the development server
5. Open the app in the browser (it runs on http://localhost:5173 by default with Vite)
6. Explain what each of the 3 main views does:
   - **Map view** (🗺 Carte): Interactive map of Morocco showing color-coded outage markers
   - **List view** (📋 Liste): Scrollable list of all reports with filters by city and status
   - **Report view** (➕ Signaler): Form to submit a new water outage report
7. Explain how to build for production: `npm run build` outputs to a `dist/` folder
8. If there are any errors during `npm install` related to `leaflet` or `react-leaflet`, tell me how to fix them (usually: delete `node_modules`, run `npm install` again)

**Bonus (optional):**
- How to deploy this to Vercel or Netlify for free in under 5 minutes
- How a hackathon team should approach adding a new feature to this codebase (which files to edit, how the state store works, where to add a new component)

Please be clear and beginner-friendly. Some teams may not have used React before.
