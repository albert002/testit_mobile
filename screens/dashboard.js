import React, {Component} from "react";
// routing
import {Route, Switch} from "react-router-native";
import {Redirect, withRouter} from "react-router-native";
import {PrivateRoutes} from "../constants/routes";
//subcomponents
import {sidebar} from "../components/sidebar";
// redux
import {connect} from "react-redux";
import {POST, ActionCreator} from "../store/actioncreators";
import {InitRequest} from "../store/initRequest";
import {user_logout} from "../store/endpoints";
import {RESET_STORE} from "../store/actiontypes";
// style
import {View, Image, Text, Dimensions, Platform,StatusBar} from "react-native";
import {Icon} from "@ant-design/react-native";
import {Loader} from "../components/loader";
import {brandColor} from "../style";
import {Container, Header, Left, Body, Right, Button, Title} from "native-base";

//console Provider
import ConsoleProvider from 'react-native-dev-console'



class Dashboard extends Component {
	state = {isOpen: false, loaded: false, drawerTop: false};

	logout = async () => {
		const {onAuthorize, dispatch} = this.props;
		const response = await dispatch(POST(user_logout));
		if (response.code === 200) {
			await dispatch(ActionCreator(RESET_STORE));
			onAuthorize(false);
		} else alert(response.message);
	};

	// get initial  data on mount
	componentDidMount = async () => {
		const {dispatch} = this.props;
		await InitRequest(dispatch);
		await this.setState({loaded: true});
	};


	render() {
		const {loaded} = this.state;
		const {Profile, history} = this.props;

		if (!loaded) return Loader;
		return (

				<View style={{flex: 1, marginTop: Platform.OS === "ios" ? 20 : StatusBar.currentHeight - 11, padding: 0}}>
					{/*<Header
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
					</Header>8*/}

					<View style={{flex: 1, marginTop: 10}}>
						<Switch>
							{PrivateRoutes.map(
								item =>
									item.key !== 1 && (
										<Route
											exact
											path={item.path}
											render={route => (
												<item.component
													params={route.match.params}
													history={route.history}
													onAuthorize={this.props.onAuthorize}
												/>
											)}
											key={item.key}
										/>
									)
							)}
							<Redirect to="/dashboard/projects" />
						</Switch>
					</View>
				</View>
		);
	}
}
const get = state => ({Profile: state.Profile});

export default withRouter(connect(get)(Dashboard));
