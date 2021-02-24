import React, { Component } from 'react';
import { ScrollView, Text, Dimensions, TouchableWithoutFeedback, View, Image } from 'react-native';
import { List, WhiteSpace, Icon } from '@ant-design/react-native';
import { Container, Header, Content, Card, CardItem, Right } from 'native-base';
import {connect} from "react-redux";

// assets
import Empty from '../components/empty';
import FadeInView from '../components/animated_view';
import { AllProjectsStyle } from '../style/index'
const Item = List.Item;

class ActiveProjects extends Component {
  render() {
    const { projects, history,allProjects } = this.props;
    return (
      <ScrollView style={{ padding: 10 }}>
        <List style={{ padding: 5 }}>
          {projects.length
            ? projects.map((item, key) => (
                <FadeInView key={key}>
                  <WhiteSpace size="xs" />
                  {allProjects.list.map(app => Number(app.app_id) === Number(item.app_id) ? (

                    <Content key={ key }>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          history.push(`/dashboard/projects/${app.cycle_id}`)
                        }
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            padding: 10
                          }}
                        >
                          <Image
                            source={{uri: app.image}}
                            style={{height: 50, width: 50}}
                          />
                          <View style={AllProjectsStyle.appInfo}>
                            <View style={{display: "flex", flexDirection: "row"}}>
                            {app.platform.id === 1 ? <Icon name="global" /> : app.platform.id === 2 ? <Icon name="appstore" /> : null}
                            <Text style={AllProjectsStyle.appName}>
                              {console.log("APP NAME", app.app_name)}
                              {app.app_name}
                            </Text>
                            </View>
                            <Text
                              style={AllProjectsStyle.appSubTitle}
                            >{`${app.test_settings.categories.length} categories`}</Text>
                          </View>

                        </View>
                      </TouchableWithoutFeedback>
                    </Content>
                  ) : null)}


                  <WhiteSpace size="xs" />
                </FadeInView>
              ))
            : Empty}
        </List>
      </ScrollView>
    );
  }
}

const get = state => ({ allProjects: state.Projects});

export default connect(get)(ActiveProjects);
