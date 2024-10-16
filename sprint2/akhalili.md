# Sprint 2

Alan Khalili, AlanKha, Skincare Recommender

### What you planned to do

[#30 Implement User Authentication](https://github.com/utk-cs340-fall24/Skincare-Recommender/issues/30)
[#34 Create Sign-in/Sign-up Popup](https://github.com/utk-cs340-fall24/Skincare-Recommender/issues/34)

### What you did not do

- Make user-auth look good, frontend wise
- Link user auth to MongoDB

### What problems you encountered

The main problem I encountered was trying to link Firebase to MongoDB. Originally, our database schema was set up to get a username and password so that we could do in-house hashing, but later on we realized that it would be beneficial to use a cloud-based authentication service like firebase for not only security but also ease of use. This also became an issue when trying to set up some post request apis to link a new user from the sign-up page to the database.

### Issues you worked on

[#30 Implement User Authentication](https://github.com/utk-cs340-fall24/Skincare-Recommender/issues/30)
[#34 Create Sign-in/Sign-up Popup](https://github.com/utk-cs340-fall24/Skincare-Recommender/issues/34)

### Files you worked on

mainly I just worked in the frontend directory, I worked on ```frontend/src/pages/home.jsx```, ```frontend/src/pages/quiz.jsx```, ```frontend/src/pages/signup.jsx```, ```frontend/src/pages/login.jsx```, ```frontend/src/pages/logout.jsx```, ```frontend/src/pages/products.jsx```, ```frontend/src/pages/userInfo.jsx```, ```frontend/src/App.jsx```,  ```frontend/src/firebase.js```, and ```frontend/src/components/promptLogin.jsx```.

### What you accomplished

I successfully implemented user authentication with Firebase. This user authentication is fully fledged out with login, sign-up, logout, and userInfo pages. I implemented a popup that prompts a user that's not logged in to do so. I also did most of the work getting Firebase set up on the cloud.