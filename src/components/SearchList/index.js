import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';

const SearchList = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setOriginalData(json);
      });
  }, []);

  console.log(data);

  const renderPost = post => (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>
        {post.title}
      </Text>
      <Text style={styles.body} numberOfLines={4}>
        {post.body}
      </Text>
    </View>
  );

  const search = s => {
    // transformei originalData em um novo array
    let arr = JSON.parse(JSON.stringify(originalData));

    // filtro o valor que retorna true no includes
    setData(arr.filter(d => d.title.includes(s) || d.body.includes(s)));
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Pesquise aqui..."
        onChangeText={s => search(s)}
        autoCapitalize="none"
      />
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => renderPost(item)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
  },
  body: {
    fontSize: 13,
    color: '#777',
    fontWeight: 'normal',
    marginTop: 7,
  },
  input: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 10,
  },
});

export default SearchList;
