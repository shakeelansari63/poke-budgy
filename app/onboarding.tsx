import Onboarding from "react-native-onboarding-swiper";
import { useDispatch } from "react-redux";
import { setOnBoarded } from "../storage/slices/settings-slice";
import { Image } from "expo-image";

function PokeBudgyOnboarding() {
  // Dispatcher for setting onboarding complete at end
  const dispatch = useDispatch();

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#fff",
          title: "Welcome to Pokè Budgy",
          subtitle: "Your personal Budget Planner",
          image: (
            <Image
              source={require("../assets/images/onb/01.png")}
              style={{ width: 200, height: 400 }}
            />
          ),
        },
        {
          backgroundColor: "#fff",
          title: "Setting",
          subtitle:
            "You can go to settings menu in top right to customize your experience",
          image: (
            <Image
              source={require("../assets/images/onb/02.png")}
              style={{ width: 200, height: 400 }}
            />
          ),
        },
        {
          backgroundColor: "#fff",
          title: "Settings",
          subtitle:
            "You have option to customize Currency, theme and more from Settings page",
          image: (
            <Image
              source={require("../assets/images/onb/03.png")}
              style={{ width: 200, height: 400 }}
            />
          ),
        },
      ]}
      onDone={() => {
        dispatch(setOnBoarded(true));
      }}
      onSkip={() => dispatch(setOnBoarded(true))}
    />
  );
}

export default PokeBudgyOnboarding;
