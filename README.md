# Admin Portal

## Project structure

* **`src`**: Contain all logic source code of your Admin Portal. Inside `src` folder:

	* **`atoms`**: Recoil's atoms and selectors definement (centralized state)
	* **`components`**: reusable components written in React.JS
	* **`hooks.ts`**: reusable custom hooks
	* **`models`**: contain TypeScript type and interface declarations
	* **`pages`**: a Page is also a component but will act as an entire view. Page must be registered inside root component to handle routing
	* **`services`**: reusable logic for complex tasks that should be separated from your component, such as fetching API, calling 3rd party service like Geolocation,...
	* **`utils`**: reusable utility functions, such as distance calculation, notification, etc,...
	* **`App.tsx`**: root component
	* **`config.ts`**: global configuration depended on .env and mode
	* **`index.tsx`**: entry point of your Admin Portal
	* **`style.less`**: plain CSS custom style (TailwindCSS should be prefered, only use this option when could achieve the same thing with Tailwind)
	* **`modules.d.ts`**: contain TypeScript declarations for third party modules
	
* **`public`**: contain binary assets of your Admin Portal, such as icon, background, etc,... and index.html file

The other files (such as `tailwind.config.js`, `craco.config.js`, `tsconfig.json`, `launch.json`) are configurations for libraries used in your application. Visit the library's documentation to learn how to use them.

## Installation Guide

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

- [ReactJS](https://reactjs.org)
- [RecoilJS](https://recoiljs.org)
- [TailwindCSS](https://tailwindcss.com)
- [Ant Design](https://ant.design/components/overview/)
- [Ahooks](https://ahooks.js.org)
- [MomentJS](https://momentjs.com)
- [TypeScript](https://www.typescriptlang.org)
