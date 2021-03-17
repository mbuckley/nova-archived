```tsx
import React from 'react';

import { ClioInput } from '@clio/nova-core-react';

export const ButtonExample: React.FC = () => (
  <ClioInput name="test"></ClioInput>
  <ClioInput name="test" placeholder="Placeholder"></ClioInput>
  <ClioInput disabled="true"></ClioInput>
  <ClioInput disabled="true" placeholder="Placeholder"></ClioInput>
);

```
