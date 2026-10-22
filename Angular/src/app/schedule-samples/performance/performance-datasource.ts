export function generateResourceData(
  startId: number = 1,
  endId: number = 100,
  text: string = '',
  isAddGroupId: boolean = false,
  groupStartId?: number,
  groupEndId?: number
): Record<string, any>[] {
  const data: Record<string, any>[] = [];
  const resData: Record<string, any>[] = [
    { text: 'Nancy', color: '#1F4690' },
    { text: 'Steven', color: '#3FD1CB' },
    { text: 'Michael', color: '#1363DF' }
  ];
  for (let a: number = startId; a <= endId; a++) {
    const n: number = Math.floor(Math.random() * resData.length);
    data.push({ Id: a, Text: text + a + '', Color: resData[n].color });
  }
  if (isAddGroupId && groupStartId !== undefined && groupEndId !== undefined) {
    let i: number = groupStartId;
    for (const d of data) {
      d.GroupID = i;
      d.Text += '_' + d.GroupID;
      i++;
      if (i > groupEndId) {
        i = groupStartId;
      }
    }
  }
  return data;
}

export const generateDayEvents = () => {
  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  const today = new Date();
  let startDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let id: number = 1;

  const totalSlots = 48;
  const totalEvents = 100;

  const baseEvents = Math.floor(totalEvents / totalSlots); // 2
  const extraEvents = totalEvents % totalSlots; // 4

  let slotIndex = 0;

  for (let j = 0; j < 48; j++) {

    const endDate = new Date(startDate.getTime() + (60000 * 30));

    let eventsInSlot = baseEvents;

    if (slotIndex < extraEvents) {
      eventsInSlot += 1; // add extra events
    }

    for (let k = 0; k < eventsInSlot; k++) {
      const nCount = Math.floor(Math.random() * names.length);

      data.push({
        Id: id++,
        Subject: names[nCount],
        StartTime: new Date(startDate),
        EndTime: endDate,
        IsAllDay: false
      });
    }

    slotIndex++;
    startDate = new Date(startDate.getTime() + (60000 * 30));
  }

  return data;
};

export const generateDayResourceEvents = () => {

  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  let id = 1;
  const today = new Date();
  const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const totalEvents = 3000;
  const totalSlots = 48;

  const baseEventsPerSlot = Math.floor(totalEvents / totalSlots); // 62
  const extraEvents = totalEvents % totalSlots; // 24

  let resourceId = 1;
  const maxResource = 300;

  for (let slot = 0; slot < totalSlots; slot++) {

    const start = new Date(baseDate);
    start.setMinutes(slot * 30);

    const end = new Date(start.getTime() + 30 * 60000);

    let eventsInSlot = baseEventsPerSlot;

    if (slot < extraEvents) {
      eventsInSlot += 1; // 63 for first slots
    }

    for (let i = 0; i < eventsInSlot; i++) {

      const nCount = Math.floor(Math.random() * names.length);

      data.push({
        Id: id++,
        Subject: names[nCount],
        StartTime: start,
        EndTime: end,
        OwnerId: resourceId,
        IsAllDay: false
      });

      resourceId++;

      if (resourceId > maxResource) {
        resourceId = 1; // cycle resources
      }
    }
  }

  return data;
};

export const generateWeekEvents = () => {
  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  const sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek);
  let start: Date = new Date(sunday);
  let startDate: Date = new Date(sunday);
  let id: number = 1;

  const totalSlots = 7 * 48;          // 336
  const totalEvents = 700;

  const baseEventsPerSlot = Math.floor(totalEvents / totalSlots); // 2
  const extraEvents = totalEvents % totalSlots; // 28

  let slotIndex = 0;

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 48; j++) {

      const endDate = new Date(startDate.getTime() + 30 * 60000);

      // Decide how many events in this slot
      let eventsInSlot = baseEventsPerSlot;

      if (slotIndex < extraEvents) {
        eventsInSlot += 1; // add extra events to first few slots
      }

      for (let k = 0; k < eventsInSlot; k++) {
        const nCount = Math.floor(Math.random() * names.length);

        data.push({
          Id: id++,
          Subject: names[nCount],
          StartTime: new Date(startDate),
          EndTime: endDate,
          IsAllDay: false
        });
      }

      slotIndex++;
      startDate = new Date(startDate.getTime() + 30 * 60000);
    }

    startDate = start = new Date(start.setDate(start.getDate() + 1));
  }

  return data;
};

