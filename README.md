# cake-app

## Deployed version

The URL of the dev version is https://d1es4pfegyj6kc.cloudfront.net
## Running locally

`npm i`

`npm run start` 

to run the app locally.


by default the app talks to the dev urls, to talk to a locally running api instance, instead run

`npm run start-with-local-api`

## Testing

`npm run test`

Will start the jest test console to run unit tests

`npm run cypress`

Will start cypress which is configured to run a basic smoke test.

Once opened click the *basic.spec.ts* to run the basic smoke tests on your machine. This could easily be automated as a headless test to run as part of CI/CD

## Testing philosophy
+ Basic unit tests are included on the react components
+ The 'main' app component has not been unit tested due to time constraints, the e2e tests cover most of the functionality
+ Some simple files like the api are not tested

## Blog as I'm writing this
+ Set up a gitignore, run create-react-app set up with typescript
+ Sort the deployment via serverless deploying to S3 with cloudfront
+ Get the hello-world react app building and deploying (deployed to d1es4pfegyj6kc.cloudfront.net)
+ Get a basic POC jest test running on the app component
+ Get a basic cypress test running
+ Add 'testing-library' for cypress
+ Do a basic sketch design of the ui should look like
+ Plan out component tree
    + App component
        + Shows a list of cakes (CakeListItem)
        + Shows the list of cakes it retrieved, or 'no cakes, try adding one' if none found
        + Entering text in the search box limits the cakes to ones whose name contain the text
        + Clicking add cake pops up an add cake modal (CakeAddModal)
    + CakeListItem
        + shows the image, name, comment, and rating of the cake
        + clicking the delete icon pops up a (CakeDeleteModal)
    + CakeAddModal
        + Has form fields to add a cake
        + Cancel button hides the modal
        + Create button posts up to create the cake
    + CakeDeleteModal
        + Displays 'are you sure message'
        + Cancel hides the modal
        + Delete posts up to delete the cake
+ Add react bootstrap
+ Develop components testing as we go
+ Write tests first, then make components pass
+ Do same for hooks (hook testing is less straightforward)
+ Leave unit testing the main component and just rely on e2e to catch any obvious mistakes

_____

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
