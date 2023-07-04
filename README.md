# Video Game Store Built with Next.js

This is an e-commerce store that is being built using Next.js. It is a modern, lightweight, and highly performant web application that provides a smooth shopping experience to customers.

**Website Link:** https://vgamestore.vercel.app/


 ## Tech Used:

 ### Next.js, React.js, NextAuth.js, MongoDB, Cypress, HTML, CSS, Vercel.


## How to run the application:

1. Clone the project repository and install dependencies:

    ```shell
    git clone https://github.com/AliCo-Hash/vgamestore.git
    cd vgamestore
    npm install
    ```

2. Environment Variables:
    - Rename `.env.example` to `.env.local`.
    - Populate the `.env.local` file with your MongoDB and NextAuth information.

3. Running the Project:
    - To run the project in development mode:
      ```shell
      npm run dev
      ```
    - To build and run the project in production mode:
      ```shell
      npm run build
      npm start
      ```

## Lessons Learned

Throughout the development of this project, several key lessons were learned:

- Authentication using NextAuth: Implementing user authentication was a crucial aspect of this project. By leveraging NextAuth, I gained valuable experience in setting up secure user authentication, including user registration, login, and session management.

- UseReducer for a cart system: To manage the shopping cart functionality, I utilized the `useReducer` hook provided by React. This allowed me to efficiently handle state management for the cart, including adding/removing items, updating quantities, and calculating totals. Working with `useReducer` enhanced my understanding of state management and helped create a more robust cart system.

- PayPal integration: Integrating PayPal as a payment gateway was a significant learning experience. I gained insights into handling payment transactions securely, implementing the necessary API calls, and managing order processing. This knowledge opened doors for future integrations with other payment providers as well.

By overcoming these challenges and successfully implementing these features, I have acquired valuable skills and knowledge that will be beneficial in future projects. These lessons have not only enhanced my technical capabilities but also improved my understanding of building secure and user-friendly e-commerce applications.

  