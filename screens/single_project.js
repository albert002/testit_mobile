import React, {useState} from "react";
import Dialog from "react-native-dialog";
// redux
import {connect} from "react-redux";
import {cancel_app, book_project} from "../store/endpoints";
import {DELETE, ActionCreator, PUT} from "../store/actioncreators";
import {DELETE_ACTIVE_PROJECT, ADD_ACTIVE_PROJECT} from "../store/actiontypes";
// native modules
import {
	ScrollView,
	View,
	Text,
	Image,
	Linking,
	Platform,
	BackHandler,
	TouchableWithoutFeedback
} from "react-native";
// style
import {
	Carousel,
	Portal,
	WhiteSpace,
	Provider,
	Toast,
	Icon
} from "@ant-design/react-native";
import {brandColor} from "../style";
import FadeInView from "../components/animated_view";
import {SingleProjectStyle as styles} from "../style/index";
import {
	List,
	ListItem,
	Right,
	Fab,
	Body,
	Header,
	Button,
	Left,
	Picker
} from "native-base";

const deleteApp = async (dispatch, app_id, cycle_id, history) => {
	const response = await dispatch(
		DELETE(cancel_app(app_id), {cycle_id: cycle_id.toString()})
	);
	console.log("////////////////////////", app_id);
	console.log("////////////////////////", cycle_id);
	console.log("////////////////////////", response);
	if (response.code === 200) {
		dispatch(ActionCreator(DELETE_ACTIVE_PROJECT, cycle_id));
		history.goBack();
	} else Toast.fail(response.message, 3);
};

const goToBack = history => {
	history.goBack();
	return true;
};

const downloadApp = async (url, app_id, cycle_id, props) => {
	const {OS} = Platform;
	const {Device, dispatch} = props;
	const { Projects } = props;
	// find device os id
	const user_os_id = await Device.find(item => item.name.toLowerCase() === OS)
		.id;

		console.log("download", user_os_id)
	const response = await dispatch(
		PUT(book_project(app_id), {
			cycle_id: cycle_id.toString(),
			user_os_id: Projects.user_os_version_id.toString()
		})
	);
	console.log({
		cycle_id: cycle_id.toString(),
		user_os_id: Projects.user_os_version_id.toString()
	});
	console.log("blaaa>>>>>>>>", Projects.user_os_version_id);

	if (response.code === 200) {
		console.log("RESPONSE RESULT", response.result)
		await dispatch(ActionCreator(ADD_ACTIVE_PROJECT, response.result));
		Linking.openURL(url);
	} else Toast.fail(response.message, 3);
};

