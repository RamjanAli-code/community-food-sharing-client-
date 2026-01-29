#  Community Food Sharing 

##  Project Purpose
**Community food Sharing** 
Add Food: Upload surplus food to share.

Available Food: Browse and request available food.

Manage My Foods: Track and manage donations.

Food Requests: Manage incoming requests.

Authentication: Secure login/signup via Firebase.

Notifications: Instant feedback to users through toast notifications.

---

##  Live Demo
🔗 **Live URL:**[https://community-foodsharing-2.netlify.app/](https://community-foodsharing-2.netlify.app/)
 
---

##  Key Features
-  **User Authentication:**  
 - Secure login and signup using Email/Password or Google accounts.

- Firebase authentication ensures user data privacy and safety.
-  **My Profile Page:**  
  - Users can view and manage their profile information.

  -Displays user details such as name, email, and profile photo.
-  **CRUD Operations (Food Management):**
  -  Create: Users can add food items to share.

  -   Read: View all available food items in the community.

  -   Update: Manage or edit the details of their own food items.

  -   Delete: Remove donated food items once claimed or no longer available.
-  **Private Routes:**  
  - Certain pages are accessible only to authenticated users, protecting sensitive features like adding or managing    food.
-  **Dynamic Routing & Context API:**  
  - Context API allows global sharing of user data and simplifies state management.
-  **Toast Notifications:**  
  - Display success or error messages for user actions.
-  **Responsive Design:**  
  - Fully responsive layout for mobile, tablet, and desktop.

---


## NPM Packages Used

| Package Name       | Purpose / Description                                      |
|-------------------|------------------------------------------------------------|
| `react` & `react-dom` | Core React libraries for building UI components       |
| `react-router-dom` | Routing between pages and protecting private routes       |
| `firebase`         | Authentication, database (Firestore or Realtime DB), and hosting |
| `react-toastify`   | Showing toast notifications for success/error messages   |
| `tailwindcss`      | Modern, responsive, and utility-first CSS styling        |
| `lucide-react`     | Icon library for React components                         |
| `dotenv`           | Loading environment variables from `.env` files         |
| `axios`            | Making HTTP requests to backend APIs                     |
| `nodemon`          | Development tool to auto-restart server on code changes  |
| `cors`             | Middleware to handle Cross-Origin Resource Sharing       |
| `express`          | Backend server framework for APIs                        |
| `mongodb`          | MongoDB Node.js driver for database operations          |

---

## ⚙️ Installation & Setup
1. **Clone the repository:**
   ```bash(server)
   git clone https://github.com/RamjanAli-code/commuityFoodSharing-Server-.git

  ```bash(client)
   git clone https://github.com/RamjanAli-code/community-food-sharing-client-.git