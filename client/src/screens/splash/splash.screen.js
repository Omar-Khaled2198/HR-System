import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { Container, Content } from "native-base";

import { SetAccountGlobal } from "../../utils/global.util";
import StorageManger from "../../utils/storage_manager.utils";

class SplashScreen extends Component {
  static navigationOptions = { header: null };

  async componentDidMount() {
    const account = await StorageManger.Fetch("account");
    if (account != null && account.token) {
      SetAccountGlobal(account);
      setTimeout(() => {
        this.props.navigation.navigate("Home");
      }, 1000);
    } else {
      setTimeout(() => {
        this.props.navigation.navigate("Auth");
      }, 1000);
    }
  }

  render() {
    return (
      <Container>
        <Content
          contentContainerStyle={{ justifyContent: "center", flex: 0.9 }}
        >
          <Image
            style={styles.logo}
            source={require("../../assets/icons/linkage_icon_rounded.png")}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});

export default SplashScreen;
