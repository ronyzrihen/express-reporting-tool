# Express Damage Reporting Tool

A simple server application for receiving and handling client requests using Express.

### Created by Rony Zrihen

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Running Tests](#running-tests)
- [Postman Examples](#postman-examples)

## Installation

Provide instructions on how to install and set up your project. Include any dependencies that need to be installed and any configuration steps required.

### Clone the repository

```bash
git clone https://github.com/ronyzrihen/express-reporting-tool.git
```

### Install dependencies

```bash
npm install
```

## Usage

Add a **.env** file with your own Database info like so:

```plaintext
# .env file
DB_HOST=[your DB host]
DB_NAME=[your collection name]
DB_USER=[your DB user]
DB_PASS=[your DB password]
```

```bash
# Run the application
npm start
```

Below is a list of supported requests the server can handle:

**GET**: Returns reports from the DB.

To get all reports, run:

```bash
# Get all reports
http://localhost:3000/damage-reports/
```

If you want to get a single report, run:

```bash
# Get report by ID
http://localhost:3000/damage-reports/5
```

The server can handle errors like:
- Type Error: bad ID provided
- Invalid ID: invalid ID value
- Not Found: ID not found

**POST**: Creates a new report.

To create a new report, run:

```bash
# Create a report
http://localhost:3000/damage-reports/
```

Body example:

```json
{
  "id": 4,
  "type": "Structural",
  "desc": "London Bridge is falling down, falling down OMG falling down!!!"
}
```

The server can handle errors like:
- ID Exists: requesting to create a duplicate ID
- Property Not Provided: ID not provided

**PUT**: Updates an existing report.

To update a report, run:

```bash
# Update a report
http://localhost:3000/damage-reports/[insert ID]
```

Body example:

```json
{
  "id": 4,
  "type": "Structural",
  "desc": "London Bridge is falling down, falling down OMG it's falling down!!!"
}
```

The server can handle errors like:

- Property Not Found: ID not found
- ID Exists: trying to update ID to an existing one

**DELETE**: Deletes an existing report.

To delete a report, run:

```bash
# Delete a report
http://localhost:3000/damage-reports/[insert ID]
```

The server can handle errors like:

- Not Found: ID not found

## Running Tests

The application has a testing script using Jest.

To run the tests, use the following command:

```bash
# Run tests
npm run test
```

## Features

The server consists of the following components:

- **index.js**: Server Bootstrap, runs server.
- **server/server.js**: Contains Express app, runs router and other middleware.
- **server/app.js**: Decouples main server middleware from "app.listen" process for testing purposes.
- **router/damageReportRouter.js**: HTTP handler for routing request and response to server logic.
- **controller/damage_controller.js**: Handles server's logic and checking for errors.
- **repository/damage_repository.js**: Handles server DB requests.
- **db/dbConnection.js**: Connects and directly interacts with MongoDB using Mongoose.
- **models/Damage.model.js**: Contains schema and model creation for data insertion to the DB.
- **middlewares/**: Contains middleware for handling errors and creating error logs.


## Postman Examples

To facilitate testing and interaction with the API endpoints, you can import the following Postman collection that includes example requests for each supported endpoint:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/your-postman-collection-id)

Clicking the button will import the collection into your Postman workspace, allowing you to explore and interact with the API.

Enjoy! :)

