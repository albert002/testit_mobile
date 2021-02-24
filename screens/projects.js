import React from 'react';
// native modules
import { View, Platform, BackHandler, Image } from 'react-native';
import Dialog from "react-native-dialog";

// redux
import { connect } from 'react-redux';
import { find_projects, user_apps, user_logout } from '../store/endpoints';
import { ADD_PROJECTS, ADD_ACTIVE_PROJECTS, RESET_STORE } from '../store/actiontypes';
import { GET, POST, ActionCreator } from '../store/actioncreators';

// subcomponents
import AllProjects from './all_projects';
import ActiveProjects from './active_projects';
import {sidebar} from "../components/sidebar";

// style
import { Tabs, Icon, Drawer } from '@ant-design/react-native';
import { Loader } from '../components/loader';
import {
	Container,
	Header,
	Content,
	Card,
	CardItem,
	Right,
  Left,
  Button,
  Title
} from "native-base";

const tabs = [{ title: 'TESTS' }, { title: 'MY TASKS' }];

class Projects extends React.Component {
  state = { loaded: false, showDialog: false };

  confirmDialog = () => {
    this.setState({showDialog: true})
    return true
  }

  handleOk = () => {
    this.setState({showDialog: false})
    BackHandler.exitApp()
  }

  handleCancel = () => {
    this.setState({showDialog: false})
    return null
  }

	logout = async () => {
		const {onAuthorize, dispatch} = this.props;
		const response = await dispatch(POST(user_logout));
		if (response.code === 200) {
			await dispatch(ActionCreator(RESET_STORE));
			onAuthorize(false);
		} else alert(response.message);
	};



  async componentDidMount() {
    const { dispatch, device, projects, activeProjects } = this.props;
    const { OS, Version } = Platform;
    // find device os id
    const OSNumber = await device.find(item => item.name.toLowerCase() === OS).id;
    // check if data exist or not to make request
    if (!activeProjects) await dispatch(GET(user_apps, ADD_ACTIVE_PROJECTS));
    await dispatch(GET(find_projects(OSNumber, Version), ADD_PROJECTS));
    await this.setState({ loaded: true });
    BackHandler.addEventListener("hardwareBackPress",() => this.confirmDialog())
  }

  render() {
    const { loaded } = this.state;
    const { history, projects, activeProjects, dispatch, Profile } = this.props;
    if (!loaded) return Loader;
    return (
			<Drawer
				sidebar={sidebar(Profile, this.logout, this.drawer, history, dispatch)}
				position="left"
				open={false}
				drawerRef={el => (this.drawer = el)}
				closeDrawer={this.closeDrawer}
				drawerBackgroundColor="#fff"
				drawerWidth={300}
			>
      <View style={{ flex: 1, borderWidth: 0 }}>
      <Header
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          backgroundColor: "#4b5b6a",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Left>
          <Icon
            name="menu"
            onPress={() => this.drawer && this.drawer.openDrawer()}
            style={{margin: 10, color: "white", fontSize: 24}}
          />
        </Left>
        <View style={{marginLeft: "25%", marginRight: "auto"}}>
          <Image
            style={{width: 50, height: 50}}
            source={require("../assets/logo.png")}
          />
        </View>
        <Right>
          <Button transparent>
            <Icon
              name="filter"
              style={{color: "white", fontSize: 24}}
              onPress={() => this.openFilters()}
            />
          </Button>
          <Button transparent>
            <Icon name="bell" style={{color: "white", fontSize: 24}} />
          </Button>
        </Right>
      </Header>
      {this.state.showDialog ?(<View>
        <Dialog.Container visible={this.state.showDialog}>
          <Dialog.Title>Confirm exit</Dialog.Title>
            <Dialog.Description>
              Do you want to exit?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={this.handleCancel}/>
            <Dialog.Button label="Exit" onPress={ this.handleOk}/>
        </Dialog.Container>
      </View>):
        null
      }
        <Tabs tabs={tabs} style={{ flex: 1 }} tabBarInactiveTextColor="#4b5b6a" tabBarUnderlineStyle={{backgroundColor: "#4b5b6a"}}>
          <AllProjects history={history} projects={projects} active={activeProjects} dispatch={dispatch} />
          <ActiveProjects history={history} projects={activeProjects} dispatch={dispatch} />
        </Tabs>
      </View>
			</Drawer>
    );
  }
}

const get = state => ({ projects: state.Projects, activeProjects: state.ActiveProjects, device: state.Device, Profile: state.Profile });

export default connect(get)(Projects);
