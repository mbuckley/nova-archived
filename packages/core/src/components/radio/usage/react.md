```tsx
import React from 'react';

import { ClioRadio } from '@clio/nova-core-react';

export const RadioInputExample: React.FC = () => (
  <ClioRadio name="group1" value="111" ariaDescribedby="something">Option 1</ClioRadio>
  <ClioRadio name="group1" value="222">Option 2</ClioRadio>
  <ClioRadio name="group1" disabled="true" value="333">Option 3</ClioRadio>
);

```
