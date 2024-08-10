## Reguired modules

1. express
2. express-generator
3. express-session
4. connect-flash
5. nodemon
6. mongoose
7. passport
8. passport-local
9. passport-local-mongoose
10. multer
11. uuid

## Routes

1. [get] /register or /login
2. [post] /register
3. [post] /login
4. [get] /profile
6. [get] /home -> where all random posts are shown
7. [] /save:post-id
8. [] /delete:post-id
9. [get] /logout
10. [] /edit
11. [] /create -> for create post

##

1. create 'users' and 'posts' named model  
2.
   1. users attributes
        1. username
        2. name
        3. email
        4. password
        5. profileImage
        6. contact
        7. blogs - represent array of created uploads
   2. posts attributes
        1.
3. First create registration form on get(/register) route and submit data on post(/register) route.
4. Create login form on get(/login) route and authenticate data on post(/login) route.
5. To run The project 
     ```
          npx nodemon
     ```
6. on `http://localhost:3000/`
