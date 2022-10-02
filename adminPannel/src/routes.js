
import React from 'react';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));
const Write = React.lazy(() => import('./views/write/Write'));
const About = React.lazy(()=> import('./views/about/about'))
const Item = React.lazy(()=> import('./views/item/item'))
const AddItem = React.lazy(()=> import('./views/item/additem/addItem'))
const Purchase = React.lazy(()=> import('./views/purchase/purchase'))
const Message = React.lazy(()=> import('./views/message/message'))
const Invoice = React.lazy(()=> import('./views/invoice/invoice'))
const Blog = React.lazy(()=> import('./views/blog/blog'))
const Singlepost = React.lazy(()=> import('./views/blog/components/singlePost/SinglePost'))

const routes = [
  { path: '/admin', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin/users', exact: true,  name: 'Users', component: Users },
  { path: '/admin/write', exact: true,  name: 'Write', component: Write },
  { path: '/admin/about', exact: true,  name: 'About', component: About },
  { path: '/admin/item', exact: true,  name: 'Item Details', component: Item },
  { path: '/admin/addItem', exact: true,  name: 'Add Items', component: AddItem },
  { path: '/admin/purchase', exact: true,  name: 'Purchase Details', component: Purchase },
  { path: '/admin/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/admin/message', exact: true, name: 'Mssage', component: Message },
  { path: '/admin/invoice', exact: true, name: 'Invoice', component: Invoice },
  { path: '/admin/allRecipes', exact: true, name: 'allRecipes', component: Blog },
  { path: '/admin/singlePost/:id', exact: true, name: 'singlePost', component: Singlepost },



];

export default routes;