export const generateWeekResourceEvents = () => {

  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  let id = 1;
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek);
  const eventsPerWeek = 30;
  const basePerDay = Math.floor(eventsPerWeek / 7); // 4
  const extraDays = eventsPerWeek % 7; // 2 days will get 5 events

  for (let day = 0; day < 7; day++) {

    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);

    for (let r = 1; r <= 300; r++) {

      let eventsPerDay = basePerDay;

      if (day < extraDays) {
        eventsPerDay += 1; // first 2 days = 5 events
      }

      for (let e = 0; e < eventsPerDay; e++) {

        const slot = (r + e) % 48;

        const eventStart = new Date(currentDate);
        eventStart.setHours(Math.floor(slot / 2), (slot % 2) * 30, 0);

        const eventEnd = new Date(eventStart.getTime() + 30 * 60000);

        data.push({
          Id: id++,
          Subject: names[Math.floor(Math.random() * names.length)],
          StartTime: eventStart,
          EndTime: eventEnd,
          OwnerId: r,
          IsAllDay: false
        });
      }
    }
  }

  return data;
};

export const generateMonthEvents = () => {
  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  const today = new Date();
  let start: Date = new Date(today.getFullYear(), today.getMonth(), 1);
  let startDate: Date = new Date(today.getFullYear(), today.getMonth(), 1);
  let id: number = 1;

  const totalDays = 30;   // use 30 days
  const totalSlots = 12;  // 2hr slots
  const eventsPerDay = 100;

  const basePerSlot = Math.floor(eventsPerDay / totalSlots); // 8
  const extraSlots = eventsPerDay % totalSlots; // 4

  for (let i = 0; i < totalDays; i++) {

    let slotIndex = 0;

    for (let j = 0; j < totalSlots; j++) {

      const endDate: Date = new Date(startDate.getTime() + (120 * 60000));

      let eventsInSlot = basePerSlot;

      if (slotIndex < extraSlots) {
        eventsInSlot += 1; // 9 events in first 4 slots
      }

      for (let k = 0; k < eventsInSlot; k++) {

        const nCount = Math.floor(Math.random() * names.length);

        data.push({
          Id: id++,
          Subject: names[nCount],
          StartTime: new Date(startDate),
          EndTime: endDate,
          IsAllDay: false
        });
      }

      slotIndex++;
      startDate = new Date(startDate.getTime() + (120 * 60000));
    }

    // next day
    startDate = start = new Date(start.setDate(start.getDate() + 1));
  }

  return data;
};

export const generateMonthResourceEvents = () => {

  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  let id = 1;
  const today = new Date();
  const baseDate = new Date(today.getFullYear(), today.getMonth(), 1);

  const totalResources = 300;
  const days = 30;
  const eventsPerDayPerResource = 4;

  for (let day = 0; day < days; day++) {

    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + day);

    for (let r = 1; r <= totalResources; r++) {

      for (let e = 0; e < eventsPerDayPerResource; e++) {

        // spread across 12 slots (2-hour slots)
        const slot = (r + e) % 12;

        const start = new Date(currentDate);
        start.setHours(slot * 2, 0, 0);

        const end = new Date(start.getTime() + (120 * 60000));

        data.push({
          Id: id++,
          Subject: names[Math.floor(Math.random() * names.length)],
          StartTime: start,
          EndTime: end,
          OwnerId: r,   // direct assignment
          IsAllDay: false
        });
      }
    }
  }

  return data;
};

