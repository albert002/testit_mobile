import React, {Component} from "react";
import {
	ScrollView,
	Text,
	Dimensions,
	Image,
	TouchableWithoutFeedback,
	View
} from "react-native";
import {List, WhiteSpace, Icon} from "@ant-design/react-native";
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

import {AllProjectsStyle} from "../style/index";

// redux
import Empty from "../components/empty";
// anim
import FadeInView from "../components/animated_view";
import {Loader} from "../components/loader";
const Item = List.Item;
// const Brief = Item.Brief;

class AllProjects extends Component {
	PriceRange = categories => {
		if (categories.length) {
			const balances = categories.map(item => item.balance);
			const max = Math.max(...balances);
			const min = Math.min(...balances);
			return {min, max};
		}
		return {min: 0, max: 0};
	};

	render() {
		const {projects, active, history} = this.props;
		console.log("///", projects);
		if (!projects) return <Loader />;
		projects.list.length ? projects.list.sort((a, b) => b.id - a.id) : null;
		return (
			<ScrollView style={{padding: 10, backgroundColor: "#fafafa"}}>
				<List style={{padding: 5, borderRadius: 2}}>
					{projects.list.length
						? projects.list.map((item, key) => {
								const price = this.PriceRange(item.test_settings.categories);
								const minPrice = price.min;
								const maxPrice = price.max;
								return (
									<FadeInView key={key}>
										<WhiteSpace size="xs" />
										{/*<Item
                      onPress={() => history.push(`/dashboard/projects/${item.cycle_id}`)}
                      thumb={item.image}
                      extra={<Text children={minPrice === maxPrice ? `${minPrice}$` : `${minPrice}$ / ${maxPrice}$`} />}
                      style={{
                        paddingVertical: 8,
                        width: Dimensions.get('screen').width - 45,
                        borderColor: 'transparent',
                        borderBottomColor:
                          active && active.find(it => Number(it.cycle_id) === item.cycle_id && it.app_id === item.app_id) ? 'teal' : null,
                        borderWidth: 4,
                      }}
                    >
                      <Text children={item.app_name} />
                      <Brief children={`${item.test_settings.title} - ${item.test_settings.current_version}`} />
                    </Item>*/}
										<Content key={ key }>
											<TouchableWithoutFeedback
												onPress={() =>
													history.push(`/dashboard/projects/${item.cycle_id}`)
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
														source={{uri: item.image}}
														style={{height: 50, width: 50}}
													/>
													<View style={AllProjectsStyle.appInfo}>
														<View style={{display: "flex", flexDirection: "row"}}>
														{item.platform.id === 1 ? <Icon name="global" /> : item.platform.id === 2 ? <Icon name="appstore" /> : null}
														<Text style={AllProjectsStyle.appName}>
															{item.app_name}
														</Text>
														</View>
														<Text
															style={AllProjectsStyle.appSubTitle}
														>{`${item.test_settings.categories.length} categories`}</Text>
													</View>
													<View>
														<Text
															children={
																minPrice === maxPrice
																	? `$${minPrice}`
																	: `$${minPrice} / ${maxPrice}`
															}
															style={AllProjectsStyle.price}
														/>
													</View>
												</View>
											</TouchableWithoutFeedback>
										</Content>

										<WhiteSpace size="xs" />
									</FadeInView>
								);
						  })
						: Empty}
				</List>
			</ScrollView>
		);
	}
}
export default AllProjects;
