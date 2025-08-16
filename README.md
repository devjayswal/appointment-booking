Work of 2  hours 
---

# Appointment Booking App

**Note:** For efficiency and because the assignment does not require a heavy backend, I combined the frontend and backend into a single **Next.js** app using API routes. This keeps deployment simple (single Vercel project) and removes CORS complexity. The architecture still allows scaling or offloading heavy tasks to microservices if needed.

A minimal full-stack appointment booking application for a small clinic, built with **Next.js** (App Router) and **MongoDB Atlas**.
Deployed on **Vercel** for both frontend & backend, with persistent storage in MongoDB.

---

## **Tech Stack & Trade-offs**

* **Next.js (App Router)** → Combines frontend & backend in one codebase, single deployment, eliminates CORS complexity.
* **MongoDB Atlas + Mongoose** → Flexible schema, easy to deploy, no migrations required.
* **JWT Auth (HTTP-only cookies)** → Secure, simple role-based access for patient/admin.
* **TailwindCSS** → Minimal styling quickly.
* **Trade-off:** MongoDB lacks relational constraints (vs Postgres), but is simpler for a small clinic with short dev time.

---

## **Features**

### Patient

* Register / Login
* View available slots (next 7 days, 30-min intervals between 09:00–17:00)
* Book a slot (double-book prevention)
* View own bookings

### Admin

* Login
* View all bookings (with patient details)

---

## **Requirement Justification**

| Requirement                   | Implementation                                                      |
| ----------------------------- | ------------------------------------------------------------------- |
| Register/Login                | `/api/register` & `/api/login` with bcrypt, JWT in HTTP-only cookie |
| Available slots (next 7 days) | `/api/slots` dynamically generates 30-min intervals                 |
| Book slot (no double booking) | `/api/book` checks existing bookings + MongoDB unique index         |
| View my bookings              | `/api/my-bookings` returns authenticated patient's bookings         |
| Admin login                   | Admin seeded via `.env` & `seedAdmin`                               |
| Admin view all bookings       | `/api/all-bookings` returns all bookings with patient info          |
| Input validation              | Required fields checked in every API route                          |
| Auth & RBAC                   | `requireAuth()` helper validates JWT and role                       |
| Persistent storage            | MongoDB Atlas                                                       |
| Deployment                    | Single Vercel deployment (API + UI)                                 |

---

## **Live URLs**

* **Frontend + API**: [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)
* **Database**: MongoDB Atlas (Free tier)

---

## **Test Credentials**

**Patient:**

```
Email: patient@example.com
Password: Passw0rd!
```

**Admin:**

```
Email: admin@example.com
Password: Passw0rd!
```

---

## **Local Setup**

1. Clone repo:

```bash
git clone https://github.com/yourusername/appointment-booking.git
cd appointment-booking
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/appointments
JWT_SECRET=supersecretkey
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Passw0rd!
```

4. Run dev server:

```bash
npm run dev
```

5. Visit: [http://localhost:3000](http://localhost:3000)

---

## **Deployment Steps**

1. Push code to GitHub.
2. Create a new project in **Vercel** and import the repo.
3. Set environment variables in Vercel dashboard.
4. Deploy — the site will be live in seconds.

---

## **API Endpoints**

### Auth

* `POST /api/register` → `{ name, email, password }`
* `POST /api/login` → `{ email, password }`
* `POST /api/logout` → clears token cookie

### Booking

* `GET /api/slots` → available 30-min slots
* `POST /api/book` → `{ slotId }` (requires patient)
* `GET /api/my-bookings` (requires patient)
* `GET /api/all-bookings` (requires admin)

---

## **Verification via curl**

```bash
# Register
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Passw0rd!"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Passw0rd!"}' \
  -i

# Get Slots
curl http://localhost:3000/api/slots -b "token=<JWT>"

# Book a Slot
curl -X POST http://localhost:3000/api/book \
  -H "Content-Type: application/json" \
  -b "token=<JWT>" \
  -d '{"slotId":"2025-08-15T09:00:00.000Z"}'

# My Bookings
curl http://localhost:3000/api/my-bookings -b "token=<JWT>"
```

---

## **Architecture Notes**

**Folder Structure**

```
src/
  app/                # Next.js pages & API routes
    api/              # Backend endpoints
  lib/                # DB connection, auth helpers, admin seeder
  models/             # Mongoose schemas
```

* **Why:** Keeps backend logic (`lib/`, `models/`) separate from UI (`app/`), improves clarity.

**Auth + RBAC**

* JWT stored in HTTP-only cookies.
* `requireAuth()` validates token and role (patient/admin).

**Concurrency & Atomicity**

* MongoDB unique index on `slotId` in bookings prevents double-booking even under race conditions.

**Error Handling**

* Consistent JSON format:

```json
{ "error": { "code": "ERROR_CODE", "message": "Description" } }
```

* Sensible HTTP codes used (400, 401, 403, 409, 500).

<!-- ---

## **Known Limitations & Next Steps**

* No frontend logout button (API `/api/logout` works).
* Slots generated dynamically, not persisted — could pre-generate for high load.
* No unit tests (can add Jest tests for API routes).
* Rate limiting not implemented — could add for brute-force prevention.

---

## **Submission Checklist**

* [x] Frontend URL
* [x] API URL (same as frontend)
* [x] Patient/Admin test credentials
* [x] Public repo
* [x] Local run steps verified
* [x] Curl verification steps included
* [x] Architecture notes in README
* [x] Known limitations documented

---
 -->
