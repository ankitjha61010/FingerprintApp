import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import ReactNativeBiometrics, {
  BiometryTypes,
} from 'react-native-face-fingerprint-auth';
import Fingerprint from 'cordova-plugin-fingerprint-aio'
const App = () => {
  const rnFaceFingerprintAuth = new ReactNativeBiometrics();

  useEffect(() => {
    face();
  }, []);
  const face = () => {



    Fingerprint.registerBiometricSecret({
      description: "Some biometric description",
      secret: "my-super-secret",
      invalidateOnEnrollment: true,
      disableBackup: true, // always disabled on Android
    }, successCallback, errorCallback);

    function successCallback(){
      alert("Authentication successful");
    }

    function errorCallback(error){
      alert("Authentication invalid " + error.message);
    }


    
  };
  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
