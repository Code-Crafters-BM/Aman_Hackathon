# WaterPulse — Feature List for Hackathon Teams
## Each team picks ONE feature. First come, first served. No duplicates.

---

### How to claim your feature
Write your team name next to the feature number before the hackathon starts.
Once a feature is taken, it's gone. You have 10 hours to implement it.

---

## THE 20 FEATURES

### 🗺 MAP & LOCATION
**Feature 01** — `[TEAM: ___________]`
**Neighborhood search bar on the map**
Add a search input on the map view that lets users type a neighborhood or city name and fly the map to that location. Use the Leaflet `flyTo()` method and filter the existing markers to highlight matches.

**Feature 02** — `[TEAM: ___________]`
**Cluster markers when zoomed out**
When the map is zoomed out (zoom < 8), group nearby markers into a cluster circle showing the count. Use the `leaflet.markercluster` library. On click, the cluster expands. Each cluster color reflects the worst severity in the group (red > yellow > green).

**Feature 03** — `[TEAM: ___________]`
**Draw affected zone radius**
When a user submits a report, draw a semi-transparent circle around the marker representing estimated affected radius (100m for low, 400m for medium, 800m for high severity). Color matches the status.

---

### 📋 LIST & FILTERING
**Feature 04** — `[TEAM: ___________]`
**Sort controls on the list view**
Add a sort bar above the report list with options: "Most recent", "Most upvoted", "Most critical", "Nearest to resolving". Clicking a sort option re-orders the list in real time without any page reload.

**Feature 05** — `[TEAM: ___________]`
**Keyword search in list view**
Add a search input above the list that filters reports in real time as the user types. Match against city, neighborhood, and description text. Show a "no results" state if nothing matches. Highlight matched text in results.

**Feature 06** — `[TEAM: ___________]`
**Save filters to URL params**
When a user changes the city or status filter, update the browser URL with query params (e.g. `?city=Casablanca&status=active`). On page load, read the URL params and pre-apply those filters. This makes filter states shareable via link.

---

### 📊 STATS & DASHBOARD
**Feature 07** — `[TEAM: ___________]`
**City leaderboard / ranking panel**
Add a sidebar or modal showing a ranked table of cities by number of active outages. Each row shows: city name, active outage count, a small colored bar chart, and a "most affected neighborhood" label. Updates live as reports come in.

**Feature 08** — `[TEAM: ___________]`
**Outage duration tracker**
For each active report, calculate and display how many hours the outage has been going on (from `reportedAt` to now). Add a "Duration" column in list view. In the stats bar, show the average outage duration across all active reports.

**Feature 09** — `[TEAM: ___________]`
**Mini bar chart in stats bar**
Replace the plain numbers in the StatsBar with small inline SVG bar charts. Each stat shows a 7-day trend (generate fake historical data). Show if the number is trending up or down with a colored arrow.

---

### 📝 REPORTING & FORMS
**Feature 10** — `[TEAM: ___________]`
**Photo upload field on report form**
Add an optional image upload field to the report form. Accept JPG/PNG, show a preview thumbnail before submission. Store the image as a base64 string in the report object and display it in the report card (max 200px height).

**Feature 11** — `[TEAM: ___________]`
**"Confirm this outage" button on report cards**
Add a two-state button: "Confirmer" and "✅ Confirmé". When clicked, it adds +1 to a `confirmations` counter (separate from upvotes). Once 5+ confirmations, the card gets a "Vérifié par la communauté" badge. State is stored in the report object.

**Feature 12** — `[TEAM: ___________]`
**Outage resolved flow**
Add a "Marquer comme résolu" button on active/partial report cards. Clicking shows a small confirmation popup: "L'eau est revenue dans votre quartier?" with Yes / Not yet. On Yes, the report status changes to `resolved` and a timestamp is added.

---

### 🔔 NOTIFICATIONS & ALERTS
**Feature 13** — `[TEAM: ___________]`
**Subscribe to city alerts (mock)**
Add a "S'abonner aux alertes" button in the filter bar. Clicking opens a modal asking for a phone number or email (UI only — no real sending). Show a confirmation message and store the subscription in app state. Display a count of subscribers somewhere visible.

**Feature 14** — `[TEAM: ___________]`
**New report live ticker**
Add a ticker/feed strip at the bottom of the screen (like a news ticker). Every time a new report is added, it scrolls across: "🔴 Nouveau signalement — Hay Mohammadi, Casablanca — il y a 2 min". Use CSS animation for the scroll effect. Show the last 5 reports in rotation.

**Feature 15** — `[TEAM: ___________]`
**Critical alert banner**
When any report has `severity: "high"` and `status: "active"`, show a dismissible red banner at the top of the app (below the header) listing the critical zones. "⚠️ Alerte critique : Hay Mohammadi (Casa), M'hamid (Marrakech)". Updates live. Clicking a city name sets the filter to that city.

---

### 🌐 LANGUAGE & ACCESSIBILITY
**Feature 16** — `[TEAM: ___________]`
**Arabic / French language toggle**
Add a language switcher (FR | عربية) in the header. Build a simple translation map for all visible UI strings (labels, buttons, placeholder text, nav items). When toggled, the entire interface re-renders in the selected language. RTL layout for Arabic using `dir="rtl"`.

**Feature 17** — `[TEAM: ___________]`
**Darija (Moroccan Arabic) report descriptions**
Add a "Translate to Darija" button on each report card. On click, swap the French description for a Darija version using a manually-crafted lookup table of 10 common phrases (no external API needed). Show a "🇲🇦 Darija" badge when active.

---

### 🛠 ADMIN & MODERATION
**Feature 18** — `[TEAM: ___________]`
**Admin panel (password: "admin")**
Add a hidden `/admin` route or a keyboard shortcut (Ctrl+Shift+A). Behind a simple password prompt ("admin"), show a panel listing all reports with the ability to change any report's status. Changes reflect immediately on the map and list.

**Feature 19** — `[TEAM: ___________]`
**Report flagging system**
Add a "🚩 Signaler comme faux" button on each report card. Clicking increments a `flags` counter. Once a report has 3+ flags, it gets a "⚠️ Contenu contesté" warning badge and is moved to the bottom of the list. A flag counter is shown in the stats bar.

---

### 📱 UX & POLISH
**Feature 20** — `[TEAM: ___________]`
**Dark / Light mode toggle**
Add a 🌙 / ☀️ toggle button in the header. Implement a full light mode by overriding all CSS variables on `[data-theme="light"]`. The toggle persists the preference in `localStorage`. All components adapt without any hard-coded colors (use only CSS variables).

---

## Rules Reminder
- One feature per team — no exceptions
- You must work on the **existing codebase** (not a rewrite)
- Your feature must be accessible from the main UI
- No external paid APIs
- Final demo: show your feature working end-to-end in 3 minutes

Good luck! 🇲🇦💧
