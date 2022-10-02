import React from 'react'
import SpeedIcon from '@material-ui/icons/Speed';
import OpacityIcon from '@material-ui/icons/Opacity';
import CreateIcon from '@material-ui/icons/Create';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import MessageIcon from '@material-ui/icons/Message';
import ShoppingBagIcon from '@material-ui/icons/LocalMall';

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <SpeedIcon className="c-sidebar-nav-icon"/>,

    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Recipes & Healthy Tips']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Add Recipes',
    to: '/admin/write',
    icon: <CreateIcon className="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Recipes',
    to: '/admin/allRecipes',
    icon:  <OpacityIcon className="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['About']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'About Page',
    to: '/admin/about',
    icon: <CreateIcon className="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Items']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Item Details',
    to: '/admin/item',
    icon: <ShoppingBagIcon className="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Add Item',
    to: '/admin/addItem',
    icon: <CreateIcon className="c-sidebar-nav-icon"/>,
  },




  {
    _tag: 'CSidebarNavTitle',
    _children: ['Purchase']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Purchase Details',
    to: '/admin/purchase',
    icon:<ShoppingBasketIcon className="c-sidebar-nav-icon"/>,
  },


  {
    _tag: 'CSidebarNavTitle',
    _children: ['Messages']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Message',
    to: '/admin/message',
    icon:<MessageIcon className="c-sidebar-nav-icon"/>,
  },
]

export default _nav
