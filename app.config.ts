import { ExpoConfig, ConfigContext } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.swjorl.movieapp.dev';
  }

  if (IS_PREVIEW) {
    return 'com.swjorl.movieapp.preview';
  }

  return 'com.swjorl.movieapp';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'movie-app (dev)';
  }

  if (IS_PREVIEW) {
    return 'movie-app (prev)';
  }

  return 'movie-app';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "movie-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/logo.png",
  scheme: "movies",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier()
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/logo.png",
      backgroundColor: "#ffffff",
    },
    package: getUniqueIdentifier()
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/logo.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/logo.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: "2ea92ae2-06eb-4289-88dd-5c05a53dd003"
    }
  }
})