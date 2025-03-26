# Mobile App

## Features

- Customizable components and patterns (gluestack-ui).
- Dark mode support.
- Internationalization using i18next.
- Environment variable configuration (.env).
- Navigation with react-navigation.
- HTTP client integration with Axios and TanStack Query.
- Enhanced keyboard control with react-native-keyboard-controller.
- Local data storage with MMKV.
- State management using Zustand.
- OTA with [Revopush](https://docs.revopush.org/intro/getting-started). _Note: Replace `REVOPUSH_APP_NAME`, `REPLACE_REVOPUSH_KEY_HERE` with your revopush configuration_

## Tech Stack

| Library                          | Version  | Description                                                                                                                                            |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| react-native                     | 0.78.0   | Core framework for building mobile applications                                                                                                        |
| react                            | 19.0.0   | JavaScript library for building user interfaces                                                                                                        |
| gluestack-ui                     | v2       | Customizable UI components (`yarn dlx gluestack-ui add ...`) <br> [Gluestack UI Documentation](https://gluestack.io/ui/docs/components/all-components) |
| react-i18next                    | ^15.4.1  | Internationalization framework for React                                                                                                               |
| date-fns                         | ^4.1.0   | Modern JavaScript date utility library                                                                                                                 |
| react-native-config              | ^1.5.5   | Environment variable management for React Native                                                                                                       |
| react-navigation                 | ^7.0.17  | Routing and navigation for React Native                                                                                                                |
| lucide-react-native              | ^0.483.0 | Icon library for React Native                                                                                                                          |
| axios                            | ^1.8.4   | HTTP client for making API requests                                                                                                                    |
| @tanstack/react-query            | ^5.69.0  | Powerful data fetching and caching library                                                                                                             |
| react-native-keyboard-controller | ^1.16.8  | Enhances keyboard control and management for React Native                                                                                              |
| react-native-mmkv                | ^3.2.0   | Local storage solution for React Native                                                                                                                |
| zustand                          | ^5.0.3   | State management library                                                                                                                               |

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
│   /pages                 # Application pages
│   ├── /welcome
│       ├── controller.ts          # Business logic
│       ├── page.tsx               # UI implementation
│   /services              # API services, Firebase integration, GraphQL, etc.
│   /stores                # Zustand
│   /themes                # Theme config
│   /utils                 # Utility functions
...
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
