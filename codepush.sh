#!/usr/bin/env bash
APP_CENTER_TOKEN="0614837279ec93b81b93a2376fdf5a8ceb069442"
version=`grep codepush_version package.json | sed 's/.*"codepush_version": "\(.*\)".*/\1/'`
echo "Deploying to Devices running on Version "$version

appcenter codepush release-react -a jbagaresgaray/Dishdashdine-App -d Staging --token "$APP_CENTER_TOKEN" --p ios/DishDash/Info.plist --xcode-project-file ios/DishDash.xcodeproj/project.pbxproj
