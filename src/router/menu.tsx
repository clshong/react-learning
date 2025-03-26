import { SolutionOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];
export const items: MenuItem[] = [
  {
    label: "系统首页",
    icon: <SolutionOutlined />,
    key: "/home", // 需要跳转的链接其实就是唯一表示
  },
  {
    label: "轮播图管理",
    icon: <SolutionOutlined />,
    key: "/banner",
    children: [
      {
        label: "首页轮播图",
        icon: <SolutionOutlined />,
        key: "/banner/home",
      },
      {
        label: "活动页轮播图",
        icon: <SolutionOutlined />,
        key: "/banner/active",
      },
    ],
  },
  {
    label: "产品管理",
    icon: <SolutionOutlined />,
    key: "/pro",
    children: [
      {
        label: "产品列表",
        icon: <SolutionOutlined />,
        key: "/pro/list",
        children: [
          {
            label: "首页产品列表",
            icon: <SolutionOutlined />,
            key: "/pro/list/home",
          },
          {
            label: "详情推荐列表",
            icon: <SolutionOutlined />,
            key: "/pro/list/detail",
          },
        ],
      },
      {
        label: "筛选列表",
        icon: <SolutionOutlined />,
        key: "/pro/search",
      },
    ],
  },
  {
    label: "账户管理",
    icon: <SolutionOutlined />,
    key: "/account",
    children: [
      {
        label: "用户列表",
        icon: <SolutionOutlined />,
        key: "/account/userlist",
      },
      {
        label: "管理员列表",
        icon: <SolutionOutlined />,
        key: "/account/adminlist",
      },
    ],
  },
  {
    label: "设置",
    icon: <SolutionOutlined />,
    key: "/setting",
  },
];
