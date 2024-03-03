# React Native Template

## 프로젝트 이름 변경

```sh
yarn ci:rename
```

## 파이어베이스 키파일 다운로드 및 프로젝트에 추가

- android/app/google-services.json
- ios/<project>/GoogleService-Info.plist

## XCode : 실행시켜서 프로젝트에 해당 파일추가

- Add GoogleService-Info.plist file to project

## XCode : 키파일의 URL 스키마 추가 - 프로젝트 - 인포탭

- Add REVERSED_CLIENT_ID to url sheme in Project Info

## Android Studio : 키스토어 파일 생성

1. Build -> Generate Signed Bundle / APK ...

- android/app/upload-keystore.jks

## 키스토어 파일 생성할 때, 입력한 정보로 keystore.prorperties 파일 생성

- <root>/keystore.properties

## 애드몹 프로젝트 아이디 추가 (app.json)

- "android_app_id": "ca-app-pub-...",
- "ios_app_id": "ca-app-pub-...",
- <Empty> 키워드 검색해서 BannerAD, RewardAD 컴포넌트에 해당 광고 아이디 추가

## 앱 아이콘 추가 (나중에 로고 정해지면 해도 안늦음)

- iOS: ios/<appname>/Images.xcassets/AppIcon.appiconset
- Android: android/app/src/main/res

## 플레이스토어 콘솔에 테스트 배포 올린 후 작업해야하는 내용 (구글 계정 연동)

- 구글 플레이 콘솔 : 앱 서명 키 복사 후, 파이어베이스 안드로이드 부분에 추가
  [설정 - 앱 서명 - 앱 서명 키 인증서 > SHA-1 인증서 지문]
- Android Studio : Gradle - signingReport 눌러서 키스토어 서명키 확인 후 동일하게 추가
