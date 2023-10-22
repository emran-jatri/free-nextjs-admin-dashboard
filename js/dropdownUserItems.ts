import ContactsIcon from "@/components/Svgs/ContactsIcon";
import { ProfileIconTwo } from "@/components/Svgs/ProfileIcon";
import { SettingsIconTwo } from "@/components/Svgs/SettingsIcon";

export const dropdownUserItems = [
  {
    key: "ddui_1",
    title: "My Profile",
    leftIcon: ProfileIconTwo,
    path: "/profile",
  },
  {
    key: "ddui_2",
    title: "My Contacts",
    leftIcon: ContactsIcon,
    path: "/#",
  },
  {
    key: "ddui_2",
    title: "Account Settings",
    leftIcon: SettingsIconTwo,
    path: "/settings",
  },
];
