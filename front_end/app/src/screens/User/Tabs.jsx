import { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./Home.screen";
import BookingsScreen from './Bookings.screen'
import FavoritesScreen from "./Favorites.screen";

import Bookings from '../../../assets/icons/Bookings.svg'
import Home from '../../../assets/icons/Home.svg'
import Heart from '../../../assets/icons/Heart.svg'
import Chat from '../../../assets/icons/Chat.svg'
import Profile from '../../../assets/icons/Profile.svg'


import { colors, global, spacing } from "../../constants/constants";
import { T } from "../../atoms/Atoms";

import TabBarIcon from "../../components/Global/TabBarIcon";
import ProfileScreen from "./Profile.screen";
import ChatScreen from "./Chat.screen";

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let name;
                    let icon
                    if (route.name === 'Home') {
                        name = 'Trang chủ'
                        icon = <Home width={23} height={23} fill={focused ? colors.primary : "#6A6A6A"} />
                    } else if (route.name === 'Bookings') {
                        name = 'Đơn đặt'
                        icon = <Bookings width={23} height={23} fill={focused ? colors.primary : "#6A6A6A"} />
                    } else if (route.name === 'Favorites') {
                        name = 'Yêu thích'
                        icon = <Heart width={23} height={23} fill={focused ? colors.primary : "#6A6A6A"} />
                    } else if (route.name === 'Chat') {
                        name = 'Trao đổi'
                        icon = <Chat width={26} height={26} fill={focused ? colors.primary : "#6A6A6A"} />
                    } else if (route.name === 'Profile') {
                        name = 'Hồ sơ'
                        icon = <Profile width={23} height={23} fill={focused ? colors.primary : "#6A6A6A"} />
                    }

                    return <TabBarIcon name={name} icon={icon} focused={focused} />;
                },
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 70,
                    borderTopWidth: 0,
                    borderTopLeftRadius: spacing.brS + 10,
                    borderTopRightRadius: spacing.brS + 10,
                    backgroundColor: 'white',
                    ...global.shadow,
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 0,
                }
            })}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: '',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Bookings"
                component={BookingsScreen}
                options={{
                    title: '',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    title: '',
                    headerShown: false,
                }}
            />
            {/* <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    title: 'Chat',
                    headerStyle: {backgroundColor: "#ff4f6d"},
                    headerTitleStyle: {color: "white"},
                    headerTintColor: "white",
                    headerShown: false,
                }}
            /> */}
            {/* <Tab.Screen
                name="Profile"
                component={HomeScreen}
                options={{
                    title: '',
                    headerShown: false,
                }}
            /> */}
        </Tab.Navigator>
    );
}

export default memo(Tabs);
