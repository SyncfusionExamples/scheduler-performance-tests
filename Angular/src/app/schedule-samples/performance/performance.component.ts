import { Component, ViewChild, ViewEncapsulation, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  ScheduleModule,
  ScheduleComponent,
  DayService,
  WeekService,
  MonthService,
  AgendaService,
  TimelineViewsService,
  TimelineMonthService,
  TimelineYearService,
  ActionEventArgs,
  EventSettingsModel,
  GroupModel,
  View,
} from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
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

type CrudType = 'create' | 'update' | 'delete' | null;

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [NgTemplateOutlet, ScheduleModule, ButtonModule, DropDownListModule],
  providers: [
    DayService,
    WeekService,
    MonthService,
    AgendaService,
    TimelineViewsService,
    TimelineMonthService,
    TimelineYearService,
  ],
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css'],
  // Styles target Syncfusion's internal elements (.e-schedule, .e-appointment),
  // so view encapsulation is disabled — same behaviour as the global CSS import in React.
  encapsulation: ViewEncapsulation.None,
})
export class PerformanceComponent {
  @ViewChild('scheduleObj') public scheduleObj?: ScheduleComponent;

  // ── Timers (module-level `let start / crudStart` in the React sample) ──
  private start: number | null = null;
  private crudStart: number | null = null;
  private crudType: CrudType = null;

  // ── UI state (useState in the React sample) ──
  public readonly eventTime = signal('');
  public readonly createTime = signal('');
  public readonly updateTime = signal('');
  public readonly deleteTime = signal('');
  public readonly currentCount = signal(0);

  public isLoaded = false;
  public currentView: View = 'Day';
  public useResources = false;
  public readonly selectedDate: Date = new Date();

  // ── Scheduler bindings ──
  public readonly owners: Record<string, any>[] = generateResourceData(1, 300, 'Resource ');
  public ownerDataSource: Record<string, any>[] = [];
  public eventSettings: EventSettingsModel = { dataSource: [] };
  public group: GroupModel = { resources: [] };

  public readonly viewOptions = [
    { text: 'Day', value: 'Day' },
    { text: 'Week', value: 'Week' },
    { text: 'Month', value: 'Month' },
    { text: 'Timeline Day', value: 'TimelineDay' },
    { text: 'Timeline Week', value: 'TimelineWeek' },
    { text: 'Timeline Month', value: 'TimelineMonth' },
    { text: 'Timeline Year', value: 'TimelineYear' },
    { text: 'Agenda', value: 'Agenda' },
  ];

  public readonly resourceModeOptions = [
    { text: 'No Resources', value: 'none' },
    { text: 'Resources', value: 'with' },
  ];

  public readonly dropDownFields = { text: 'text', value: 'value' };

  private getDataForView(view: string, withResources: boolean = this.useResources): Record<string, any>[] {
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
  }

  // ── Toolbar actions ──
  public loadData(): void {
    this.start = new Date().getTime();
    this.isLoaded = true;
    this.eventSettings = { dataSource: this.getDataForView(this.currentView, this.useResources) };
  }

  public resetData(): void {
    this.isLoaded = false;
    this.eventSettings = { dataSource: [] };
    this.clearMetrics();
  }

  // ── Scheduler events ──
  public onActionBegin(args: ActionEventArgs): void {
    if (!this.isLoaded) return;

    if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
      this.start = new Date().getTime();
      return;
    }
    if (args.requestType === 'eventCreate') {
      this.crudStart = new Date().getTime();
      this.crudType = 'create';
    }
    if (args.requestType === 'eventChange') {
      this.crudStart = new Date().getTime();
      this.crudType = 'update';
    }
    if (args.requestType === 'eventRemove') {
      this.crudStart = new Date().getTime();
      this.crudType = 'delete';
    }
  }

  // Keep currentView in sync when the user switches views from the Scheduler toolbar.
  public onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'viewNavigate') {
      const newView = (this.scheduleObj?.currentView as View) || this.currentView;
      if (newView !== this.currentView) this.currentView = newView;
    }
  }

  public onDataBound(): void {
    this.currentCount.set(this.scheduleObj?.getCurrentViewEvents().length || 0);
    if (!this.isLoaded) return; // keep metrics empty when not loaded

    if (this.start !== null) {
      this.eventTime.set(`${new Date().getTime() - this.start} ms`);
      this.start = null;
    }

    if (this.crudStart !== null && this.crudType) {
      const value = `${new Date().getTime() - this.crudStart} ms`;
      if (this.crudType === 'create') this.createTime.set(value);
      if (this.crudType === 'update') this.updateTime.set(value);
      if (this.crudType === 'delete') this.deleteTime.set(value);
      this.crudStart = null;
      this.crudType = null;
    }
  }

  // ── Configuration panel ──
  public onViewChange(e: ChangeEventArgs): void {
    const view = ((e?.value as View) ?? this.currentView);
    this.clearBeforeViewChange();
    setTimeout(() => {
      this.currentView = view;
      this.scheduleObj?.changeView(view);
    }, 0);
  }

  public onResourceModeChange(e: ChangeEventArgs): void {
    const enabled = e?.value === 'with';
    this.useResources = enabled;
    this.clearBeforeViewChange();
    setTimeout(() => {
      this.ownerDataSource = enabled ? this.owners : [];
      this.group = enabled ? { resources: ['Owners'] } : { resources: [] };
      if (this.scheduleObj) {
        this.scheduleObj.resources[0].dataSource = this.ownerDataSource;
        this.scheduleObj.setProperties({ group: this.group }, true);
        this.scheduleObj.refresh();
      }
    }, 0);
  }

  private clearBeforeViewChange(): void {
    this.scheduleObj?.setProperties({ eventSettings: { dataSource: [] } }, true);
    this.start = null;
    this.crudStart = null;
    this.crudType = null;
    this.clearMetrics();
    this.currentCount.set(0);
    this.isLoaded = false;
    this.eventSettings = { dataSource: [] };
  }

  private clearMetrics(): void {
    this.eventTime.set('');
    this.createTime.set('');
    this.updateTime.set('');
    this.deleteTime.set('');
  }
}
