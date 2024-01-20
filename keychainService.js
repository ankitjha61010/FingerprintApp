import {View, Text, Button, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const App = () => {
  const [publicKeyToServer, sendPublicKeyToServer] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const rnBiometrics = new ReactNativeBiometrics();

  useEffect(() => {
    Biometric();
    rnBiometrics.createKeys().then(resultObject => {
      const {publicKey} = resultObject;
      console.log(publicKey);
      sendPublicKeyToServer(publicKey);
    });
    isEnabled && createSignatures();
  }, [isEnabled]);

  const Biometric = async () => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
      }  if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
      }  if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
      } else {
        console.log('Biometrics not supported', );
      }
    });
  };

  const createSignatures = () => {
    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'Use your FingerPrint';






    rnBiometrics
      .createSignature({
        promptMessage: "Verify it's you",
        payload: 'Hello, world!',
        cancelButtonText: 'cancel',
      })
      .then(resultObject => {
        const {success, signature} = resultObject;

        if (success) {
          console.log(success);
          console.log(signature);
          setIsEnabled(true);
          // verifySignatureWithServer(signature, payload);
        }
      });
  };
  return (
    <View>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text>Abhishek is a good Boy</Text>
    </View>
  );
};

export default App;
