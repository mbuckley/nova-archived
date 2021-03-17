import {
  ClioButton,
  ClioComboButton,
  ClioLabel,
  ClioLoader,
  ClioMenu,
  ClioMenuItem,
  ClioPill,
} from '@clio/nova-core-react';

import React, { useState } from "react";

const menuItemData = [
  {
    id: 1,
    label: "Menu Item 1",
    onClick: () => { alert('menu item 1 clicked'); }
  },
  {
    id: 2,
    label: "Menu Item 2",
    onClick: () => { alert('menu item 2 clicked'); }
  }
];

const menuItems = menuItemData.map((menuItem) =>
  <ClioMenuItem key={menuItem.id} onClick={menuItem.onClick}>{menuItem.label}</ClioMenuItem>
);

const handlePrimaryActionClick = () => {
  alert("primary action clicked");
}

const loaderRow = {
  width: "55px",
  margin: "20px auto",
}

const loaderRowBlue = {
  background: "#0070E0",
}

const Home = () => {
  const [loaderActive, setLoaderActive] = useState(true);

  return (
    <>
      <h1>Home - Kitchen Sink</h1>
      <ClioButton buttonStyle="primary">React Button!</ClioButton>

      <ClioComboButton primaryActionLabel="Default combo button" primaryActionClick={handlePrimaryActionClick}>
        <ClioMenu slot="parent-slot">{menuItems}</ClioMenu>
      </ClioComboButton>

      <ClioPill color="orange">Orange Pill</ClioPill>
      <ClioPill color="red">Red Pill</ClioPill>

      <ClioLabel labelType="required"></ClioLabel>

      <div style={loaderRow}>
        <ClioButton buttonStyle="primary" onClick={() => setLoaderActive(!loaderActive)}>Toggle Loader</ClioButton>

        {loaderActive &&
          <>
          <div>
            <ClioLoader />
            <ClioLoader size="small"/>
          </div>
          <div style={loaderRowBlue}>
            <ClioLoader loaderStyle="reversed"/>
            <ClioLoader size="small" loaderStyle="reversed"/>
          </div>
          </>
        }
      </div>
    </>
  );
}
export default Home;
