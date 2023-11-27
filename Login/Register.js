import { FontAwesome } from "@expo/vector-icons";
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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

export default function Register() {
  const navigation = useNavigation();
  const route = useRoute();
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
              onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
            >
              <FontAwesome name="reorder" size={30} color={"white"} />
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
        <View style={{ padding: 10, height: 50, backgroundColor: "#1A92EE" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            Benefits of being a member
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="check" size={20} color={"black"} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Find something to watch on your subscribed streaming services
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="check" size={20} color={"black"} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Log the movies and TV shows you have watched
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="check" size={20} color={"black"} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Keep track of your favourite movies and TV shows and get
              recommendations from them
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="check" size={20} color={"black"} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Build and maintain a personal watchlist
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="check" size={20} color={"black"} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Build custom mixed lists (movies and TV)
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="check" size={20} color={"black"} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Take part in movie and TV discussions
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="check" size={20} color={"black"} />
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              Contribute to, and improve the information in our database
            </Text>
          </View>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            Sign up for an account
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            Signing up for an account is free and easy. Fill out the form below
            to get started. JavaScript is required to to continue.
          </Text>
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Username</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "gray",
                }}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>
                Password (4 characters minimum)
              </Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "gray",
                }}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Password Confirm</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "gray",
                }}
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold" }}>Email</Text>
              <TextInput
                style={{
                  width: "100%",
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "gray",
                }}
              />
            </View>

            <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
              By clicking the "Sign up" button below, I certify that I have read
              and agree to the TMDB terms of use and privacy policy.
            </Text>

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
                    Register
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