const SingleProject = props => {
	const {Projects, params, history, dispatch, ActiveProjects} = props;
	const [dialogVisible, setdialogVisible] = useState(false);
	BackHandler.addEventListener(
		"hardwareBackPress",
		goToBack.bind(this, history)
	);
  const handleOk = (dispatch, app_id, cycle_id, history) => {
    deleteApp(dispatch, app_id, cycle_id, history)
    setdialogVisible(false)
  }
  const handleCancel = () => {
    setdialogVisible(false)
  }
	const Project = Projects.list.find(
		item => item.cycle_id === Number(params.id)
	);
	const {app_name, app_id, image, cycle_id, test_settings, platform} = Project;
	const {
		title,
		goal_of_this_test,
		out_of_scope,
		current_version,
		categories,
		url
	} = test_settings;
	const currentCycle =
		ActiveProjects &&
		ActiveProjects.find(it => Number(it.cycle_id) === Number(params.id))
			? true
			: false;
	return (
		<Provider>
			<Header
				style={{
					padding: 10,
					paddingTop: 13,
					backgroundColor: "#4b5b6a",
					marginBottom: 10
				}}
			>
				<Left>
					<Button transparent onPress={() => history.goBack()}>
						<Icon name="arrow-left" />
					</Button>
				</Left>
				<Body>
					<Text style={{color: "white", marginLeft: -10, fontSize: 18}}>
						{app_name}
					</Text>
				</Body>
				{currentCycle ? (
					<Right>
						<Button
							transparent
							onPress={() => {
								setdialogVisible(true)
							}}
						>
							<View style={{transform: [{rotate: "90deg"}]}}>
								<Icon name="ellipsis" />
							</View>
						</Button>
					</Right>
				) : null}
			</Header>
			<ScrollView>
				<FadeInView>
						{dialogVisible ?<View><Dialog.Container visible={dialogVisible}>
							<Dialog.Title>Leave testing group</Dialog.Title>
							<Dialog.Description>
								Do you want to leave testing group?
							</Dialog.Description>
							<Dialog.Button label="Leave" onPress={ () => {deleteApp(dispatch, app_id, cycle_id, history),setdialogVisible(false)} }/>
							<Dialog.Button label="Cancel" onPress={ () => handleCancel()}/>
						</Dialog.Container></View> : null}
					{console.log("++++++", Project)}
					<View
						style={{
							flexDirection: "column",
							alignItems: "flex-start",
							justifyContent: "space-around"
						}}
					>
						<Text style={styles.title}>{title}</Text>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center"
							}}
						>
							<Image
								source={{uri: image}}
								style={{
									width: 70,
									height: 70,
									alignSelf: "flex-start",
									margin: 25
								}}
							/>
							<View style={{display: "flex", flexDirection: "column"}}>
              <View style={{display: "flex", flexDirection: "row"}}>
              {platform.id === 1 ? <Icon name="global" /> : platform.id === 2 ? <Icon name="appstore" /> : null}
								<Text children={`Version. ${current_version}`} style={{color: "grey", marginLeft: 8}}/>
              </View>
								{url ? (
									<Button
										style={styles.downloadApp}
										onPress={() => downloadApp(url, app_id, cycle_id, props)}
									>
										<Text style={{color: "white"}}>DOWNLOAD</Text>
									</Button>
								) : null}
							</View>
						</View>
					</View>
					<View style={{padding: 15, marginTop: -10}}>
						<Text
							children="REWARDS FOR CATEGORIES"
							style={{
								fontWeight: "bold",
								color: "#00bdaa",
								textAlign: "center"
							}}
						/>
						<ScrollView
							horizontal={true}
							style={styles.wrapper}
							showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: -20}}
						>
							{categories.map((item, key) => (
								<View style={[styles.containerHorizontal]} key={key}>
									<Text
										style={{fontSize: 20, fontWeight: "bold", color: "#00bdaa"}}
									>
										$ {item.balance}
									</Text>
									<Text style={{color: brandColor, fontSize: 14}}>
										{item.name}{" "}
									</Text>
								</View>
							))}
						</ScrollView>
					</View>
					<View style={{padding: 15}}>
						<Text
							children="GOAL OF THIS TEST"
							style={{fontWeight: "bold", color: brandColor, marginTop: -20}}
						/>
						<Text children={goal_of_this_test} style={styles.textContent}/>
					</View>
					<View style={{padding: 15}}>
						<Text
							children="OUT OF SCOPE"
							style={{fontWeight: "bold", color: "#da3e00"}}
						/>
						<Text children={out_of_scope} style={styles.textContent}/>
					</View>
					<View style={{padding: 15}}>
						<Text
							children="ACCEPTED LANGUAGES"
							style={{fontWeight: "bold", color: "#4d6eb6"}}
						/>
						<Text children={out_of_scope} style={styles.textContent}/>
					</View>

					<View style={{padding: 15}}>
						<Text
							children="Reports written on another language will not be accepted."
							style={{color: brandColor}}
						/>
						<WhiteSpace />
						<Text
							children="If someone has sent same report before you, you earn 10 percent of the value of the report."
							style={{color: brandColor, marginTop: 10}}
						/>
					</View>
				</FadeInView>
			</ScrollView>
			<Fab
				position="bottomRight"
				style={{backgroundColor: "grey"}}
				onPress={() =>
					history.push(`/dashboard/report_bug/${app_id}/cycle/${cycle_id}`)
				}
			>
				<Icon name="plus" />
			</Fab>
		</Provider>
	);
};

const get = state => ({
	Projects: state.Projects,
	ActiveProjects: state.ActiveProjects,
	Device: state.Device
});
export default connect(get)(SingleProject);
