import CalenderIcon from "@/components/Svgs/CalenderIcon";
import DashboardIcon from "@/components/Svgs/DashboardIcon";
import DownArrowIcon from "@/components/Svgs/DownArrowIcon";
import FormIcon from "@/components/Svgs/FormIcon";
import ProfileIcon from "@/components/Svgs/ProfileIcon";
import SettingsIcon from "@/components/Svgs/SettingsIcon";
import TableIcon from "@/components/Svgs/TableIcon";

export const sidebarData = [
  {
    key: "sbi_1", // sbi = sidebar item
    title: "MENU",
    levelOneItems: [
      {
        key: "loi_101", // loi = levelone item
        title: "Dashboard",
        leftIcon: DashboardIcon,
        rightIcon: DownArrowIcon,
        path: "/",
        levelTwoItems: [
          {
            key: "loi_10101",
            title: "eCommerce",
            path: "/",
          },
        ],
      },
      {
        key: "loi_102",
        title: "Calendar",
        leftIcon: CalenderIcon,
        rightIcon: null,
        path: "/calendar",
      },
      {
        key: "loi_103",
        title: "Profile",
        leftIcon: ProfileIcon,
        rightIcon: "rightIcon",
        path: "/profile",
      },
      {
        key: "loi_104",
        title: "Forms",
        leftIcon: FormIcon,
        rightIcon: DownArrowIcon,
        path: "forms",
        levelTwoItems: [
          {
            key: "loi_10401",
            title: "Form Elements",
            path: "/forms/form-elements",
          },
          {
            key: "loi_10402",
            title: "Form Layouts",
            path: "/forms/form-layout",
          },
        ],
      },
      {
        key: "loi_105",
        title: "Tables",
        leftIcon: TableIcon,
        rightIcon: null,
        path: "/tables",
      },
      {
        key: "loi_106",
        title: "Settings",
        leftIcon: SettingsIcon,
        rightIcon: null,
        path: "/settings",
      },
    ],
  },
  // {
  //   key: "sbi_2",
  //   title: "OTHERS",
  //   levelOneItems: [
  //     {
  //       key: "loi_201",
  //       title: "Chart",
  //       leftIcon: "leftIcon",
  //       rightIcon: "rightIcon",
  //       path: "/chart",
  //     },
  //     {
  //       key: "loi_202",
  //       title: "UI Elements",
  //       leftIcon: "leftIcon",
  //       rightIcon: "rightIcon",
  //       path: null,
  //       levelTwoItems: [
  //         {
  //           key: "loi_20201",
  //           title: "Alert",
  //           path: "/ui/alerts",
  //         },
  //         {
  //           key: "loi_20202",
  //           title: "Buttons",
  //           path: "/ui/buttons",
  //         },
  //       ],
  //     },
  //     {
  //       key: "loi_203",
  //       title: "Authentication",
  //       leftIcon: "leftIcon",
  //       rightIcon: "rightIcon",
  //       path: null,
  //       levelTwoItems: [
  //         {
  //           key: "loi_20301",
  //           title: "Sign In",
  //           path: "/auth/signin",
  //         },
  //         {
  //           key: "loi_20302",
  //           title: "Sign Up",
  //           path: "/auth/signup",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
