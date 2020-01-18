import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout, Region } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { NavigationStackProp } from 'react-navigation-stack';
import { MaterialIcons } from '@expo/vector-icons';

import api, { Dev } from '../services/api';

type Props = {
  navigation: NavigationStackProp;
};

const Main: React.FC<Props> = ({ navigation }) => {
  const [ devs, setDevs ] = useState<Dev[]>([]);
  const [ techs, setTechs ] = useState('');
  const [ currentRegion, setCurrentRegion ] = useState<Region>(null);

  useEffect(() => {
    loadPosition();
  }, []);

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;
    const response = await api.get<Dev[]>('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });
    setDevs(response.data);
  }

  async function loadPosition() {
    const { granted } = await requestPermissionsAsync();

    if (granted) {
      const { coords: { latitude, longitude } } = await getCurrentPositionAsync({
        enableHighAccuracy: true
      });

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
  }

  function handleRegionChange(region: Region) {
    setCurrentRegion(region)
  }

  if (currentRegion) {
    return(
      <>
        <MapView onRegionChange={handleRegionChange} initialRegion={currentRegion} style={styles.map}>
          {devs.map(dev => (
            <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
              <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
              <Callout onPress={() => navigation.navigate('Profile', { github_username: dev.github_username})}>
                <View style={styles.callout}>
                  <Text style={styles.devName}>{dev.name}</Text>
                  <Text style={styles.devBio}>{dev.bio}</Text>
                  <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <View style={styles.searchForm}>
          <TextInput
            style={styles.searchInput}
            placeholder='Buscar Devs por Techs...'
            placeholderTextColor='#9c9c9c'
            autoCapitalize='words'
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
          />
          <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
            <MaterialIcons style={styles.loadButtonIcon} name='my-location' size={20} />
          </TouchableOpacity>
        </View>
      </>
    );
  } else {
    return null;
  }

}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  callout: {
    width: 260,
  },
  devName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  devBio: {
    color: '#6e6e6e',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  searchForm: {
    position: 'absolute',
    top: 20,
    right: 20,
    left: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4dfe',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  },
  loadButtonIcon: {
    color: '#fff',
  }
});

export default Main;
