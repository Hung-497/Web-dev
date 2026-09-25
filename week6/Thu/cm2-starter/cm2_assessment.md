
# Self-Assessment

### Example 1: Securing API Requests with JWT Authentication

Initially, our frontend API calls for creating, updating, and deleting jobs did not include any authentication. Here's the original implementation in `AddJobPage.jsx`:

```javascript
// AddJobPage.jsx — original addJob (no auth)
const addJob = async (newJob) => {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });
  return;
};
```

Since the backend routes were protected with `requireAuth` middleware:

```javascript
// jobRouter.js — protected routes
router.post("/", requireAuth, addJob);
router.put("/:id", requireAuth, updateJobById);
router.delete("/:id", requireAuth, deleteJobById);
```

...every request failed with a `401 Unauthorized` error, because no token was sent.

### Solution:
We refactored the fetch calls to retrieve the token from `localStorage` and attach it as a `Bearer` token in the `Authorization` header:

```javascript
// AddJobPage.jsx — refactored addJob
const user = JSON.parse(localStorage.getItem("user"));
const token = user ? user.token : null;

const addJob = async (newJob) => {
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      throw new Error("Failed to add job");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while adding the job.");
    return false;
  }
  return true;
};
```

### Key Improvements:
- **Authentication:** Requests now include the JWT, so protected backend routes accept them.
- **Error handling:** Added `try/catch` and `res.ok` checks, with user feedback via `toast` instead of failing silently.
- **Return values:** The function now returns `true`/`false` so the caller can react to success or failure.

---

### Example 2: Conditional Rendering and Route Protection Based on Auth State

We needed the UI to reflect whether a user was logged in. Initially, the navbar always showed the same links, and all pages were accessible regardless of authentication state.

### Solution:
We lifted authentication state into `App.jsx`, initializing it from `localStorage`, and passed it down through the layout:

```javascript
// App.jsx — auth state and protected routes
const [isAuthenticated, setIsAuthenticated] = useState(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? true : false;
});
```

```javascript
// App.jsx — redirecting based on auth state
<Route index element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
<Route path="/login" element={!isAuthenticated ? (
  <Login setIsAuthenticated={setIsAuthenticated} />
) : (
  <Navigate to="/" />
)} />
```

The `Navbar` then conditionally renders a logout button or login/signup links:

```javascript
// Navbar.jsx — conditional rendering
{isAuthenticated ? (
  <div className="flex items-center gap-4 ml-4 border-l border-indigo-400 pl-4">
    <span className="text-white"> Welcome! </span>
    <button onClick={handleClick} className="..."> Log out</button>
  </div>
) : (
  <div className="flex items-center gap-2 ml-4">
    <Link to="/login" className="...">Login</Link>
    <Link to="/signup" className="...">Sign Up</Link>
  </div>
)}
```

**Lessons Learned:**

1. **Single source of truth:** Keeping `isAuthenticated` in `App.jsx` and passing it down avoids inconsistent auth state across components.
2. **Lazy state initialization:** Using a function in `useState(() => ...)` ensures `localStorage` is only read once on mount, not on every render.
3. **Logout requires two steps:** Removing the token from `localStorage` *and* updating React state — otherwise the UI won't re-render.

---

### Example 3: Debugging Leftover Code in JobPage

While implementing the authenticated delete/edit buttons in `JobPage.jsx`, we introduced a bug by copying markup from a different project (a book app):

```javascript
// JobPage.jsx — buggy code
{isAuthenticated && (
  <>
    <button onClick={() => navigate(`/edit-book/${book._id}`)}>Edit</button>
    <button onClick={() => onDeleteClick(book._id)}>Delete</button>
  </>
)}
```

This crashed the page with `ReferenceError: book is not defined`, because `book` doesn't exist in this component — the fetched data is stored in `job`.

### Solution:
We replaced the incorrect variable and routes with the correct ones, and merged the buttons into the existing "Manage Job" section:

```javascript
// JobPage.jsx — corrected code
<Link to={`/edit-job/${job.id}`} className="...">
  Edit Job
</Link>
<button onClick={() => onDeleteClick(job.id)} className="...">
  Delete Job
</button>
```

**Lessons Learned:**

1. **Copy-paste is risky:** Reusing code between projects requires carefully renaming variables and routes to match the new context.
2. **Data shape matters:** The backend transforms `_id` to `id` in `jobModel.js` (`ret.id = ret._id; delete ret._id;`), so the frontend must use `job.id`, not `job._id`.

---

### Example 4: Improving Form Submission Flow in AddJobPage

Initially, `submitForm` showed a success toast and navigated away *before* knowing whether the job was actually added:

```javascript
// AddJobPage.jsx — original submitForm
const submitForm = (e) => {
  e.preventDefault();
  // ...build newJob...
  addJob(newJob);                    // not awaited!
  toast.success("Job Added Successfully");
  return navigate("/jobs");
};
```

If the request failed (e.g., missing token), the user would still see "Job Added Successfully" and be redirected — a false success.

### Solution:
Make `submitForm` async, await the result, and only show success/navigate when the request actually succeeded:

```javascript
// AddJobPage.jsx — improved submitForm
const submitForm = async (e) => {
  e.preventDefault();
  // ...build newJob...
  const success = await addJob(newJob);
  if (success) {
    toast.success("Job Added Successfully");
    navigate("/jobs");
  }
  // on failure, addJob already shows an error toast
};
```

### Key Improvements:
- **Correct async handling:** `await` ensures we react to the real outcome of the request.
- **Honest UI feedback:** Success messages only appear on actual success, matching the pattern already used in `EditJobPage.jsx`.

---

### Note on the User Model

The `userModel.js` schema (with its `signup`/`login` statics, bcrypt hashing, and validator checks) was provided to us, so it is excluded from this self-assessment. Our work focused on integrating it: building the `Signup`/`Login` pages, storing the returned token, and wiring the auth state through the React app.
