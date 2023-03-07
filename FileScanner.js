import React, { useState, useEffect } from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import RNQRGenerator from 'rn-qr-generator';

export default function FileScanner({navigation, route}){
  const [scannedImage, setScannedImage] = useState("");
  const [qr, setQR] = useState("");

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument();

    // check if undefined
    if (scannedImages) {
      // get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        setScannedImage(scannedImages[0]);
        route.params.setScanImage(scannedImages[0]);
      }
    }

  };

  useEffect(() => {
    // call scanDocument on load
    scanDocument();
  }, []);

  useEffect(() => {
    // call scanDocument on load
    const z = loadQR();
    }, [scannedImage]);


  const loadQR = () => {
    RNQRGenerator.detect({
      uri: scannedImage, // local path of the image. Can be skipped if base64 is passed.
      // base64: imageBase64String, // If uri is passed this option will be skipped.
    })
        .then(response => {
          const { values } = response; // Array of detected QR code values. Empty if nothing found.
          console.log(values);
          setQR(values);
        })
        .catch(error => console.log('Cannot detect QR code in image', error));
  }

  return (
      <View style={styles.container}>
        <View style={styles.contextContainer}>
          <Image
              style={{ width: '100%', height: '100%', resizeMode:'contain' }}
              source={scannedImage ? {uri: scannedImage} : null}
          />
        </View>
        <View style={styles.contextContainer}>
          <Text>QR data: {qr}</Text>
          <Button onPress={scanDocument} title="Next scan"/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextContainer: {
    flex: 1,
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})
