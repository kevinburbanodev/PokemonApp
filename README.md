## Recommended Steps for Using This Template:

**Before proceeding with the steps below, ensure that you have set up your local development environment following the official React Native documentation for your respective operating system (Windows, Linux, macOS).**

- **If you're using VSCode**, we recommend installing the following extensions:
   - [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
   - [ES7+ React/Redux/React-Native Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

- **Install dependencies**: Run `npm install` to install the required dependencies.

- **Update dependencies**:
   Use `npm update`. This command checks your project's dependencies and installs any available updates that are compatible with the version ranges specified in your `package.json`. It automatically installs newer versions if they meet those criteria.

   **Important considerations**:
   - **Version ranges**: The version ranges in your `package.json` determine which versions of each package are considered valid. For example, if you have `^1.0.0`, the latest version compatible with the major version 1 will be installed.
   - **Testing**: After updating dependencies, it's always a good idea to run extensive tests to ensure no new issues have been introduced to your application.
   - **Version conflicts**: In some cases, you might encounter version conflicts between different packages. If this happens, you may need to manually adjust the version ranges in your `package.json` or resolve dependencies manually.

- **Rename the app**: The template's default name is `CleanArchitectureTemplateApp`, and this is the name that will appear when the app is installed on mobile devices. To ensure your app has a custom name for both Android, iOS, and in `package.json`, we recommend using a tool like [react-native-rename](https://www.npmjs.com/package/react-native-rename). Once you've renamed the app, you can uninstall the package or, if you prefer, manually update the app name if you have the expertise.

---

## What This React Native Template Includes:

- **MVVM Structure (Model-View-ViewModel) and Clean Architecture**: 
   This project follows the MVVM design pattern combined with Clean Architecture principles to ensure scalability and maintainability.

- **Example Implementation**: 
   You’ll find a complete example of the MVVM structure and Clean Architecture applied to a `User` model, with mock user data to simulate real-world usage. You can see this in action in the `UsersScreen` component.

- **React Navigation**: 
   The project comes pre-configured with [React Navigation](https://reactnavigation.org/), featuring iOS-style `slide_from_right` animations. Navigation logic is neatly separated into its own `navigation` layer.

- **React Native Paper**: 
   Integrated for Material Design components, [React Native Paper](https://reactnativepaper.com/) adds a clean, Google-style Material Design look to your application components.

- **VSCode Debugger Configuration**: 
   A preconfigured `launch.json` file is included to simplify debugging within VSCode.

- **Release Scripts**: 
   The `package.json` includes `npm run android:release` and `npm run ios:release` scripts. These allow you to build and install the app in **release mode** on the respective platforms, so you can test the app on a device without needing to have it connected to your computer and running in debug mode.

---

This template is designed to give you a strong foundation for developing a React Native app using Clean Architecture and the MVVM pattern. Feel free to adapt it to your specific project needs!
