import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../HomePage/Home";
import Login from "../Login/Login";
import Register from "../Login/Register";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, } from "react-native";
import Search from "../HomePage/Search";
import ResendEmail from "../Login/ResendEmail";
import ResetPassword from "../Login/ResetPassword";
import Film from "../Film/Film";
import Popular from "../TvShow/Popular";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// function CustomDrawerItem({ label, icon, color, size }) {
//   return (
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//       {icon && <FontAwesome name={icon} size={size} color={color} />}
//       <Text style={{ marginLeft: 10, color }}>{label}</Text>
//     </View>
//   );
// }

// function Root() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         labelStyle: {
//           marginLeft: -10,
//         },
//       }}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={Home}
//         options={{
//           unmountOnBlur: true,
//           drawerIcon: ({ color, size }) => (
//             <CustomDrawerItem label="Home" icon="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Tv Show"
//         component={Popular}
//         options={{
//           unmountOnBlur: true,
//           drawerIcon: ({ color, size }) => (
//             <CustomDrawerItem label="Tv Show" icon="tv" color={color} size={size} />
//           ),
//         }}
//       />
//       {/* ... (tương tự cho các mục khác) */}
//       <Drawer.Screen
//         name="Login"
//         component={Login}
//         options={{
//           unmountOnBlur: true,
//           drawerIcon: ({ color, size }) => (
//             <CustomDrawerItem label="Login" icon="user" color={color} size={size} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Register"
//         component={Register}
//         options={{
//           unmountOnBlur: true,
//           drawerIcon: ({ color, size }) => (
           
//             <CustomDrawerItem label="Register" icon="user-plus" color={color} size={size} />
//           ), // <FontAwesome name="user-plus" size={size} color={color} />
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }

function Root() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        labelStyle: {
          marginLeft: -10, // Điều chỉnh giá trị này để canh chỉnh khoảng cách giữa Icon và chữ
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Tv Show"
        component={Popular}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="tv" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="user-plus" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details_film"
          component={Film}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResendEmail"
          component={ResendEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
