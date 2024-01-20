import {View, Text, TextInput, Button, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [EnableFingerPrint, setEnableFingerPrint] = useState(false);

  useEffect(() => {
    authenticateWithTouchID();
  }, []);

  async function authenticateWithTouchID() {
    const optionalConfigObject = {
      title: 'Well Kept ', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    try {
      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          // Success code
          if (biometryType === 'FaceID') {
            console.log('FaceID is supported.');
          } else {
            setEnableFingerPrint(true);

            // Alert.alert('TouchID is supported.');
          }
        })
        .catch(error => {
          // Failure code
          console.log(error);
          setEnableFingerPrint(false);
        });
    } catch (error) {
      console.log(error);
    }

    try {
      const authenticated = await TouchID.authenticate(
        'Authenticate to log in',
        optionalConfigObject,
      );
      console.log('Authenticated with Touch ID:', authenticated);
      setAuthenticated(authenticated);
      setEnableFingerPrint(true)

    } catch (error) {
      console.log("Couldn't authenticate with Touch ID:", error);
      setEnableFingerPrint(false);
    }
  }

  // async function handleLogin() {
  //   if (authenticated) {
  //     // User is authenticated with Touch ID, skip login
  //     console.log('User is authenticated with Touch ID!');
  //   } else {
  //     // User is not authenticated with Touch ID, check credentials
  //     const credentials = await retrieveCredentials();
  //     if (credentials && credentials.username === username && credentials.password === password) {
  //       console.log('Login successful!');
  //       await storeCredentials(username, password);
  //     } else {
  //       console.log('Login failed!');
  //     }
  //   }
  // }

  return (
    <View>
      {/* <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry /> */}
      {/* <Button title="Log in" onPress={handleLogin} /> */}
      {authenticated ? (
        <Text>Authenticated with Touch ID!</Text>
      ) : (
        EnableFingerPrint && (
          <Button title="Authenticate with Touch ID" onPress={{}} />
        )
      )}
    </View>
  );
};
export default App;
