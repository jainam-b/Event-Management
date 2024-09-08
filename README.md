# Event Management System

## Overview

The Event Management System is a robust platform for creating and managing events. It provides features for event creation, ticket management, and seating arrangements, utilizing modern technologies to ensure a seamless experience for users and administrators.

## Features

- **Event Creation**: Users can create events with comprehensive details such as name, description, date, and location.
- **Ticket Management**: Define and manage various types of tickets for each event, including pricing and availability.
- **Seating Arrangement**: Manage seating maps for events to enhance attendee experience.
- **User Authentication**: Secure access to event creation and management features.

## Technologies

- **Frontend**: React
- **Backend**: Hono
- **Database**: Prisma with PostgreSQL
- **Deployment**: Cloudflare Workers
- **Validation**: Zod

## Installation

1. **Clone the Repository**

   Obtain a copy of the project:

   ```bash
   git clone [https://github.com/jainam-b/Event-Management.git]
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the required packages:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file and add your environment-specific configurations, such as database connection strings.

4. **Run Migrations**

   Set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

5. **Start Development Server**

   Launch the server for local development:

   ```bash
   npm run dev
   ```

 

## Deployment

1. **Build the Project**

   Prepare the project for deployment:

   ```bash
   npm run build
   ```

2. **Deploy**

   Deploy the project to Cloudflare Workers or your preferred hosting service.

## Contributing

Contributions are encouraged! Please fork the repository and submit a pull request with your improvements or fixes. Make sure to follow the project's coding standards and include relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, contact:

- **Name**: Jainam Bagrecha
- **Email**: [jainambagrecha16@gmail.com](mailto:jainambagrecha16@gmail.com)

 
