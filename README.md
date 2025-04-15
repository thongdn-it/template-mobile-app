# Mobile App

## Features

- Customizable components and patterns (gluestack-ui).
- Dark mode support.
- Internationalization using i18next.
- Environment variable configuration (.env).
- Navigation with react-navigation.
- HTTP client integration with Axios and TanStack Query. (demo using RESTful API from https://sampleapis.com).
- Enhanced keyboard control with react-native-keyboard-controller.
- Local data storage with MMKV.
- State management using Zustand.
- Forms with validation (React Hook Form vs Zod).
- [Custom Fonts](#add-custom-font-to-project).

## Tech Stack

| Library                          | Version  | Description                                                                                                                                                   |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| react-native                     | 0.78.0   | Core framework for building mobile applications                                                                                                               |
| react                            | 19.0.0   | JavaScript library for building user interfaces                                                                                                               |
| gluestack-ui                     | v2       | Customizable UI components (`yarn dlx gluestack-ui@0.7.13 add ...`) <br> [Gluestack UI Documentation](https://gluestack.io/ui/docs/components/all-components) |
| react-i18next                    | ^15.4.1  | Internationalization framework for React                                                                                                                      |
| date-fns                         | ^4.1.0   | Modern JavaScript date utility library                                                                                                                        |
| react-native-config              | ^1.5.5   | Environment variable management for React Native                                                                                                              |
| react-navigation                 | ^7.0.17  | Routing and navigation for React Native                                                                                                                       |
| lucide-react-native              | ^0.483.0 | Icon library for React Native                                                                                                                                 |
| axios                            | ^1.8.4   | HTTP client for making API requests                                                                                                                           |
| @tanstack/react-query            | ^5.69.0  | Powerful data fetching and caching library                                                                                                                    |
| react-native-keyboard-controller | ^1.16.8  | Enhances keyboard control and management for React Native                                                                                                     |
| react-native-mmkv                | ^3.2.0   | Local storage solution for React Native                                                                                                                       |
| zustand                          | ^5.0.3   | State management library                                                                                                                                      |

## Folder Structure

```
/assets                    # Application assets
├── /fonts                     # Font files
├── /images                    # Images and icons
├── /locales                   # Translation files
/src
├── /app                   # App Router | React Navigation
│   /components            # Shared UI components
│   ├── /providers             # UI providers used in the app
│   ├── shared                 # Custom UI
│   ├── /ui                    # Components & Patterns (e.g., shadcn, gluestack)
│   ├── /stories               # Storybook configurations for UI components
│   /data                  # Data handling, API calls, and caching
│   ├── /api                   # API request handlers
│   ├── /cache                 # Data caching logic
│   ├── /queries               # TanStack Query logic
│   /hooks                 # Custom hooks
│   /screens                 # Application screens | Features
│   ├── /welcome
│       ├── controller.ts          # Business logic
│       ├── page.tsx               # UI implementation
│   /services              # API services, Firebase integration, GraphQL, etc.
│   /stores                # Zustand
│   /themes                # Theme config
│   /utils                 # Utility functions
...
```

## Add Custom Font To Project

### iOS

1. Copy font files to assets folder (assets/fonts).

2. Add react-native.config.js.

```js
module.exports = {
  iosAssets: ['./assets/fonts/'],
};
```

3. Run script.

```bash
npx react-native-asset
```

### Android

1. Copy font files to `android/app/src/main/res/font`.

2. Run script `fixfonts.sh` in folder (assets/script) to rename font files.

```bash
./assets/script/fixfonts.sh ./android/app/src/main/res/font
```

> We must rename the font files following these rules to comply with Android asset names restrictions:
>
> - Replace - with \_;
> - Replace any uppercase letter with its lowercase counterpart.

3. Create the definition file `android/app/src/main/res/font/font_a.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<font-family xmlns:app="http://schemas.android.com/apk/res-auto">
    <font app:fontStyle="normal" app:fontWeight="100" app:font="@font/font_a_thin" />
    <font app:fontStyle="normal" app:fontWeight="200" app:font="@font/font_a_ultralight" />
    <font app:fontStyle="normal" app:fontWeight="300" app:font="@font/font_a_light" />
    <font app:fontStyle="normal" app:fontWeight="400" app:font="@font/font_a_regular" />
    <font app:fontStyle="normal" app:fontWeight="500" app:font="@font/font_a_medium" />
    <font app:fontStyle="normal" app:fontWeight="600" app:font="@font/font_a_semibold" />
    <font app:fontStyle="normal" app:fontWeight="700" app:font="@font/font_a_bold" />
    <font app:fontStyle="normal" app:fontWeight="800" app:font="@font/font_a_heavy" />
    <font app:fontStyle="normal" app:fontWeight="900" app:font="@font/font_a_black" />
</font-family>
```

4. Register the new font in `android/app/src/main/java/thongdn/template_mobile_app/MainApplication.kt`

```diff
package thongdn.template_mobile_app

import android.app.Application
+++ import com.facebook.react.common.assets.ReactFontManager
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  override fun onCreate() {
    super.onCreate()

+++    // Font Config
+++    ReactFontManager.getInstance().addCustomFont(this, "SF Pro Rounded", R.font.font_a);

    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }
}

```

### Use Custom Font

```tsx
<Text
  style={{
    fontFamily: 'Font A',
    fontWeight: 'bold',
    style: 'normal',
  }}>
  Hello world!
</Text>
```

### Set Default Font For Tailwind

Define font in `tailwind.config.js`

```js
 fontFamily: {
        heading: ['Font A', 'sans-serif'],
        body: ['Font A', 'sans-serif'],
        mono: ['Font A', 'sans-serif'],
        font_a: ['Font A', 'sans-serif'],
      },
```

```tsx
<Text className="font-font_a">Hello world!</Text>
```

## License

This repo is open-source and available under the MIT license.

## Author

This template is developed by Thong Dang. You can contact me at thongdn.it@gmail.com

If you like my project, you can [support me][buy_me_a_coffee_url] or star (like) for it.

<p align="center">
    <img src="https://media.giphy.com/media/hXMGQqJFlIQMOjpsKC/giphy.gif" alt="template-mobile-app-buy-me-a-coffee" style="aspect-ratio:385/405;" width="200" />
</p>

[//]: # 'reference links'
[buy_me_a_coffee_image_url]: https://media.giphy.com/media/hXMGQqJFlIQMOjpsKC/giphy.gif
[buy_me_a_coffee_url]: https://www.buymeacoffee.com/thongdn.it
