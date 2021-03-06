import {useFocusEffect} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-easy-toast';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Spacer} from '../components';

const Home = ({count, asyncIncrement, increment, resetCount}) => {
  const toast = useRef();
  const [loading, setLoading] = useState(false);

  useFocusEffect(() => {
    useCallback(() => {
      return () => resetCount();
    }, [count]);
  });

  const handleIncrement = (e) => {
    increment(1);
    toast.current.show('updated');
  };

  const handleIncrementAsync = async (e) => {
    setLoading(true);
    await asyncIncrement(1);
    toast.current.show('updated async');
    setLoading(false);
  };

  return (
    <>
      <View>
        <Toast position="center" ref={toast} />
        <Spacer y={2} />
        <Text>{count}</Text>
        <Spacer y={2} />
        <Button title="Increment" onPress={handleIncrement} />
        <Spacer y={2} />
        <Button
          loading={loading}
          title="Increment Async"
          onPress={handleIncrementAsync}
        />
      </View>
    </>
  );
};

const mapState = (state) => ({
  count: state.count,
});

const mapDispatch = (dispatch) => ({
  increment: dispatch.count.increment,
  asyncIncrement: dispatch.count.incrementAsync,
  resetCount: dispatch.count.reset,
});

export default connect(mapState, mapDispatch)(Home);
