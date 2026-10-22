// import { registerLicense } from '@syncfusion/ej2-base';
// registerLicense('YOUR_SYNCFUSION_LICENSE_KEY');

import { Tab } from '@syncfusion/ej2-navigations';
import { renderPerformance } from './schedule-samples/performance/performance';
import './styles/Performance.css';
import './app.css';

const tab: Tab = new Tab({
  // Tab switching animation disabled, same as the React sample.
  animation: {
    previous: { effect: 'None', duration: 0, easing: '' },
    next: { effect: 'None', duration: 0, easing: '' },
  },
  items: [{ header: { text: 'Performance' }, content: '#performance-tab' }],
});
tab.appendTo('#tabContent');

// Render the sample once the tab has placed its host element in the DOM.
renderPerformance(document.getElementById('performance-tab') as HTMLElement);
