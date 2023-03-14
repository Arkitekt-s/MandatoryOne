import "dotenv/config";
export default {
  "expo": {
    "name": "soheil",
    "slug": "soheil",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
  "expo-yarn-workspaces": {
    "symlinks": ["expo-constants"]
  },
  "extra":{ "firebaseConfig": {
    "apiKey": process.env.API_KEY,
        "authDomain": process.env.AUTH_DOMAIN,
        "projectId": process.env.PROJECT_ID,
        "storageBucket": process.env.STORAGE_BUCKET,
        "messagingSenderId": process.env.MESSAGING_SENDER_ID,
        "appId": process.env.APP_ID,
        "measurementId": process.env.MEASUREMENT_ID

  }
  },
  "plugins": [
    [
      "expo-image-picker",
      {
        "photosPermission": "Allow to access your photos.",
        "savePhotosPermission": "Allow to save photos.",
        "isAccessMediaLocationEnabled": true
      }
    ]
  ]
}

}
