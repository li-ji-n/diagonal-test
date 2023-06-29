# Diagnal React Native App

This is a React Native app called Diagnal that displays a list of images from an OTT platform. The user can search for specific films using the search bar. The app loads data from JSON files and uses the React Native Fast Image component to display images efficiently.

## Features

- Displays a grid of images with their names.
- Implements search functionality to filter images based on the entered text.
- Loads data from JSON files representing content listings.
- Uses the React Native Fast Image component for optimized image loading.
- Supports pagination for loading more images when scrolling to the end.

## Note
- The back button in the app's display has no functionality. To implement a functional back button, additional packages might be required, which could increase the app's size. Currently, a text-based back button is used for Android, and a symbol is used for iOS.

## Installation

1. Clone the repository:

### `git clone https://github.com/li-ji-n/diagonal-test.git`

2. Change into the project directory:

### `cd Diagonal`

3. Install the dependencies:

### `npm install`

4. Start the development server:

### `npm start`

5. Run the app on an emulator or connected device:

### `npm run ios` // For iOS
### `npm run android` // For Android




Make sure you have the necessary development environment set up for React Native. You can find detailed instructions in the React Native documentation.

## Project Structure

- `App.js`: The main entry point of the application.
- `src/assets`: Contains JSON files representing the content listings and images used in the app.
- `src/components`: Contains reusable components used in the app.


## Dependencies

The project relies on the following dependencies:

- react-native
- react-native-linear-gradient
- react-native-fast-image

These dependencies are managed using npm and will be installed automatically when you run `npm install` as described in the Installation section.


### Conclusion

## Desin
In the shared design, the padding values are marked with a large margin. However, when I apply those exact values to the elements, they appear different compared to the design you provided. Consequently, the layout doesn't look good. Additionally, the specified font sizes also appear larger than expected when using the exact values. Considering your reply to my query, I choose the values accordingly.

## Image Display Options

In our application, we have two options for displaying images: using preloaded images from the project folder or fetching images from a remote source. After careful consideration, we have decided to implement the remote fetch method. This allows for more flexibility in image selection and reduces the app's size.

### Remote Fetch Method

To implement the remote fetch method, we use the provided URLs to directly load the images from a remote source. This approach eliminates the need to bundle all the images with the app and allows for dynamic image updates.

### Project Folder Method

Alternatively, we can use preloaded images from the project folder. To use this method, we have created an object called `ImageList` that maps the image names to their corresponding require paths. Here's an example of how to define the `ImageList` object:

```javascript
const ImageList = {
  'poster1.jpg': require('../assets/images/poster1.jpg'),
  'poster2.jpg': require('../assets/images/poster2.jpg'),
  'poster3.jpg': require('../assets/images/poster3.jpg'),
  'poster4.jpg': require('../assets/images/poster4.jpg'),
  'poster5.jpg': require('../assets/images/poster5.jpg'),
  'poster6.jpg': require('../assets/images/poster6.jpg'),
  'poster7.jpg': require('../assets/images/poster7.jpg'),
  'poster8.jpg': require('../assets/images/poster8.jpg'),
  'poster9.jpg': require('../assets/images/poster9.jpg'),
};

