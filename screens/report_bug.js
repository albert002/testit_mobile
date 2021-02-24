import React, {Component, Fragment} from "react";
import {Redirect} from "react-router-native";
// redux modules
import {connect} from "react-redux";
import {PUT, ActionCreator} from "../store/actioncreators";
import {report_bug} from "../store/endpoints";
import {ADD_ACTIVE_PROJECT} from "../store/actiontypes";
import * as FileSystem from 'expo-file-system';

// style
import {View, Text, Image, ScrollView, TouchableWithoutFeedback, Dimensions} from "react-native";
import {
	InputItem,
	Icon,
	Toast,
	Portal,
	Button,
	WhiteSpace,
	Provider
} from "@ant-design/react-native";
import {formStyle, brandColor} from "../style";
import FadeInView from "../components/animated_view";
import {
	List,
	ListItem,
	Form,
	Input,
	Item,
	Header,
	Left,
	Body,
	Button as ButtonBase
} from "native-base";

// pickers
import * as DocumentPicker from "expo-document-picker";

const mimeFile = (file, mime) => {
	const uri = file.uri;
	const uriParts = uri.split(".");
	const fileType = uriParts[uriParts.length - 1];
	return {
		uri,
		name: mime === "image" ? `image.${fileType}` : `video.${fileType}`,
		type: mime === "image" ? `image/${fileType}` : `video/${fileType}`
	};
};

const initialState = {
	title: "",
	actual_result: "",
	excepted_result: "",
	steps: [null],
	image: [],
	video: [],
  file: [],
  nextFormEnabled: false,
};

class ReportBug extends Component {
	state = initialState;

	requestFile = async mime => {
		const file = await DocumentPicker.getDocumentAsync({
			type: mime === "image" ? "image/*" : mime === "video" ? "video/*" : "file/*"
		});
		if (file.type !== "cancel")
			mime === "image"
				? await this.setState({image: [...this.state.image, {file}]})
				: await this.setState({video: [...this.state.video, {file}]});
		else return false;
	};

	deleteItem = async (type, key) =>
		type === "video"
			? await this.setState({
					video: this.state.video.filter((item, index) => index !== key)
			  })
			: await this.setState({
					image: this.state.image.filter((item, index) => index !== key)
			  });

	addStep = () => this.setState({steps: [...this.state.steps, null]});

	removeStep = key =>
		this.setState({
			steps: this.state.steps.filter((it, index) => index !== key)
		});

	onChange = (val, key) => {
		const {steps} = this.state;
		steps[key] = val;
		this.setState({steps});
	};

  enableNextForm = () => {
    const { image, video } = this.state;
    if(image.length || video.length){
      this.setState({nextFormEnabled: true})
    }
    else {
      Toast.fail("Please add media files", 1);
    }
  }

	onSubmit = async () => {
		const {dispatch, params, history, Projects} = this.props;
		const {
			title,
			excepted_result,
			actual_result,
			image,
			video,
			steps
		} = this.state;
		const toast = Toast.loading("Loading...", 20);
		const data = new FormData();
		data.append("title", title);
		data.append("excepted_result", excepted_result);
		data.append("actual_result", actual_result);
		data.append("cycle_id", Number(params.cycle_id));
		data.append("steps", JSON.stringify(steps));
		data.append("user_os_version_id", Projects.user_os_version_id);
		image.length
			? image.map(item => data.append("image", mimeFile(item.file, "image")))
			: data.append("image", null);
		video.length
			? video.map(item => data.append("video", mimeFile(item.file, "video")))
			: data.append("video", null);
		console.log(JSON.stringify(data));
		const response = await dispatch(PUT(report_bug(params.app_id), data, true));
		console.log("Response ", response)
		if (response.code === 200) {
			await dispatch(ActionCreator(ADD_ACTIVE_PROJECT, response.result));
			await Portal.remove(toast);
			await Toast.success(response.message, 5);
			await history.goBack();
		} else {
			await Portal.remove(toast);
			await Toast.fail(response.message, 3);
		}
		console.log(response);
	};

