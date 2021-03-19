import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user)
  
  if (user.userData && !user.userData.isAuth) {
    return (
      <></>
    )
  } else if(user.userData && user.userData.role == 1){
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="home-admin">
          <a href="/">Home-Admin</a>
        </Menu.Item>
        <Menu.Item key="add-product">
          <a href="/product/add">Produkt-Hinzufügen</a>
        </Menu.Item>
      </Menu>
    )
  }else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a href="/">Home</a>
        </Menu.Item>
      </Menu>
    )
  }
}

// if(!user.is){
//   return (
//     <Menu mode={props.mode}>
//     {/* <SubMenu title={<span>Blogs</span>}>
//       <MenuItemGroup title="Item 1">
//         <Menu.Item key="setting:1">Option 1</Menu.Item>
//         <Menu.Item key="setting:2">Option 2</Menu.Item>
//       </MenuItemGroup>
//       <MenuItemGroup title="Item 2">
//         <Menu.Item key="setting:3">Option 3</Menu.Item>
//         <Menu.Item key="setting:4">Option 4</Menu.Item>
//       </MenuItemGroup>
//     </SubMenu> */}
//   </Menu>
//   )
// }else{
//   return (
//     <Menu mode={props.mode}>
//     <Menu.Item key="mail">
//       <a href="/">Home</a>
//     </Menu.Item>
//     {/* <SubMenu title={<span>Blogs</span>}>
//       <MenuItemGroup title="Item 1">
//         <Menu.Item key="setting:1">Option 1</Menu.Item>
//         <Menu.Item key="setting:2">Option 2</Menu.Item>
//       </MenuItemGroup>
//       <MenuItemGroup title="Item 2">
//         <Menu.Item key="setting:3">Option 3</Menu.Item>
//         <Menu.Item key="setting:4">Option 4</Menu.Item>
//       </MenuItemGroup>
//     </SubMenu> */}
//   </Menu>
//   )
// }

export default LeftMenu