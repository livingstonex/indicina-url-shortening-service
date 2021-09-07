# Getting Started with this project

This is the backend of the Indicina url shortening service, essentially written in Node.

## Steps to run the application

The following are the steps to run this application.

1. Navigate to the project directory and run the command:
### `npm install`

2. Now run the command:
### `npm run dev`

This would bootstrap the application in development mode with the server listening on: [http://localhost:8000]

You will also see any lint errors in the console.


## Testing
To run the test case associated with this:
### `npm run test`

More test cases are welcomed in the form of PRs.


## Synopsis
Considering scalability and best practices, we have tried to practice certain fundamental priciples such as the DRY principle, the Single functionality principle and others.

As a result, abstractions were made in the way asynchrounous executions happens withing the application. Basically we employ the services of an asyncHandler, which we use to handle asynchrounous events in our controllers.

We have, also, within the application created our own logging middleware, which we use for logging on the application.

## Error Categorization and Handling
Withing this app, we have created a maintainable and scalable error handling middleware. Although the error categorization certainly does not cover all the errors that are out there lurking in the dark, please feel free to create a PR when you come accross an error that has not been handled properly in the application.


## Contribution
To contribute to this project, kindly follow the steps below:

1. Fork the project form this github repo
2. Make your modifications and make sure that the application run successfully.
3. Push back to a branch and create a PR to staging.

### Thank you.
