### Iteration 8: Backend and Proxy Insights  

1. **Understanding the Virtual Field in Backend**  
   - In the file `backend/models/jobModel.js`, explain the purpose of the following code snippet:  
     ```javascript
     jobSchema.set("toJSON", {
       virtuals: true,
       transform: (doc, ret) => {
         ret.id = ret._id;
         return ret;
       },
     });
     ```
     **Question:** What does this code accomplish? Why is it useful in your application?  

     **ANSWER:** It matches the id with mongoDB objectId, easy to accept.

2. **CORS Middleware**  
   - In `backend/app.js`, explain the role of this line:  
     ```javascript
     app.use(cors());
     ```  
     **Question:** What is CORS, and why is it necessary for the application to include this middleware?  

     **ANSWER:** CORS is middleware that sets the specific HTTP headers that tell the browser to contact different origins. With CORS your server will allow requests from different origins automatically.

3. **Proxy Configuration in Frontend**  
   - In `frontend/vite.config.js`, describe the purpose of the following configuration:  
     ```javascript
     proxy: {
       "/api": {
         target: "http://localhost:4000",
         changeOrigin: true,
       },
     },
     ```  
     **Question:** How does this proxy setting work, and what problems does it solve in the development environment?  

     **ANSWER:** It moves the api requests from frontend to backend, without having to write the whole 'localhost:4000/api/jobs', just 'api/jobs' and then vite forwards it to the backend. This is how we avoid CORS issues.


 


---
