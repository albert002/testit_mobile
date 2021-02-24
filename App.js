import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View, Button } from 'react-native';
import { AppLoading, Font } from 'expo';
// redux modules
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import Store from './store/reducers';
import { PublicRoutes, PrivateRoutes } from './constants/routes';
import { composeWithDevTools } from 'remote-redux-devtools';
import { NativeRouter, Route, Redirect, Switch } from 'react-router-native';

const store = createStore(Store, composeWithDevTools(applyMiddleware(thunk)));

class App extends Component {
  state = { authorized: false, isReady: false };

  static getDerivedStateFromError = error => console.error(error);

  componentDidMount = async () => {
    await Font.loadAsync('antoutline', require('@ant-design/icons-react-native/fonts/antoutline.ttf'));
    await Font.loadAsync('antfill', require('@ant-design/icons-react-native/fonts/antfill.ttf'));
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    this.setState({ isReady: true, authorized: token ? true : false });
  };

  onAuthorize = (authorized, token) =>
    this.setState({ authorized }, () => (authorized ? AsyncStorage.setItem('token', token) : AsyncStorage.removeItem('token')));

  // this is experimental code
  removeToken = () => {
    AsyncStorage.removeItem('token');
    this.forceUpdate();
  };

  render() {
    const { isReady, authorized } = this.state;
    if (!isReady) return <AppLoading />;

    return (
      <Provider store={store}>
        {/* <View style={{ position: 'absolute', bottom: 0, alignSelf: 'flex-end' }}>
          <Button title="delete token" onPress={this.removeToken} sty />
        </View> */}
        <NativeRouter>
          <Switch>
            {authorized
              ? PrivateRoutes.map(
                  item =>
                    item.key === 1 && (
                      <Route
                        path={item.path}
                        render={route => (
                          <item.component onAuthorize={this.onAuthorize} params={route.match.params} history={route.history} />
                        )}
                        key={item.key}
                      />
                    )
                )
              : PublicRoutes.map(item => (
                  <Route
                    exact={item.key === 1}
                    path={item.path}
                    render={(route) => <item.component onAuthorize={this.onAuthorize} history={route.history}/>}
                    key={item.key}
                  />
                ))}
            {authorized ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Switch>
        </NativeRouter>
      </Provider>
    );
  }
}
export default App;
