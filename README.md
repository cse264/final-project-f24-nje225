## CSE 264 Final Project
## Lehigh Loo Review

### Team Members
 - Nathan Edmondson
 - Tommy Sawyer
 - Matt Culbertson

 ### Run Instructions
  1. Clone the repository
  2. Set up and run backend
    - `cd backend`
    - Run `npm install`
    - Run `npm run dev`
  3. In another terminal, set up and run frontend
    - `cd frontend`
    - Run `npm install`
    - Run `npm start`
  4. Open a browser and navigate to `localhost:3000`

### API Keys Needed
Everything should be in the .env file

### Description
Lehigh Loo Review is a web application that allows users to review and rate the bathrooms on Lehigh's campus. Users can create an account, log in, and leave reviews for bathrooms they have used. They can also view reviews left by other users. Admins have the ability to delete reviews, add new building and bathrooms.

### Functionality
##### User Accounts and Roles:
Users can leave reviews, rate bathrooms, and view locations on the map, while Admins can manage content, flag inappropriate reviews, and approve or remove bathroom locations.
##### Database Integration:
We’ll use PostgreSQL as our database to store user information, bathroom locations, reviews, and ratings. 
##### Interactive UI:
The website will feature an interactive map where users can view and select bathrooms. Users can click on specific bathroom icons to see ratings, reviews, and other details.
##### New Library/Framework Usage:
We use Mapbox to embed a map interface and display locations of bathrooms across Lehigh University. 
##### External REST API:
We will add a weather API into our website so that users can see the weather in the area.

### User Story:
##### User
After logging in, users are presented with a campus map displaying markers for bathrooms. Each marker’s color reflects the average rating.
The student clicks on a bathroom marker, revealing reviews and the average rating. They read reviews from other users to help make their decision.
After using the bathroom, they return to the app, locate the bathroom on the map, and leave their own rating and review.
##### Admin
An authenticated admin user can view flagged posts, and delete them if necessary.
Additionally, the admin can select new locations to add a building/bathroom to, and users will see it on the map afterwards.

### Tech Stack
 - React 
 - Node/Express
 - PostgreSQL
