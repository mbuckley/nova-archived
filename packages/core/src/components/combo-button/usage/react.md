```tsx
import React from 'react';

import { ClioComboButton } from '@clio/nova-core-react';

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

export const ComboButtonExample: React.FC = () => (
  <ClioComboButton primaryActionLabel="Default combo button" primaryActionClick={handlePrimaryActionClick}>
    <ClioMenu slot="parent-slot">{menuItems}</ClioMenu>
  </ClioComboButton>
);

```
