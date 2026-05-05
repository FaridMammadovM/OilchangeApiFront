import {
  IconBuildingStore,
  IconCar,
  IconHome,
  IconLicense,
  IconUserCog,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  teams: [
    {
      name: 'Master Class',
      plan: '',
    },
  ],
  navGroups: [
    {
      title: '',
      items: [
        {
          title: 'Xidmətlər',
          url: '/services',
          icon: IconHome,
          menuType: 2
        },
        {
          title: 'Admin',
          url: '/admins',
          icon: IconUserCog,
          menuType: 2
        },
        {
          title: 'Müştərilər',
          url: '/customers',
          icon: IconUsersGroup,

        },
        {
          title: 'İşçilər',
          url: '/employee',
          icon: IconUsers,
          menuType: 2
        },
        {
          title: 'Təklif və şikayətlər',
          url: '/feedback',
          icon: IconLicense,
          menuType: 2
        },
        {
          title: 'Maşınlar',
          url: '/',
          icon: IconCar,
        },
        {
          title: 'Məhsullar',
          items: [
            {
              title: 'Yağ',
              url: '/oil',
              icon: IconBuildingStore,
            },
            {
              title: 'Antifriz',
              url: '/antifreeze',
              icon: IconBuildingStore,
            },
            {
              title: 'Maye',
              url: '/liquid',
              icon: IconBuildingStore,
            },
          ]
        },
        // {
        //   title: 'Users',
        //   url: '/users',
        //   icon: IconUsers,
        // },
      ],
    },
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Auth',
    //       icon: IconLockAccess,
    //       items: [
    //         {
    //           title: 'Sign In',
    //           url: '/sign-in',
    //         },
    //         {
    //           title: 'Sign Up',
    //           url: '/sign-up',
    //         },
    //         {
    //           title: 'Forgot Password',
    //           url: '/forgot-password',
    //         },
    //         {
    //           title: 'OTP',
    //           url: '/otp',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Errors',
    //       icon: IconBug,
    //       items: [
    //         {
    //           title: 'Unauthorized',
    //           url: '/401',
    //           icon: IconLock,
    //         },
    //         {
    //           title: 'Forbidden',
    //           url: '/403',
    //           icon: IconUserOff,
    //         },
    //         {
    //           title: 'Not Found',
    //           url: '/404',
    //           icon: IconError404,
    //         },
    //         {
    //           title: 'Internal Server Error',
    //           url: '/500',
    //           icon: IconServerOff,
    //         },
    //         {
    //           title: 'Maintenance Error',
    //           url: '/503',
    //           icon: IconBarrierBlock,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: 'Other',
    //   items: [
    //     {
    //       title: 'Settings',
    //       icon: IconSettings,
    //       items: [
    //         {
    //           title: 'Profile',
    //           url: '/settings',
    //           icon: IconUserCog,
    //         },
    //         {
    //           title: 'Account',
    //           url: '/settings/account',
    //           icon: IconTool,
    //         },
    //         {
    //           title: 'Appearance',
    //           url: '/settings/appearance',
    //           icon: IconPalette,
    //         },
    //         {
    //           title: 'Notifications',
    //           url: '/settings/notifications',
    //           icon: IconNotification,
    //         },
    //         {
    //           title: 'Display',
    //           url: '/settings/display',
    //           icon: IconBrowserCheck,
    //         },
    //       ],
    //     },
    //     // {
    //     //   title: 'Help Center',
    //     //   url: '/help-center',
    //     //   icon: IconHelp,
    //     // },
    //   ],
    // },
  ],
}
