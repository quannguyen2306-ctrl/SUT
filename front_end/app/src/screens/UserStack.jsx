import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memo } from "react";

const Stack = createNativeStackNavigator();

import Tabs from "./User/Tabs";
import CourtDetailScreen from "./User/CourtDetail.screen";
import PaymentScreen from "./User/Payment.screen";
import SearchScreen from "./User/Search.screen";
import CauLongScreen from "./User/CauLong.screen";
import SingleBookingScreen from "./User/SingleBooking.screen";
import BookingDetailScreen from "./User/BookingDetail.screen";
import CommentsScreen from "./User/Comments.screen";
import SingleChat from "./User/SingleChat.screen"

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cầu lông"
        component={CauLongScreen}
        options={({ route }) => ({
          title: "Cầu lông",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 17,
          },
        })}
      />

      <Stack.Screen
        name="CourtDetail"
        component={CourtDetailScreen}
        options={({ route }) => ({
          title: "",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 17,
          },
        })}
      />

      <Stack.Screen
        name="SingleBooking"
        component={SingleBookingScreen}
        options={({ route }) => ({
          title: "Đặt sân",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 17,
          },
        })}
      />

      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={({ route }) => ({
          headerTitle: "Thanh toán",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 17,
          },
        })}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={({ route }) => ({
          headerTitle: "Tìm kiếm",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 17,
          },
        })}
      />

      <Stack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={({ route }) => ({
          title: "",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 17,
          },
        })}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ route }) => ({
          title: "",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 17,
          },
        })}
      />

      <Stack.Screen
        name="SingleChat"
        component={SingleChat}
        options={({ route }) => ({
          title: route.params.courtName,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Inter-Bold",
            fontSize: 17,
          },
        })}
      />
    </Stack.Navigator>
  );
}
export default memo(UserStack);
