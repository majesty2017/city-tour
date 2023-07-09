// super admin menu
export const superadminMenu = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'Bar-Chart'
  },
  {
    name: 'Human Resource',
    path: '/human-resource',
    icon: 'Management',
    dataItem: 'human-resource',
    submenu: [
      {
        name: "Users",
        path: "/users",
        icon: "nav-icon ",
      },
      {
        name: "Groups",
        path: "/groups",
        icon: "nav-icon ",
      },
    ]
  },
  {
    name: "Visitors",
    path: "/visitors",
    icon: "Address-Book",
  },
  {
    name: "Services",
    path: "/services",
    icon: "Share-Window",
    dataItem: 'services',
    submenu: [
      {
        name: "Categories",
        path: "/categories",
        icon: "far fa-circle nav-icon",
      },
      {
        name: "Products",
        path: "/products",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    name: "Tickets",
    path: "/tickets",
    icon: "Ticket",
  },
  {
    name: "Invoice",
    path: "/invoices",
    icon: "Receipt",
  },
  {
    name: "Accounts",
    path: "/accounts",
    icon: "Folder-With-Document",
    dataItem: 'accounts',
    submenu: [
      {
        name: "Expenses",
        path: "/expenses",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    name: " Reports",
    path: "/reports",
    icon: "File-Clipboard-File--Text",
    dataItem: 'reports',
    submenu: [
      {
        name: "Sales Report",
        path: "/sales-report",
        icon: "far fa-circle nav-icon",
      },
      {
        name: "Expenses Report",
        path: "/expenses-report",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    name: " Settings",
    path: "/settings",
    icon: "Gear",
    dataItem: 'settings',
    submenu: [
      {
        name: "Roles / Permissions",
        path: "/roles-permissions",
        icon: "nav-icon ",
      },
      {
        name: "Generals",
        path: "/general-settings",
        icon: "far fa-circle nav-icon",
      },
      {
        name: "Coupons",
        path: "/coupons",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
];

export const adminMenu = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'Bar-Chart'
  },
  {
    name: 'Human Resource',
    path: '/human-resource',
    icon: 'Management',
    dataItem: 'human-resource',
    submenu: [
      {
        name: "Roles / Permissions",
        path: "/roles-permissions",
        icon: "nav-icon ",
      },
      {
        name: "Users",
        path: "/users",
        icon: "nav-icon ",
      },
    ]
  },
  {
    name: "Visitors",
    path: "/visitors",
    icon: "Address-Book",
  },
  {
    name: "Services",
    path: "/services",
    icon: "Share-Window",
    dataItem: 'services',
    submenu: [
      {
        name: "Categories",
        path: "/categories",
        icon: "far fa-circle nav-icon",
      },
      {
        name: "Products",
        path: "/products",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    name: "Tickets",
    path: "/tickets",
    icon: "Ticket",
  },
  {
    name: "Invoice",
    path: "/invoices",
    icon: "Receipt",
  },
  {
    name: "Accounts",
    path: "/accounts",
    icon: "Folder-With-Document",
    dataItem: 'accounts',
    submenu: [
      {
        name: "Expenses",
        path: "/expenses",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    name: " Reports",
    path: "/reports",
    icon: "File-Clipboard-File--Text",
    dataItem: 'reports',
    submenu: [
      {
        name: "Sales Report",
        path: "/sales-report",
        icon: "far fa-circle nav-icon",
      },
      {
        name: "Expenses Report",
        path: "/expenses-report",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
  {
    name: " Settings",
    path: "/settings",
    icon: "Gear",
    dataItem: 'settings',
    submenu: [
      {
        name: "Coupons",
        path: "/coupons",
        icon: "far fa-circle nav-icon",
      },
    ],
  },
]

export const userMenu = [
  {
    name: 'My Records',
    path: '/',
    icon: 'Bar-Chart'
  },
  {
    name: "My Visitors",
    path: "/visitors",
    icon: "Address-Book",
  },
  {
    name: "Invoice",
    path: "/invoices",
    icon: "Receipt",
  },
]
