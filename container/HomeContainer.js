import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { NativeBaseProvider, Container } from 'native-base';
import axios from 'axios';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import { AppContext } from '../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01152B',
    height: 60
  },
  heading: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1
  }
});


export default function HomeContainer() {
  const [news, setNews] = useState([]);
  const [pageLoadingStatus, setPageLoadingStatus] = useState(true);
  const appContext = useContext(AppContext);
  console.log(appContext)
  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    debounce(getNews, 300)();
  }, [appContext.searchValue]);

  function debounce(func, timeout = 500) {
    let timer;
    return function () {
      const context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, timeout)
    }
  }

  function getNews() {
    axios({
      method: 'GET',
      url: 'https://gnews.io/api/v4/top-headlines?&token=4c53e38baf4e4cc3ab33144f8c404212',
      params: { lang: "ta", q: appContext.searchValue || "" }
    }).then((response) => {
      console.log(response.data.articles);
      setPageLoadingStatus(false)
      setNews(response.data.articles)
    })
  }


  return (
    <NativeBaseProvider>
      {!pageLoadingStatus ?
        <Container style={{ margin: 10, alignItems: "center", maxWidth: "100%" }}>
          <ScrollView centerContent={true} contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
            {news.length ?
              news.map((eachNews, index) => <Card key={index} news={eachNews} />)
              : <View style={styles.container}>
                <Text>No such data...</Text>
              </View>
            }
          </ScrollView>
        </Container> :
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>}
    </NativeBaseProvider>
  );
}

