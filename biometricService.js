import TouchID from 'react-native-touch-id';

export const authenticateFingerPrint = () => {
  return new Promise((resolve, reject) => {
    // configuration object for more detailed dialog setup and style:
    // const optionalConfigObject = {
    //     title: 'Authentication Required', // Android
    //     imageColor: '#e00606', // Android
    //     imageErrorColor: '#ff0000', // Android
    //     sensorDescription: 'Touch sensor', // Android
    //     sensorErrorDescription: 'Failed', // Android
    //     cancelText: 'Cancel', // Android
    //     fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    //     unifiedErrors: false, // use unified error messages (default false)
    //     passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    // };
    let fingerprintLableForOS =
      Platform.OS == 'ios' ? 'Touch ID' : 'Fingerprint';

    TouchID.authenticate('Login to [appname] using ' + fingerprintLableForOS)
      .then(success => {
        // console.log('Authenticated Successfully', success)
        resolve(success);
      })
      .catch(error => {
        console.log('Authentication Failed', error.code);
        reject(error);
      });
  });
};
