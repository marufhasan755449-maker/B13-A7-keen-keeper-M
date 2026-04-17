#KeenKeeper — Keep Your Friendships Alive

> A relationship management app that helps you stay connected with the people who matter most.

---

##Description

KeenKeeper is a friendship tracker that lets you set contact goals for each friend, log interactions, and visualize your relationship habits over time. Never let important friendships fade due to a busy schedule.

---

##Technologies Used

| Technology | Purpose |
|---|---|
| React.js | UI library |
| React Router DOM | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Recharts | Pie chart for analytics |
| react-hot-toast | Toast notifications |
| Lucide React | Icons |
| Vite | Build tool |

---

##Key Features

1.**Friend Cards with Status** — See all your friends at a glance with color-coded status indicators (Overdue, Almost Due, On Track) based on your last contact date.

2.**Quick Check-In Logging** — Log a call, text, or video chat from a friend's detail page in one click. Each interaction is instantly added to your personal timeline with a toast confirmation.

3.**Friendship Analytics** — A dedicated Stats page with a Recharts Pie Chart that visualizes the breakdown of your interaction types (Call / Text / Video) so you can see how you connect best.

---

##Pages

- **Home** — Banner with summary cards + 4-column friend grid
- **Friend Detail** — Full profile, stats, goal tracker, and quick check-in
- **Timeline** — Filterable history of all interactions
- **Stats** — Pie chart analytics of interaction types
- **404** — Custom not-found page

---

##Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

##Deployment

```bash
npm run build
```

Deploy the `dist/` folder to Netlify, Vercel, or any static host.

> **Note:** For SPA routing to work after deployment, configure your host to redirect all routes to `index.html`.
