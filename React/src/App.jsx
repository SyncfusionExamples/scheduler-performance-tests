import React, { useState } from 'react';
import { TabComponent, TabItemDirective, TabItemsDirective } from '@syncfusion/ej2-react-navigations';
import Performance from './schedule-samples/Performance/Performance';
import './App.css';

const EvaluationGuideSamples = () => {
  // Re-mount the Performance sample each time its tab is selected (same as the full evaluation guide).
  const [tabVersion, setTabVersion] = useState(1);

  const onSelected = () => setTabVersion((prev) => prev + 1);

  return (
    <div className="maindiv">
      <TabComponent id="tabContent" selected={onSelected}
        animation={{
          previous: { effect: 'None', duration: 0, easing: '' },
          next: { effect: 'None', duration: 0, easing: '' }
        }}>
        <TabItemsDirective>
          <TabItemDirective header={{ text: 'Performance' }} content={() => <Performance key={tabVersion} />} />
        </TabItemsDirective>
      </TabComponent>
    </div>
  );
};

export default EvaluationGuideSamples;
