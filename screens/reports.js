import React, {Component, Fragment} from "react";
// native modules
import {ScrollView, Text, View, Image, Picker} from "react-native";
// redux modules
import {connect} from "react-redux";
import {GET} from "../store/actioncreators";
import {find_bugs} from "../store/endpoints";
import {ADD_BUG_LIST} from "../store/actiontypes";
// style
import Empty from "../components/empty";
import {WhiteSpace, WingBlank, Icon} from "@ant-design/react-native";
import {formStyle, myReports} from "../style";
import {Loader} from "../components/loader";
import {Status} from "../constants/status";
import {
	Tab,
	Tabs,
	Card,
	CardItem,
	Header,
	Left,
	Button,
	Body
} from "native-base";
import DateTimePicker from "react-native-modal-datetime-picker";

class BugReports extends Component {
	state = {
		selected: "key0",
		chosenDate: new Date(),
		isDateTimePickerVisible: false
	};

	onValueChange = value => {
		this.setState({selected: value});
		console.log("&&&&&&&&&& ", this.state.selected);
	};

	setDate = newDate => {
		this.setState({chosenDate: newDate});
	};

	showDateTimePicker = () => {
		this.setState({isDateTimePickerVisible: true});
	};

	hideDateTimePicker = () => {
		this.setState({isDateTimePickerVisible: false});
	};

	handleDatePicked = date => {
		console.log("A date has been picked: ", date);
		this.hideDateTimePicker();
	};

	render() {
		const {bugs} = this.props;
		const {selected, chosenDate} = this.state;
		return (
			<View>
				<Picker
					mode="dropdown"
          note={false}
					style={{width: "100%", flex: 1, justifyContent: "center", padding: 5}}
					selectedValue={selected}
					onValueChange={value => this.onValueChange(value)}
				>
					<Picker.Item label="Last 7 days" value="key0" />
					<Picker.Item label="Last 30 days" value="key1" />
					<Picker.Item label="Last year" value="key2" />
					<Picker.Item label="Lifetime" value="key3" />
					<Picker.Item label="Custom" value="key4" />
				</Picker>
				<DateTimePicker
					isVisible={
						selected === "key4" || this.state.isDateTimePickerVisible
							? true
							: false
					}
					maximumDate={new Date()}
					onConfirm={this.handleDatePicked}
					onCancel={this.hideDateTimePicker}
				/>

				{bugs.length
					? bugs.map((item, key) => {
							console.log("%%%%%%%%%%", item);
							return (
								<View key={key} style={{paddingLeft: 5, marginTop: 15}}>
									<Card style={{marginTop: -10}}>
										<CardItem
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "flex-start"
											}}
										>
											<Text style={myReports.title}>{item.configs.title}</Text>
											<View style={myReports.cardData}>
												<Image
													source={{uri: item.image}}
													style={{width: 70, height: 70}}
												/>
												<Text style={myReports.app_name}>{item.app_name}</Text>
											</View>
										</CardItem>
									</Card>
								</View>
							);
					  })
					: Empty}
			</View>
		);
	}
}

class Reports extends Component {
	state = {loaded: false};
	async componentDidMount() {
		const {dispatch} = this.props;
		const response = await dispatch(GET(find_bugs, ADD_BUG_LIST));
		if (response.code === 200) await this.setState({loaded: true});
	}

	render() {
		const {loaded} = this.state;
		const {Bugs, history} = this.props;
		if (!loaded) return Loader;
		return (
			<>
				<Header
					style={{
						padding: 10,
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
            My reports
          </Text>
          </Body>
				</Header>
				<ScrollView
					style={{flex: 1, padding: 0, marginTop: -16, width: "100%"}}
				>
					{Bugs.length ? (
						<Fragment>
							<Tabs
								style={{
									backgroundColor: "white",
									color: "black",
									width: "100%"
								}}
								tabBarUnderlineStyle={{backgroundColor: "black", height: 2}}
							>
								<Tab
									heading="PENDING"
									tabStyle={{backgroundColor: "white", color: "black"}}
									activeTabStyle={{backgroundColor: "white"}}
									textStyle={{color: "grey"}}
									activeTextStyle={{color: "black"}}
								>
									<BugReports bugs={Bugs.filter(bug => bug.status === "3")} />
								</Tab>
								<Tab
									heading="ACCEPTED"
									tabStyle={{backgroundColor: "white", color: "black"}}
									activeTabStyle={{backgroundColor: "white"}}
									textStyle={{color: "grey"}}
									activeTextStyle={{color: "black"}}
								>
									<BugReports bugs={Bugs.filter(bug => bug.status === "1")} />
								</Tab>
								<Tab
									heading="REJECTED"
									tabStyle={{backgroundColor: "white", color: "black"}}
									activeTabStyle={{backgroundColor: "white"}}
									textStyle={{color: "grey"}}
									activeTextStyle={{color: "black"}}
								>
									<BugReports bugs={Bugs.filter(bug => bug.status === "2")} />
								</Tab>
							</Tabs>
							<WhiteSpace size="lg" />
						</Fragment>
					) : (
						Empty
					)}
				</ScrollView>
			</>
		);
	}
}

const get = state => ({Bugs: state.Bugs});
export default connect(get)(Reports);
