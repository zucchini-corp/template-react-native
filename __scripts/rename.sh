#!/bin/bash

function install() {
  package_name=react-native-rename
  package_list=$(yarn list)

  if [[ $package_list == *"${package_name}"* ]]; then
      echo "${package_name} 패키지가 설치되어 있어, 설치를 생략합니다."
  else
      echo "${package_name} 패키지가 설치되어 있지 않아, 설치를 진행합니다."
      yarn add -D react-native-rename
  fi
}

function rename() {
  read -p "앱 이름 입력하기 (MyApp):" APP_NAME
  read -p "패키지 입력하기 (com.example.app):" BUNDLE_ID
  npx react-native-rename "${APP_NAME}" --bundleID "${BUNDLE_ID}" --skipGitStatusCheck
}

# 실행
function run() {
  install
  rename
}
run