	render() {
		const {params, Projects, history} = this.props;
		const {
			steps,
			image,
			video,
			title,
			excepted_result,
			actual_result
		} = this.state;
		const Project = Projects.list.find(
			item => item.cycle_id === Number(params.cycle_id)
		);
		if (!Project) return <Redirect to="/" />;
		return (
			<Provider>
				<Header
					style={{
						padding: 10,
						backgroundColor: "#4b5b6a",
						marginBottom: 10
					}}
				>
					<Left>
						<ButtonBase transparent onPress={() => history.goBack()}>
							<Icon name="arrow-left" />
						</ButtonBase>
					</Left>
					<Body>
						<Text style={{color: "white", marginLeft: -10, fontSize: 18}}>
							Report Bug
						</Text>
					</Body>
				</Header>
        {!this.state.nextFormEnabled ? <View>
				<Text style={{color: "grey", fontSize: 12, margin: 15}}>
					Select attachment type
				</Text>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around"
					}}
				>
					<TouchableWithoutFeedback onPress={() => this.requestFile("image")}>
						<View
							style={{
								backgroundColor: "#f3f7fb",
								borderRadius: 5,
								padding: 10,
								width: "30%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Icon name="camera" />
							<Text>Picture</Text>
						</View>
					</TouchableWithoutFeedback>

					<TouchableWithoutFeedback onPress={() => this.requestFile("video")}>
						<View
							style={{
								backgroundColor: "#f3f7fb",
								borderRadius: 5,
								padding: 10,
								width: "30%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
						>
							<Icon name="video-camera" />
							<Text>Video</Text>
						</View>
					</TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.requestFile("file")}>
					<View
						style={{
							backgroundColor: "#f3f7fb",
							borderRadius: 5,
							padding: 10,
							width: "30%",
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Icon name="file" />
						<Text>File</Text>
					</View>
          </TouchableWithoutFeedback>

				</View>

        <View style={{backgroundColor: "#f3f7fb", color: "grey", marginTop: 10, borderRadius:5, height: Dimensions.get("screen").height - 300 ,padding: 8}}>
        {image.length || video.length ? null : <Text style={{color:"grey", marginLeft: "auto", marginRight:"auto", width: "80%", marginVertical: "50%"}}>Please make attention that your report should include screenshot/video/file</Text>  }
        <ScrollView>

                {image.length ? (
                  image.map((item, key) => (
                    <View style={{ flexDirection: 'row', alignItems:"center", justifyContent:"space-between" }} key={key}>
                    <View style={{flexDirection: 'row', alignItems:"center"}}>
                      <Image
                        source={{ uri: item.file.uri }}
                        onPress={() => alert(1)}
                        style={{ width: 70, height: 70, alignSelf: 'center', margin: 10, borderRadius: 10 }}
                      />
                      <Text >Image</Text>
                      <Text>{ FileSystem.getInfoAsync(item.file.uri, {size:true})._70}</Text>
                      </View>
                      <Icon name="delete" onPress={() => this.deleteItem('image', key)} />
                    </View>
                  ))
                ) : null}

                {video.length ? (
                  video.map((item, key) => (
                    <View style={{ flexDirection: 'row',alignItems: "center", justifyContent: 'space-between' }} key={key}>
                    <View style={{flexDirection: 'row', alignItems:"center"}}>
                      <Image
                        source={{uri: item.file.uri }}
                        style={{ width: 70, height: 70, alignSelf: 'center', margin: 10, borderRadius: 10 }}
                      />
                      <Text key={key} >Video</Text>
                      </View>
                      <Icon name="delete" style={{ marginLeft: 20 }} onPress={() => this.deleteItem('video', key)} />
                    </View>
                  ))
                ) : null}
                </ScrollView>
                <Button type="primary" onPress={ this.enableNextForm } children="Next Step" />

                </View>
          </View> : 				<ScrollView style={{flex: 1}}>
          					<FadeInView>
          						<Text children="Title" style={formStyle.title} />
          						<InputItem
          							type="text"
          							style={formStyle.input}
          							placeholder="Create title"
          							name="title"
          							value={title}
          							onChangeText={title => this.setState({...this.state.form, title})}
          						/>
          						<Text children="Steps for reproducing" style={formStyle.title} />
          						{steps.map((item, key) => (
          							<InputItem
          								key={key}
          								type="text"
          								style={formStyle.input}
          								placeholder={`Step ${key + 1}`}
          								name={`step ${key + 1}`}
          								value={steps[key]}
          								onChangeText={val => this.onChange(val, key)}
          								extra={
          									<Fragment style={{marginLeft: -1}}>
          										{key + 1 === steps.length &&
          											steps[key] !== null && steps[key] !== "" && (
          												<Icon
          													name="plus"
          													color={brandColor}
          													onPress={value => this.addStep(value)}
          												/>
          											)}
          										{key + 1 < steps.length && (
          											<Icon
          												name="minus"
          												color={brandColor}
          												onPress={() => this.removeStep(key)}
          											/>
          										)}
          									</Fragment>
          								}
          							>
          								<Text children={`${key + 1} . `} />
          							</InputItem>
          						))}
          						<Text children="Actual Result" style={formStyle.title} />
          						<InputItem
          							type="text"
          							style={formStyle.input}
          							placeholder="Write Actual Result"
          							name="actual_result"
          							value={actual_result}
          							onChangeText={actual_result =>
          								this.setState({...this.state.form, actual_result})
          							}
          						/>
          						<Text children="Excepted Result" style={formStyle.title} />
          						<InputItem
          							type="text"
          							style={formStyle.input}
          							placeholder="Write Excepted Result"
          							name="excepted_result"
          							value={excepted_result}
          							onChangeText={excepted_result =>
          								this.setState({...this.state, excepted_result})
          							}
          						/>

          						<Button type="primary" onPress={this.onSubmit} children="Submit" />
          						<WhiteSpace size="lg" />
          					</FadeInView>
          				</ScrollView>}

			</Provider>
		);
	}
}
const get = state => ({Projects: state.Projects});
export default connect(get)(ReportBug);
