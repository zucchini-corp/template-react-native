# React Native Template

## Rename package

```sh
yarn ci:rename
```

## Add firebase config files

1. Download firebase config files

- android/app/google-services.json
- ios/<project>/GoogleService-Info.plist

2. Run XCode

- Add GoogleService-Info.plist file to project
- Add REVERSED_CLIENT_ID to url sheme in Project Info

## Generate keystore file using Android Studio

1. Build -> Generate Signed Bundle / APK ...

- android/app/upload-keystore.jks

## Set Google Admob id - app.json

- "android_app_id": "ca-app-pub-...",
- "ios_app_id": "ca-app-pub-...",
