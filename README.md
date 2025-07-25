# 🏨 BookNest – Hotel Booking Application

**BookNest** is a hotel booking application that allows users to browse, search, and compare hotels with a smooth and responsive user experience. It currently uses dummy data from **MongoDB** and offers live interaction features.

---

## ✅ Current Implementation

### 🌐 Frontend
- Developed using **React**
- Features an open **dashboard** with:
  - A **search bar** to find hotels.
  - **Live price updates** based on:
    - Number of guests
    - Number of rooms
    - Selected dates (check-in/check-out)

### 🗄️ Backend
- Connected to **MongoDB** via **Mongoose**.
- Provides basic **REST APIs** to serve hotel data.
- Filters hotel data based on user search parameters.

---

## 🚧 Future Plans

### 🌐 Frontend Enhancements
- Add a **notification/message service** for user alerts.
- Create a **comparison component** for comparing multiple hotels.
- Implement **authentication system** (login, signup, logout).
- Add features for:
  - **Favourite hotels**
  - **Last viewed / recently booked** hotels
- Integrate a **dynamic pricing system** based on filters.
- Create a **coupon System** .

### 🗄️ Backend Enhancements
- Create API for **hotel comparison feature**.
- Add **authentication schema**:
  - Secure password storage
  - JWT-based authentication
- Define **favourites schema**, referencing:
  - User data
  - Hotel data
- Implement a **demo pricing engine** to simulate real-time pricing.
- Add coupon schema fpr coupon support
```{
  "code": "WELCOME100",
  "discountType": "percentage",     // or "flat"
  "value": 10,                      // 10% or $10 off
  "maxDiscount": 500,              // for percentage cap
  "minBookingAmount": 1000,
  "startDate": "2025-07-01",
  "endDate": "2025-08-01",
  "usageLimit": 1000,
  "usedBy": ["user123", "user456"],
  "active": true
}
```


---

## 🧱 Tech Stack

- **Frontend:** React / Angular, Bootstrap, Material UI, RxJS, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Version Control:** Git

---

## Use Cases & Benefits
  
	  - Allows users to search,  and book hotels seamlessly.
	  - Live pricing updates and filters improve user decision-making.
	  - Helps hotel owners reach more customers without third-party intermediaries. 
      - Improves the booking experience with features like favorites, history, and reviews.


  

---
## 📂 Project Structure (Planned)
<details> <summary><strong>frontend/</strong></summary>

- ├── src/
-   ├── API/              # Axios/fetch wrappers for backend calls
-   ├── assets/           # Static assets like images, icons, fonts
-   ├── cards/            # Reusable card components for hotel listings, etc.
-   ├── components/ 
-   │   └── UI/           # Shared UI components like buttons, modals, etc.
-   ├── component files/  # Main component logic files (pages, views)
-   ├── helpers/          # Utility functions and helpers
-   ├── store/            # State management (Redux, Context API, etc.)
-   └── types/            # Type definitions (TypeScript interfaces/types)
    </summary>
</details> 
<details> <summary><strong>backend/</strong></summary>

- ├── helpers/              # Utility functions used across backend
- ├── middleware/           # Auth, error handling, logging middleware
- ├── models/               # Mongoose schemas for users, hotels, etc.
- ├── routes/               # API route handlers
- ├── index.js              # Entry point of the Express server
- └── mongo.js              # MongoDB connection logic
</details>
