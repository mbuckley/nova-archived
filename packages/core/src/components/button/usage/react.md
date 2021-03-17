```tsx
import React from 'react';

import { ClioButton } from '@clio/nova-core-react';

export const ButtonExample: React.FC = () => (
  <ClioButton>Default</ClioButton>
  <ClioButton buttonStyle="primary">Primary</ClioButton>
  <ClioButton buttonStyle="secondary">Secondary</ClioButton>
  <ClioButton buttonStyle="danger">Danger</ClioButton>
  <ClioButton disabled="true">Disabled</ClioButton>
  <ClioButton href="http://google.com" target="_blank" rel="noopener">Linked Button</ClioButton>
  <ClioButton loading="true">Loading</ClioButton>
  <ClioButton size="small">Default - Small</ClioButton>
  <ClioButton type="submit">Submit</ClioButton>
  <ClioButton type="reset">Reset</ClioButton>
);

```