export const generateYearEvents = () => {

  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  let id = 1;
  const baseDate = new Date(new Date().getFullYear(), 0, 1);

  const totalDays = 365;
  const eventsPerDay = 10;

  for (let day = 0; day < totalDays; day++) {

    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + day);

    for (let e = 0; e < eventsPerDay; e++) {

      // distribute across full day (24 hrs)
      const hour = Math.floor((e / eventsPerDay) * 24);

      const start = new Date(currentDate);
      start.setHours(hour, (e % 2) * 30, 0);

      const end = new Date(start.getTime() + (60 * 60000)); // 1 hour

      data.push({
        Id: id++,
        Subject: names[Math.floor(Math.random() * names.length)],
        StartTime: start,
        EndTime: end,
        IsAllDay: false
      });
    }
  }

  return data;
};

export const generateYearResourceEvents = () => {

  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  let id = 1;
  const baseDate = new Date(new Date().getFullYear(), 0, 1);

  const totalResources = 300;
  const totalEvents = 10000;

  const basePerResource = Math.floor(totalEvents / totalResources); // 33
  const extraResources = totalEvents % totalResources; // 100 resources get +1

  for (let r = 1; r <= totalResources; r++) {

    let eventsForThisResource = basePerResource;

    if (r <= extraResources) {
      eventsForThisResource += 1; // first 100 resources → 34
    }

    for (let e = 0; e < eventsForThisResource; e++) {

      // spread across 365 days
      const dayIndex = (e * 7 + r) % 365;

      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + dayIndex);

      // spread within day
      const hour = (e * 3) % 24;

      const start = new Date(currentDate);
      start.setHours(hour, (e % 2) * 30, 0);

      const end = new Date(start.getTime() + (60 * 60000));

      data.push({
        Id: id++,
        Subject: names[Math.floor(Math.random() * names.length)],
        StartTime: start,
        EndTime: end,
        OwnerId: r,
        IsAllDay: false
      });
    }
  }

  return data;
};

export const generateAgendaEvents = () => {

  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  let id = 1;
  const today = new Date();
  const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const totalDays = 7;
  const totalEvents = 1000;

  const basePerDay = Math.floor(totalEvents / totalDays); // 142
  const extraDays = totalEvents % totalDays; // 6

  for (let day = 0; day < totalDays; day++) {

    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + day);

    let eventsPerDay = basePerDay + (day < extraDays ? 1 : 0);

    for (let e = 0; e < eventsPerDay; e++) {

      // restrict hours so event stays within same day
      const hour = Math.floor(Math.random() * 23); // 0–22 only
      const minute = Math.floor(Math.random() * 30); // 0–29 only

      const start = new Date(currentDate);
      start.setHours(hour, minute, 0);

      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30); // safe → won't cross day

      data.push({
        Id: id++,
        Subject: names[Math.floor(Math.random() * names.length)],
        StartTime: start,
        EndTime: end,
        IsAllDay: false
      });
    }
  }

  return data;
};

export const generateAgendaResourceEvents = () => {

  const data: Record<string, any>[] = [];
  const names: string[] = [
    'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
    'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
    'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
    'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
  ];

  let id = 1;
  const today = new Date();
  const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const totalResources = 300;
  const days = 7;

  const totalEventsPerResource = 30;
  const basePerDay = Math.floor(totalEventsPerResource / days); // 4
  const extraDays = totalEventsPerResource % days; // 2

  for (let day = 0; day < days; day++) {

    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + day);

    for (let r = 1; r <= totalResources; r++) {

      let eventsPerDay = basePerDay;

      if (day < extraDays) {
        eventsPerDay += 1; // first 2 days → 5 events
      }

      for (let e = 0; e < eventsPerDay; e++) {

        // Prevent cross-day spill (important for Agenda)
        const hour = Math.floor((e / eventsPerDay) * 20); // safe range
        const minute = (e % 2) * 30;

        const start = new Date(currentDate);
        start.setHours(hour, minute, 0);

        const end = new Date(start.getTime() + 30 * 60000);

        data.push({
          Id: id++,
          Subject: names[Math.floor(Math.random() * names.length)],
          StartTime: start,
          EndTime: end,
          OwnerId: r,
          IsAllDay: false
        });
      }
    }
  }

  return data;
};