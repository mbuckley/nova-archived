// import main here to we can test static html styling scenarios
import './main.scss';

// import the web components from core
import { applyPolyfills, defineCustomElements } from '@clio/nova-core/loader';

applyPolyfills().then(() => {
  defineCustomElements(window);
});
