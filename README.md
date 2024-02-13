# CodeCanvas Blogsphere

CodeCanvas Blogsphere is a blogging platform built for developers to share their thoughts and insights with the community.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Create and Manage Posts**: Authenticated users can create, edit, and delete their blog posts.
- **Commenting**: Users can leave comments on blog posts to engage in discussions.
- **Responsive Design**: The platform is designed to work seamlessly across desktop and mobile devices.
- **Database Integration**: Utilizes Sequelize ORM with MySQL database for efficient data storage and retrieval.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **Sequelize**: Promise-based ORM for Node.js, supporting MySQL
- **Express Handlebars**: Template engine for rendering HTML templates
- **bcrypt**: Library for hashing passwords
- **dotenv**: Zero-dependency module for loading environment variables
- **connect-session-sequelize**: Session storage library for Sequelize
- **nodemon**: Development dependency for auto-restarting the server
- **HTML/CSS**: Frontend styling and layout

## Getting Started

To get started with CodeCanvas Blogsphere, simply visit the deployed application at [URL_HERE] and sign up for an account. Once you're signed in, you can start creating your own blog posts, commenting on existing posts, and engaging with the community.

## Folder Structure

- **controllers**: Contains route handlers for different parts of the application.
- **db**: Includes database schema and seed data.
- **layouts**: Contains Handlebars templates for the application layout.
- **models**: Defines Sequelize models for interacting with the database.
- **public**: Includes static assets like CSS and client-side JavaScript.
- **seeds**: Contains seed data for populating the database during development.
- **config**: Includes configuration files for database connection and session storage.
- **views**: Additional views for specific routes.

## Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the need for a simple and developer-friendly blogging platform.
- Built with the support of the open-source community and various tutorials and resources online.