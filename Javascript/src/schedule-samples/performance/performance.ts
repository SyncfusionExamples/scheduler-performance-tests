import {
  Schedule,
  Day,
  Week,
  Month,
  Agenda,
  TimelineViews,
  TimelineMonth,
  TimelineYear,
} from '@syncfusion/ej2-schedule';
import type { ActionEventArgs, View } from '@syncfusion/ej2-schedule';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import type { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import {
  generateResourceData,
  generateDayEvents,
  generateDayResourceEvents,
  generateWeekEvents,
  generateWeekResourceEvents,
  generateMonthEvents,
  generateMonthResourceEvents,
  generateYearEvents,
  generateYearResourceEvents,
  generateAgendaEvents,
  generateAgendaResourceEvents,
} from './performance-datasource';
import './performance.css';

Schedule.Inject(Day, Week, Month, Agenda, TimelineViews, TimelineMonth, TimelineYear);

type CrudType = 'create' | 'update' | 'delete' | null;

const template = `
<div class="schedule-app-root">
  <!-- TOP BAR -->
  <div class="top-scheduler-toolbar">
    <div class="schedule-config-panel">
      <button id="perf-load-btn">Load Data</button>
      <button id="perf-reset-btn">Reset</button>
    </div>
  </div>

  <!-- MAIN LAYOUT -->
  <div class="schedule-main-layout">
    <!-- LEFT: SCHEDULER -->
    <div class="schedule-performance-container">
      <div id="perf-schedule"></div>
    </div>

    <!-- RIGHT: PANEL -->
    <div class="schedule-metrics-panel">
      <div class="schedule-panel-header">Scheduler Configuration</div>
      <div class="schedule-dropdown-panel-body">
        <div class="schedule-config-row">
          <label class="schedule-config-label">View</label>
          <input id="perf-view-ddl" />
        </div>
        <div class="schedule-config-row">
          <label class="schedule-config-label">Resource Mode</label>
          <input id="perf-resource-ddl" />
        </div>
      </div>

      <div class="schedule-panel-header">Performance Metrics</div>
      <div class="schedule-metric-panel-body" id="perf-metrics"></div>
    </div>
  </div>
</div>`;

export function renderPerformance(host: HTMLElement): void {
  host.innerHTML = template;
  const $ = (id: string): HTMLElement => host.querySelector('#' + id) as HTMLElement;

  // ── Timers ──
  let start: number | null = null;
  let crudStart: number | null = null;
  let crudType: CrudType = null;

  // ── UI state ──
  const state = {
    eventTime: '',
    createTime: '',
    updateTime: '',
    deleteTime: '',
    currentCount: 0,
    isLoaded: false,
    currentView: 'Day' as View,
    useResources: false,
  };

  const owners: Record<string, any>[] = generateResourceData(1, 300, 'Resource ');

  const viewOptions = [
    { text: 'Day', value: 'Day' },
    { text: 'Week', value: 'Week' },
    { text: 'Month', value: 'Month' },
    { text: 'Timeline Day', value: 'TimelineDay' },
    { text: 'Timeline Week', value: 'TimelineWeek' },
    { text: 'Timeline Month', value: 'TimelineMonth' },
    { text: 'Timeline Year', value: 'TimelineYear' },
    { text: 'Agenda', value: 'Agenda' },
  ];

  const resourceModeOptions = [
    { text: 'No Resources', value: 'none' },
    { text: 'Resources', value: 'with' },
  ];

  const getDataForView = (view: string, withResources: boolean = state.useResources): Record<string, any>[] => {
    switch (view) {
      case 'Day':
      case 'TimelineDay':
        return withResources ? generateDayResourceEvents() : generateDayEvents();
      case 'Week':
      case 'TimelineWeek':
        return withResources ? generateWeekResourceEvents() : generateWeekEvents();
      case 'Month':
      case 'TimelineMonth':
        return withResources ? generateMonthResourceEvents() : generateMonthEvents();
      case 'Year':
      case 'TimelineYear':
        return withResources ? generateYearResourceEvents() : generateYearEvents();
      case 'Agenda':
        return withResources ? generateAgendaResourceEvents() : generateAgendaEvents();
      default:
        return generateMonthEvents();
    }
  };

  // ── Metrics panel (equivalent of renderMetricCard in React) ──
  const metricsEl = $('perf-metrics');
  const metricCard = (label: string, value: string): string =>
    `<div class="schedule-metric-card"><span class="schedule-metric-label">${label}</span>` +
    `<div class="schedule-metric-value">${value}</div></div>`;

  const renderMetrics = (): void => {
    let html = metricCard('Initial Load', state.eventTime || '— ms');
    if (state.currentView !== 'Agenda') html += metricCard('Create Event', state.createTime || '— ms');
    html += metricCard('Update Event', state.updateTime || '— ms');
    html += metricCard('Delete Event', state.deleteTime || '— ms');
    if (state.useResources) html += metricCard('Resources In View', owners.length.toLocaleString());
    html += metricCard('Events In View', state.currentCount.toLocaleString());
    metricsEl.innerHTML = html;
  };

  // ── Buttons ──
  const loadBtn = new Button({ cssClass: 'e-primary' });
  loadBtn.appendTo($('perf-load-btn'));
  const resetBtn = new Button({ disabled: true });
  resetBtn.appendTo($('perf-reset-btn'));

  const updateButtons = (): void => {
    loadBtn.disabled = state.isLoaded;
    resetBtn.disabled = !state.isLoaded;
    loadBtn.dataBind();
    resetBtn.dataBind();
  };

  const setLoaded = (loaded: boolean): void => {
    state.isLoaded = loaded;
    schedule.cssClass = loaded ? '' : 'no-events';
    schedule.dataBind();
    updateButtons();
  };

  const clearMetrics = (): void => {
    state.eventTime = '';
    state.createTime = '';
    state.updateTime = '';
    state.deleteTime = '';
  };

  // ── Scheduler ──
  const schedule: Schedule = new Schedule({
    width: '100%',
    height: '100%',
    currentView: state.currentView,
    selectedDate: new Date(),
    cssClass: 'no-events',
    eventSettings: { dataSource: [] },
    group: { resources: [] },
    views: [
      { option: 'Day', allowVirtualScrolling: true },
      { option: 'Week', allowVirtualScrolling: true },
      { option: 'Month', allowVirtualScrolling: true },
      { option: 'TimelineDay', allowVirtualScrolling: true },
      { option: 'TimelineWeek', allowVirtualScrolling: true },
      { option: 'TimelineMonth', allowVirtualScrolling: true },
      { option: 'TimelineYear', orientation: 'Vertical', allowVirtualScrolling: true },
      { option: 'Agenda', allowVirtualScrolling: true },
    ],
    resources: [
      {
        field: 'OwnerId',
        title: 'Owner',
        name: 'Owners',
        allowMultiple: false,
        dataSource: [],
        textField: 'Text',
        idField: 'Id',
        colorField: 'Color',
      },
    ],
    toolbarItems: [
      { name: 'Previous', align: 'Left' },
      { name: 'Next', align: 'Left' },
      { name: 'DateRangeText', align: 'Left' },
      { name: 'Views', align: 'Right' },
    ],

    actionBegin: (args: ActionEventArgs) => {
      if (!state.isLoaded) return;

      if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
        start = new Date().getTime();
        return;
      }
      if (args.requestType === 'eventCreate') {
        crudStart = new Date().getTime();
        crudType = 'create';
      }
      if (args.requestType === 'eventChange') {
        crudStart = new Date().getTime();
        crudType = 'update';
      }
      if (args.requestType === 'eventRemove') {
        crudStart = new Date().getTime();
        crudType = 'delete';
      }
    },

    // Keep the View dropdown in sync when the user switches views from the Scheduler toolbar.
    actionComplete: (args: ActionEventArgs) => {
      if (args.requestType === 'viewNavigate') {
        const newView = (schedule.currentView as View) || state.currentView;
        if (newView !== state.currentView) {
          state.currentView = newView;
          viewDdl.value = newView;
          viewDdl.dataBind();
          renderMetrics();
        }
      }
    },

    dataBound: () => {
      state.currentCount = schedule.getCurrentViewEvents().length || 0;
      if (state.isLoaded) {
        if (start !== null) {
          state.eventTime = `${new Date().getTime() - start} ms`;
          start = null;
        }
        if (crudStart !== null && crudType) {
          const value = `${new Date().getTime() - crudStart} ms`;
          if (crudType === 'create') state.createTime = value;
          if (crudType === 'update') state.updateTime = value;
          if (crudType === 'delete') state.deleteTime = value;
          crudStart = null;
          crudType = null;
        }
      }
      renderMetrics();
    },
  });
  schedule.appendTo($('perf-schedule'));

  // ── Toolbar actions ──
  loadBtn.element.onclick = () => {
    start = new Date().getTime();
    setLoaded(true);
    schedule.eventSettings.dataSource = getDataForView(state.currentView, state.useResources);
    schedule.dataBind();
  };

  resetBtn.element.onclick = () => {
    setLoaded(false);
    schedule.eventSettings.dataSource = [];
    schedule.dataBind();
    clearMetrics();
    renderMetrics();
  };

  const clearBeforeViewChange = (): void => {
    schedule.eventSettings.dataSource = []; // applied by the dataBind() in setLoaded()
    start = null;
    crudStart = null;
    crudType = null;
    clearMetrics();
    state.currentCount = 0;
    setLoaded(false);
    renderMetrics();
  };

  // ── Configuration panel ──
  const viewDdl: DropDownList = new DropDownList({
    width: 150,
    dataSource: viewOptions,
    fields: { text: 'text', value: 'value' },
    value: state.currentView,
    change: (e: ChangeEventArgs) => {
      if (!e.isInteracted) return;
      const view = ((e?.value as View) ?? state.currentView);
      clearBeforeViewChange();
      setTimeout(() => {
        state.currentView = view;
        renderMetrics();
        schedule.changeView(view);
      }, 0);
    },
  });
  viewDdl.appendTo($('perf-view-ddl'));

  const resourceDdl: DropDownList = new DropDownList({
    width: 150,
    dataSource: resourceModeOptions,
    fields: { text: 'text', value: 'value' },
    value: 'none',
    change: (e: ChangeEventArgs) => {
      const enabled = e?.value === 'with';
      state.useResources = enabled;
      clearBeforeViewChange();
      setTimeout(() => {
        schedule.resources[0].dataSource = enabled ? owners : [];
        schedule.setProperties({ group: enabled ? { resources: ['Owners'] } : { resources: [] } }, true);
        schedule.refresh();
      }, 0);
    },
  });
  resourceDdl.appendTo($('perf-resource-ddl'));

  renderMetrics();
}
