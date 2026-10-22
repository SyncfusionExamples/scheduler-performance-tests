import { useRef, useState, useMemo } from "react";
import { flushSync } from "react-dom";
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  Month,
  Agenda,
  TimelineViews,
  TimelineMonth,
  TimelineYear,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  ToolbarItemsDirective,
  ToolbarItemDirective,
} from "@syncfusion/ej2-react-schedule";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { generateResourceData, generateDayEvents, generateDayResourceEvents, generateWeekEvents, generateWeekResourceEvents, generateMonthEvents, generateMonthResourceEvents, generateYearEvents, generateYearResourceEvents, generateAgendaEvents, generateAgendaResourceEvents } from './performance-datasource';
import "./Performance.css";

let start = null;
let crudStart = null;

const App = () => {
  const scheduleRef = useRef(null);

  const [eventTime, setEventTime] = useState("");
  const [createTime, setCreateTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [deleteTime, setDeleteTime] = useState("");
  const [currentCount, setCurrentCount] = useState(0);

  const crudTypeRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [currentView, setCurrentView] = useState("Day");
  const [useResources, setUseResources] = useState(false);

  const owners = useMemo(
    () => generateResourceData(1, 300, "Resource "),
    []
  );

  const viewOptions = [
    { text: "Day", value: "Day" },
    { text: "Week", value: "Week" },
    { text: "Month", value: "Month" },
    { text: "Timeline Day", value: "TimelineDay" },
    { text: "Timeline Week", value: "TimelineWeek" },
    { text: "Timeline Month", value: "TimelineMonth" },
    { text: "Timeline Year", value: "TimelineYear" },
    { text: "Agenda", value: "Agenda" },
  ];

  const resourceModeOptions = [
    { text: "No Resources", value: "none" },
    { text: "Resources", value: "with" },
  ];

  const getDataForView = (view, withResourcesParam) => {
    const withResources = typeof withResourcesParam === "boolean" ? withResourcesParam : useResources;
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

  const loadData = () => {
    start = new Date().getTime();
    setDataSource(getDataForView(currentView, useResources));
    setIsLoaded(true);
  };

  const resetData = () => {
    setIsLoaded(false);
    setDataSource([]);
    setEventTime("");
    setCreateTime("");
    setUpdateTime("");
    setDeleteTime("");
  };

  const actionBegin = (args) => {
    if (!isLoaded) return;

    if (
      args.requestType === "viewNavigate" ||
      args.requestType === "dateNavigate"
    ) {
      start = new Date().getTime();
      return;
    }

    if (args.requestType === "eventCreate") {
      crudStart = new Date().getTime();
      crudTypeRef.current = "create";
    }

    if (args.requestType === "eventChange") {
      crudStart = new Date().getTime();
      crudTypeRef.current = "update";
    }

    if (args.requestType === "eventRemove") {
      crudStart = new Date().getTime();
      crudTypeRef.current = "delete";
    }
  };

  // Ensure datasource updates AFTER the view actually changes
  const actionComplete = (args) => {
    if (args.requestType === "viewNavigate") {
      const newView = scheduleRef.current?.currentView || currentView;
      if (newView !== currentView) setCurrentView(newView);
    }
  };

  const dataBound = () => {
    const currentEvents = scheduleRef.current?.getCurrentViewEvents().length || 0;
    setCurrentCount(currentEvents);
    if (!isLoaded) return;   // keep metrics empty when not loaded

    if (start !== null) {
      const timeTaken = new Date().getTime() - start;

      flushSync(() => {
        setEventTime(`${timeTaken} ms`);
      });

      start = null;
    }

    if (crudStart !== null && crudTypeRef.current) {
      const crudTaken = new Date().getTime() - crudStart;
      const value = `${crudTaken} ms`;

      flushSync(() => {
        if (crudTypeRef.current === "create") setCreateTime(value);
        if (crudTypeRef.current === "update") setUpdateTime(value);
        if (crudTypeRef.current === "delete") setDeleteTime(value);
      });

      crudStart = null;
      crudTypeRef.current = null;
    }
  };

  const clearBeforeViewChange = () => {
    if (scheduleRef.current) {
      scheduleRef.current.setProperties(
        { eventSettings: { dataSource: [] } },
        true
      );
    }

    start = null;
    crudStart = null;
    crudTypeRef.current = null;

    setEventTime("");
    setCreateTime("");
    setUpdateTime("");
    setDeleteTime("");
    setCurrentCount(0);

    setIsLoaded(false);
    setDataSource([]);
  };


  return (
    <div className="schedule-app-root">

      {/* TOP BAR */}
      <div className="top-scheduler-toolbar">
        <div className="schedule-config-panel">
          <ButtonComponent cssClass="e-primary" onClick={loadData} disabled={isLoaded}>Load Data</ButtonComponent>
          <ButtonComponent onClick={resetData} disabled={!isLoaded}>Reset</ButtonComponent>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="schedule-main-layout">
        {/* LEFT: SCHEDULER */}
        <div className="schedule-performance-container">
          <ScheduleComponent
            ref={scheduleRef}
            width="100%"
            height="100%"
            currentView={currentView}
            selectedDate={new Date()}
            actionBegin={actionBegin}
            actionComplete={actionComplete}
            dataBound={dataBound}
            cssClass={!isLoaded ? "no-events" : ""}
            eventSettings={{ dataSource: isLoaded ? dataSource : [] }}
            group={useResources ? { resources: ["Owners"] } : { resources: [] }}
          >
            <ViewsDirective>
              <ViewDirective option="Day" allowVirtualScrolling={true} />
              <ViewDirective option="Week" allowVirtualScrolling={true} />
              <ViewDirective option="Month" allowVirtualScrolling={true} />
              <ViewDirective option="TimelineDay" allowVirtualScrolling={true} />
              <ViewDirective option="TimelineWeek" allowVirtualScrolling={true} />
              <ViewDirective option="TimelineMonth" allowVirtualScrolling={true} />
              <ViewDirective option="TimelineYear" orientation="Vertical" allowVirtualScrolling={true} />
              <ViewDirective option="Agenda" allowVirtualScrolling={true} />
            </ViewsDirective>

            <ResourcesDirective>
              <ResourceDirective
                field="OwnerId"
                title="Owner"
                name="Owners"
                allowMultiple={false}
                dataSource={useResources ? owners : []}
                textField="Text"
                idField="Id"
                colorField="Color"
              />
            </ResourcesDirective>

            <ToolbarItemsDirective>
              <ToolbarItemDirective name='Previous' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='Next' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='DateRangeText' align='Left'></ToolbarItemDirective>
              <ToolbarItemDirective name='Views' align='Right'></ToolbarItemDirective>
            </ToolbarItemsDirective>

            <Inject services={[Day, Week, Month, Agenda, TimelineViews, TimelineMonth, TimelineYear]} />
          </ScheduleComponent>
        </div>

        {/* RIGHT: PANEL */}
        <div className="schedule-metrics-panel">
          {/* Scheduler Configuration section */}
          <div className="schedule-panel-header">Scheduler Configuration</div>
          <div className="schedule-dropdown-panel-body">
            <div className="schedule-config-row">
              <label className="schedule-config-label">View</label>
              <DropDownListComponent
                width={150}
                dataSource={viewOptions}
                fields={{ text: "text", value: "value" }}
                value={currentView}
                change={(e) => {
                  const view = e?.value ?? currentView;
                  clearBeforeViewChange();
                  setTimeout(() => {
                    setCurrentView(view);
                    scheduleRef.current?.changeView(view);
                  }, 0);
                }}
              />
            </div>

            <div className="schedule-config-row">
              <label className="schedule-config-label">Resource Mode</label>
              <DropDownListComponent
                width={150}
                dataSource={resourceModeOptions}
                fields={{ text: "text", value: "value" }}
                value={useResources ? "with" : "none"}
                change={(e) => {
                  const enabled = e?.value === "with";
                  setUseResources(enabled);
                  clearBeforeViewChange();
                  setTimeout(() => {
                    if (scheduleRef.current) {
                      scheduleRef.current.setProperties(
                        {
                          group: enabled
                            ? { resources: ["Owners"] }
                            : { resources: [] }
                        },
                        true
                      );
                      scheduleRef.current.refresh();
                    }
                  }, 0);
                }}
              />
            </div>
          </div>

          {/* Performance Metrics section */}
          <div className="schedule-panel-header">Performance Metrics</div>
          <div className="schedule-metric-panel-body">
            {renderMetricCard("Initial Load", eventTime || "— ms")}

            {currentView !== "Agenda" &&
              renderMetricCard("Create Event", createTime || "— ms")}

            {renderMetricCard("Update Event", updateTime || "— ms")}

            {renderMetricCard("Delete Event", deleteTime || "— ms")}

            {useResources &&
              renderMetricCard("Resources In View", owners.length.toLocaleString())}

            {renderMetricCard("Events In View", currentCount.toLocaleString())}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderMetricCard = (label, value) => {
  return (
    <div className="schedule-metric-card">
      <span className="schedule-metric-label">{label}</span>
      <div className="schedule-metric-value">{value}</div>
    </div>
  );
};

export default App;