import { StyleSheet } from 'react-native';
import React from 'react';

export const brandColor = '#2E546B';
export const white = '#9E9E9E';

export const formStyle = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: 25,
    margin: 20,
    width: '100%'
  },
  inputWrapper: {
    borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 10,
  },

  filedText: {
    color: "#78849B",
    fontSize: 15
  },
  // input: {
  //   paddingTop: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 15,
  //   backgroundColor: "white",
  //   width: "100%",
  //   fontSize: 14,
  // },
  button: {
    margin: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#316BD2',
    borderStyle: 'solid',
    backgroundColor: '#316BD2',
    paddingTop: 12,
    paddingBottom: 12,
   },
   submitButton: {
    color: 'white',
  },
  link: {
    fontWeight: '700',
    margin: 15,
  },
  itemStyle: {
    width: "100%",
    position: "relative",
    left: -15
  },
  error: {
    margin: 5,
    color: 'red',
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 26,
    margin: 20,
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: "grey",
    paddingLeft: 10,
    marginBottom: 5,
    paddingTop: 5
  },
  addInfo: {
    backgroundColor: "#f2f2f2",
    height: "100%",

  },
  confirm: {
    position: "relative",
    width: "90%",
    top: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#4b5b6a",
  }
});

export const registerForm = StyleSheet.create({
  inputContainer: {
    // borderWidth: 1,
    // borderStyle: 'solid',
    width: '100%',
    // borderColor: 'grey',
    // borderRadius: 5,
    marginBottom: 15,
    // marginBottom: 23
  },
})

export const loginForm = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    width: '100%'
  },
  inputContainer: {
    // borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 20,
    // marginBottom: 23
  },
  signupText: {
    color: "#8587A6"
  },
  blueText: {
    color: "#0488FB",
    marginLeft: 10
  },
  socialSignupText: {
    color: "#8587A6",
    marginTop: 40,
    textAlign: "center"
  },
  link: {
    color: "#8587A6",
    textAlign: "right",
    marginTop: 12,
    marginLeft: "65%",
    marginBottom: 23
  },
  signUpView: {
    display: "flex",
    flexDirection: 'row',
    marginTop: 20
  }
})

export const recoveryForm = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    width: '100%'
  },
  goBack: {
    position: 'absolute',
    left: 20,
    top: 40,
    display: 'flex',
    flexDirection: 'row',
  },
  link: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10
  },
  backIcon: {
    marginTop: 10,
    marginLeft: 10,
  },
  recoveryText: {
    fontSize: 15,
    marginBottom: 50,
  },
  forgotText: {
    marginBottom: 30,
    marginTop: 27,
    fontSize: 22,
    // fontFamily: "Montserrat"
  },
  inputContainer: {
    // borderWidth: 1,
    // borderStyle: 'solid',
    width: '100%',
    // borderColor: 'grey',
    // borderRadius: 5,
    // marginTop: 60,
    // marginBottom: 23
  },
  input: {
    paddingLeft: 15,
    paddingTop: 1,
    paddingRight: 15,
  }
})

export const styles = StyleSheet.create({
  container: {
    // paddingVertical: 40,
    // paddingHorizontal: 10,
    flex: 1,
    width: "auto",
    // justifyContent: 'center',
  },
  sidebar: {},
  text: {
    flex: 1,
    marginVertical: 'auto',
    fontSize: 16,
    alignContent: 'center',
    padding: 5,
    textAlign: "left",
    marginLeft: 15,
    color: "black",
  },
  icon: { fontSize: 20, backgroundColor: "black" },
  item: {
    padding: 0,

  },
  userData: {
    backgroundColor: "#4b5b6a",
    paddingVertical: 40,
    paddingHorizontal: 10
  },
  username: {
     textAlign: 'center',
     margin: 15,
     fontSize: 16,
     color: "white",
  },
  dash: {
    height: 1,
    width: 30,
    backgroundColor: "#fff",
    marginLeft: "auto",
    marginRight: "auto"
  },
  balanceText: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5
  },
  balance: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
    marginTop: 7
  }
});

export const accordion = StyleSheet.create({
  heading: { margin: 10 },
  panel: { backgroundColor: 'white' },
});

export const SingleProjectStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    paddingVertical: 8
  },
  containerHorizontal: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginRight: 10
  },
  text: {
    color: '#fff',
    fontSize: 36,
  },
  textContent: {
    marginLeft: 15,
    marginTop: 10
  },
  title: {
    color: "grey",
    fontWeight: "bold",
    marginLeft: "5%"
  },
  downloadApp: {
    backgroundColor: "#00c1ac",
    borderColor: "#00c1ac",
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 8,
    paddingTop: 0,
    paddingBottom: 0
  }
});

export const AllProjectsStyle = StyleSheet.create({
  appName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8
  },
  appSubTitle: {
    color: "#d8d8d8",
    // position: "relative",
    // top: 10,
    // marginLeft: -70
  },
  appInfo: {
    position: "absolute",
    left: 70,
    padding: 5
  },
  price: {
    color:"#86c370"
  }
})

export const userInfo = StyleSheet.create({
  userData: {
    display: "flex",
    flexDirection: 'row',
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    width: "90%"
  },
  container: {
    position: "relative",
    top: -15,
    backgroundColor: "#4b5b6a",
    height: "100%"
  },
  username: {
    fontWeight: "bold"
  },
  totalBugs: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 15,
  },
  divider: {
    borderRightWidth: 1,
  },
  bugItem: {
    padding: 15
  },
  xp: {
    padding: 5,
    backgroundColor: "#00c4ae",
    borderRadius: 10,
  }
})

export const myReports = StyleSheet.create({
  tabs: {
    backgroundColor: "white",
    color: 'black'
  },
  cardData: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    paddingBottom: 15
  },
  title: {
    color: "grey",
    fontSize: 16
  },
  app_name: {
    color: "grey",
    marginLeft: 10
  }
})
