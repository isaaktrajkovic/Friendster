import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Card, Button} from 'react-native-elements';
import SwipeComponent from './SwipeComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

const Swipe = () => {
  const DATA = [
    {
      id: 1,
      text: 'Card #1',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
    },
    {
      id: 2,
      text: 'Card #2',
      uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
    },
    {
      id: 3,
      text: 'Card #3',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
    },
    {
      id: 4,
      text: 'Card #4',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
    },
    {
      id: 5,
      text: 'Card #5',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg',
    },
    {
      id: 6,
      text: 'Card #6',
      uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg',
    },
    {
      id: 7,
      text: 'Card #7',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg',
    },
    {
      id: 8,
      text: 'Card #8',
      uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg',
    },
  ];

  const renderCard = item => (
    <Card key={item.id} title={item.text} image={{uri: item.uri}}>
      <Text style={{marginBottom: 10}}>I can customize the Card further</Text>
      <Button backgroundColor="#03A9F4" title="View Now!" />
    </Card>
  );

  const renderNoMoreCards = () => (
    <Card title="All Done!">
      <Text style={{marginBottom: 10}}>There's no more content here!</Text>
      <Button backgroundColor="#03A9F4" title="Get more!" />
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text>SWipe</Text>
      <SwipeComponent
        data={DATA}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
        onSwipeLeft={(item: any) => console.log('on left swipe', item)}
        onSwipeRight={(item: any) => console.log('on right swipe', item)}
      />
    </View>
  );
};

export default Swipe;
