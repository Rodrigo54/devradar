import React from 'react';
import { WebView } from 'react-native-webview';
import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
  navigation: NavigationStackProp;
};

const Profile: React.FC<Props> = ({ navigation }) => {
  const githubUsername = navigation.getParam('github_username');
  return(<WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />);
}
export default Profile;
