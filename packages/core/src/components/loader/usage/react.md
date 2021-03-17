```tsx
import React from 'react';

import { ClioLoader } from '@clio/nova-core-react';

export const LoaderExample: React.FC = () => (
  <ClioLoader />
  <ClioLoader size="small" />
  <ClioLoader loaderStyle="reversed" />
  <ClioLoader size="small" loaderStyle="reversed" />
);

```
