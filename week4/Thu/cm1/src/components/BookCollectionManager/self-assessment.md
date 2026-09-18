# Self-Assessment: BookCollectionManager.jsx

## Individual Score

**45/45**

### useState and Controlled Forms: 15/15

I used `useState` to manage both the book list and the form data.

The form contains all eight required fields:

- title
- author
- genre
- language
- edition
- pages
- rating
- year

All inputs are controlled components because their values come from the
`newBook` state and are updated using `handleInputChange`.

The form is cleared after a book is successfully added.

### Code Quality: 15/15

The code is clear and organized.

I used descriptive variable and function names such as:

- `books`
- `newBook`
- `handleInputChange`
- `addBook`
- `deleteBook`

The `BookCollectionManager` manages the book list and form state.

The individual book display is extracted into a separate `Book.jsx`
component. Book data and the delete callback are passed from the parent
component to `Book` through props.

The book list is rendered using `.map()`, and books are deleted using
`.filter()` without directly modifying the existing state.

### Self-Assessment: 15/15

I reviewed my implementation against the requirements and identified both the strengths of my implementation and areas that could still be improved.
The component meets the required functionality for this activity.

---

## Group Score

**35/35**

### Git Branching and Merging: 20/20

Each team member worked on their own Git branch and developed a separate
component.

After completing our work, we created pull requests and merged the branches
into `main`.

The branches were deleted after the initial merge, but they were restored
before submission so that the individual branch history remains available.

We also communicated with each other when checking the final application and
identified issues that needed follow-up fixes.

### GitHub Pages Deployment: 15/15

The completed React application was successfully deployed using GitHub Pages.

After merging the team's components into `main`, the project was built and
deployed to the `gh-pages` branch.

We checked the deployed website and confirmed that the latest version of the
application was available online.

---

## Contribution

I implemented the `BookCollectionManager` component.

The component allows users to:

- Add a new book
- View all books in the collection
- Delete a book from the collection

Each book contains all of the required information:

- Title
- Author
- Genre
- Language
- Edition
- Pages
- Rating
- Year

I also extracted the individual book display into a separate `Book.jsx`
component and passed the required book information and delete callback
through props.

---

## Reflection

### 1. What did you implement?

I implemented the Book Collection Manager.

Users can enter information about a book, add the book to the collection,
view all added books, and delete books from the collection.

I added all eight required fields, including the new `year` field.

I also extracted each individual book into a separate `Book.jsx` component.

### 2. What React concepts did you practice?

I practiced several React concepts during this activity:

- `useState`
- Controlled form inputs
- Event handling
- Updating objects in state
- Updating arrays in state
- Rendering lists using `.map()`
- Removing items using `.filter()`
- Passing data through props
- Passing callback functions through props
- Extracting components into separate files

I also practiced working with Git branches, commits, pull requests, merging,
and GitHub Pages deployment as part of the team activity.

### 3. What was challenging?

One challenge was managing many form fields while keeping every input
controlled.

Instead of creating a separate state variable for every input, I stored all
book form values inside one `newBook` object.

I then used the `name` attribute of each input together with one
`handleInputChange` function to update the correct property.

This helped reduce repeated code and made the form state easier to manage.

### 4. What would you improve in your code?

One improvement would be to give every book a unique ID.

Currently, the array index is used as the React `key` and is also used when
deleting a book. For a larger application, using a unique ID would be more
reliable.

I could also add stronger validation, for example:

- Checking that the rating is within a reasonable range
- Checking that the page count is greater than zero
- Checking that the publication year is reasonable
- Preventing duplicate books

These improvements are not required for the current activity, but they could
make the component more robust.

### 5. How did your team collaborate?

Each team member selected a different component and worked on their own Git
branch.

We communicated with each other while developing the application and helped
identify problems that appeared after the components were combined.

When everyone finished their work, we created pull requests and merged the
branches into `main`.

After noticing some issues in the final application, we communicated with
the responsible team members so that they could fix their components on
their own branches.

The branches were also restored after the initial merge so that the branch
history remains available for assessment.

Finally, the completed application was deployed successfully to GitHub Pages.

---

## Strengths

- Uses `useState` correctly
- Uses controlled form inputs
- Includes all eight required book fields
- Implements Create, Read, and Delete
- Uses `.map()` to render books
- Uses `.filter()` to delete books
- Extracts the individual book into `Book.jsx`
- Uses props correctly
- Clears the form after successfully adding a book
- Prevents books with empty required fields from being added
- Code is simple and readable

---

## Areas for Improvement

- Use unique IDs instead of array indexes
- Add stronger validation for numerical fields
- Optionally prevent duplicate books
- Improve accessibility and user feedback for invalid inputs

---

## Overall Assessment

The Book Collection Manager meets the requirements of the Coding Marathon.

It correctly uses React state, controlled inputs, list rendering, component
extraction, props, Create/Read/Delete operations, and event handling.

I also participated in the team Git workflow by working on a separate branch,
creating commits, merging through a pull request, and helping prepare the
final application for GitHub Pages deployment.
