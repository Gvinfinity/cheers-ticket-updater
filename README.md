# Cheers Ticket API & WhatsApp Notification

This project fetches event ticket information from the Cheers Ticket API and sends periodic notifications via WhatsApp using the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library.

## Prerequisites

- [Node.js](https://nodejs.org) installed.
- A WhatsApp account accessible through the WhatsApp Web client.
- An API token and event ID from Cheers Ticket API.
- Environment variables defined in a `.env` file.

## Setup

1. **Clone the repository and navigate into the folder:**

   ```sh
   git clone git@github.com:Gvinfinity/cheers-ticket-updater.git
   cd scraping_cheers/src
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the same directory using the .env.template

   Replace the placeholder values with your actual tokens and IDs.

## Running the Project

Start the application using:

```sh
node index.js
```

The application will:
- Authenticate with WhatsApp using the code on the console.
- Periodically (every 12 hours) fetch the number of tickets sold from the Cheers Ticket API.
- Send a WhatsApp message with the ticket count to the specified group.

## License

This project is licensed under the MIT License.