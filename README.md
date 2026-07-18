# BiteDash - Frontend Food Delivery Web App

**Developer:** Ashish Kumar Yadav  
**Project Type:** Advanced Frontend (React.js)  
**Website link:**https://bitedash-kappa.vercel.app/
---

### About the Project
Hi! I built **BiteDash**, a premium food ordering and delivery web application. The main goal of this project was to create a highly interactive, real-world frontend flow inspired by popular apps like Swiggy and Zomato. 

Since this is a **frontend-only project**, I made sure that all features—like adding items to the cart, applying discount codes, registering users, filtering restaurants by location, and tracking orders—are completely simulated in the browser. I used `localStorage` to save user data so that the app remembers your login, favorites, and order history even if you refresh the page.

---

### Tech Stack & Libraries Used
Here is what I used to build this project and why:

1. **React.js (scaffolded with Vite)**: I chose Vite instead of Create React App because it is extremely fast to build and run. React helped me split the UI into small, reusable components and manage state changes efficiently.
2. **Tailwind CSS v4 & PostCSS**: I wanted to design a modern, sleek user interface. I configured Tailwind v4 to build an dark-theme first layout, with smooth transitions, custom scrollbars, and warm orange-to-rose gradients.
3. **React Context API**: To avoid using heavy state managers like Redux, I used Context API (`AppContext.jsx`) to handle global states like the active user, shopping cart, favorite items list, selected delivery address, active location, and active order tracking details.
4. **React Router (`react-router-dom`)**: I set up client-side routing to navigate between the Home feed, Profile dashboard, Checkout screen, and Tracking timeline without any page reloads.
5. **Lucide React**: Used for modern, clean vector icons across the platform (such as map pins, shopping bags, trash icons, etc.).

---

### Key Features I Implemented
Here is a breakdown of what I built and how it works under the hood:

*   **Simulated Authentication (Login/Signup)**: 
    I created an interactive Login/Signup form. It saves new accounts to the browser's local storage. If you are logged out, the app protects the **Checkout** and **Profile** pages by showing a lock screen and prompting the login modal. You can log in using the demo account: `ashish@gmail.com` / `123456`.
*   **Location-Based Delivery Zones**:
    There is a location selector next to the logo (Noida, Delhi, Gurugram, Mumbai). Since different restaurants deliver to different areas, changing the location dynamically updates the available brands and dishes on the home feed.
*   **Item Customizer Modal**:
    Clicking customizable items (like pizzas or waffles) opens a popup modal. Here, you can select different sizes and extra toppings. The app calculates the price modifier on the fly before adding it to the cart.
*   **Sliding Cart & Coupon Codes**:
    The shopping cart slides out from the right. It displays subtotals, tax, and delivery fees. You can type and apply coupons (like `BITE20` or `WELCOME100`) to deduct money from the total.
*   **Simulated Email Notification**:
    Right after placing an order, a floating banner pops up at the top confirming that a receipt has been successfully sent to your registered email address.
*   **Receipt Downloader (Plain JS Blobs)**:
    I wrote a utility script to compile billing details, delivery address, and ordered items into an ASCII-style invoice. When you click "Download Receipt", it generates a `.txt` file and downloads it directly to your computer using JavaScript Blobs. You can also download previous receipts from your Order History.
*   **Live Order Tracker Stepper**:
    I set up a timer using `setInterval` to simulate a live delivery. The tracking page shows a timeline that advances automatically from *Order Placed* ➔ *Kitchen* ➔ *Riding* ➔ *Delivered*. I also added a "Fast Forward" button so you can click and test all stages instantly.

---

### File & Folder Structure
Here is how I organized my codebase:
```text
bitedash/
├── index.html            # Main HTML with Outfit font & viewport settings
├── tailwind.config.js    # Custom orange/rose color tokens & custom animations
├── postcss.config.js     # PostCSS loader config using @tailwindcss/postcss
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx    # Sticky navigation with Search, Location & Auth buttons
│   │   ├── Hero.jsx      # Gradient header banner & horizontal categories
│   │   ├── FoodCard.jsx  # Dish card showing price, bestseller tag, & cart quantities
│   │   ├── FoodDetailModal.jsx # Size & toppings selector
│   │   ├── CartDrawer.jsx# Slide-over cart review & coupon validator
│   │   ├── AuthModal.jsx # Login/Signup modal with tab switching
│   │   └── FilterPanel.jsx # Veg/Non-veg and sorting selectors
│   ├── context/          
│   │   └── AppContext.jsx# React Context managing shopping cart, auth, & local storage sync
│   ├── data/
│   │   └── mockData.js   # Rich mock data (dishes, locations, coupons, restaurants)
│   ├── pages/            # Page layouts
│   │   ├── Home.jsx      # Main restaurant feed & search results
│   │   ├── Checkout.jsx  # Shipping addresses form & simulated payment selector
│   │   ├── Tracking.jsx  # Live order stepper timeline
│   │   └── Profile.jsx   # Order history logs & user addresses
│   ├── utils/
│   │   └── helpers.js    # Invoice generator & TXT file downloader
│   ├── App.jsx           # Routes configuration
│   ├── index.css         # Tailwind imports, scrollbar settings, and animations
│   └── main.jsx          # App entry point
```

---

### How to Install and Run Locally

To run this project on your local machine, follow these steps:

1.  **Navigate to the project folder**:
    ```bash
    cd bitedash
    ```
2.  **Install the dependencies**:
    ```bash
    npm install
    ```
3.  **Start the local development server**:
    ```bash
    npm run dev
    ```
4.  **Open the application**:
    Open [http://localhost:5173](http://localhost:5173) in your browser.