import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResetPassword() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "#04072A",
          "#06132C",
          "#0A2456",
          "#020711",
          "#07307F",
          "#0E182C",
          "#051637",
          "#030424",
        ]}
        locations={[0, 0.01, 0.1, 0.3, 0.4, 0.5, 0.6, 0.72, 0.8, 1]}
        start={{ x: 0, y: 0 }} // Điểm bắt đầu, ở đây là góc trên bên trái
        end={{ x: 1, y: 0 }} // Điểm kết thúc, ở đây là góc trên bên phải
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
            >
              <FontAwesome name="arrow-left" size={30} color={"white"} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity>
                <FontAwesome
                  onPress={() => navigation.navigate("Login")}
                  name="user"
                  size={30}
                  color={"white"}
                  style={{ marginRight: 18 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="search" size={30} color={"#87cefa"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView>
        <View style={{ margin: 10 }}>
          <h2>Reset password</h2>
          <Text style={{ fontWeight: "bold" }}>
            Enter the email you used to sign up for a TMDB account and we'll
            send you the steps required to reset your password.
          </Text>

          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Email</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "gray",
                  paddingLeft: 12,
                }}
                placeholder="What's your email?"
                placeholderTextColor={"gray"}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1A92EE",
                    borderRadius: 10,
                    width: 100,
                    height: 50,
                    marginRight: 25,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: "#1A92EE", fontWeight: "bold" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <ImageBackground
            source={require("../assets/image/Background/bg_footer.jpg")}
            style={{ width: "100%", height: 400, marginTop: 10 }}
            resizeMode="cover"
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "white",
                margin: 10,
              }}
            >
              Join Today
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                margin: 10,
              }}
            >
              Get access to maintain your own custom personal lists, track what
              you've seen and search and filter for what to watch
              next-regardless if it's in theatres, on TV or available on popular
              streaming services like .
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <LinearGradient
                colors={["#FF00A8", "#E22B99", "#C616E3"]}
                locations={[0, 0.1, 0.7, 0.85, 1]}
                start={{ x: 0, y: 0 }} // Điểm bắt đầu, ở đây là góc trên bên trái
                end={{ x: 1, y: 0 }} // Điểm kết thúc, ở đây là góc trên bên phải
                style={{
                  width: 97,
                  height: 42,
                  borderRadius: 10,
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Sign up
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "white",
                margin: 10,
              }}
            >
              . Enjoy TMDB ad free {"\n"}· Maintain a personal watchlist{"\n"}·
              Filter by your subscribed streaming services and find something to
              watch{"\n"}· Log the movies and TV shows you've seen{"\n"}· Build
              custom lists{"\n"}· Contribute to and improve our database{"\n"}
            </Text>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    top: 0,
    position: "sticky",
    zIndex: 1,
    padding: 10,
  },
});
