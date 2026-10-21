using System.Drawing;
using System.Reflection;

namespace SchedulerPerformance.Components.Pages
{
    public class ScheduleData
    {
        public static List<EventData> GenerateWeekViewEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 12);
            int count = 1000;
            List<EventData> data = new List<EventData>();
            var id = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 5);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart,
                        EndTime = scheduleStart.AddMinutes(30),
                        IsAllDay = (id % 20 != 0) ? false : true
                    });
                    scheduleStart = scheduleStart.AddMinutes(30);
                    id++;
                    i++;
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<EventData> GenerateMonthViewEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 5, 1);
            int count = 2000;
            List<EventData> data = new List<EventData>();
            var id = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart.AddHours(1),
                        EndTime = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<EventData> GenerateAgendaViewEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 7);
            int count = 2000;
            List<EventData> data = new List<EventData>();
            var id = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart.AddHours(1),
                        EndTime = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<EventData> GenerateYearViewEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(2021, 1, 1);
            int count = 2000;
            List<EventData> data = new List<EventData>();
            var id = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 1, 1);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart.AddHours(1),
                        EndTime = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<AppointmentData> GenerateWeekViewEventsKendo()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 12);
            int count = 1000;
            List<AppointmentData> data = new List<AppointmentData>();
            var id = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 5);
                do
                {
                    data.Add(new AppointmentData
                    {
                        Id = id,
                        Title = "Event #" + id,
                        Start = scheduleStart,
                        End = scheduleStart.AddMinutes(30),
                        IsAllDay = (id % 20 != 0) ? false : true
                    });
                    scheduleStart = scheduleStart.AddMinutes(30);
                    id++;
                    i++;
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<AppointmentData> GenerateMonthViewEventsKendo()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 5, 1);
            int count = 2000;
            List<AppointmentData> data = new List<AppointmentData>();
            var id = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new AppointmentData
                    {
                        Id = id,
                        Title = "Event #" + id,
                        Start = scheduleStart.AddHours(1),
                        End = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<AppointmentData> GenerateAgendaViewEventsKendo()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 7);
            int count = 2000;
            List<AppointmentData> data = new List<AppointmentData>();
            var id = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new AppointmentData
                    {
                        Id = id,
                        Title = "Event #" + id,
                        Start = scheduleStart.AddHours(1),
                        End = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<ResourceData> GenerateResourceData()
        {
            List<ResourceData> resources = new List<ResourceData>(60);
            var colors = new string[] { "#ff8787", "#9775fa", "#748ffc", "#3bc9db", "#69db7c",
            "#fdd835", "#748ffc", "#9775fa", "#df5286", "#7fa900",
            "#fec200", "#5978ee", "#00bdae", "#ea80fc"};
            for (int a = 1; a <= 60; a++)
            {
                int index = a % colors.Length;
                index = index == 0 ? (colors.Length / a) : index;
                resources.Add(new ResourceData
                {
                    Id = a,
                    Text = "Resource " + a,
                    Color = colors[index]
                });
            }
            return resources;
        }

        public static List<EventData> GenerateDayViewResEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 8);
            int count = 2000;
            int resCount = 60;
            List<EventData> data = new List<EventData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                int a = 1;
                int rowCount = 33;
                if (resId % 3 == 0) { rowCount = 34; }
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 7);
                do
                {
                    if (a > rowCount)
                    {
                        i--;
                        break;
                    }
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart,
                        EndTime = scheduleStart.AddMinutes(30),
                        IsAllDay = (id % 20 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddMinutes(30);
                    id++;
                    i++;
                    a++;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<EventData> GenerateMonthViewResEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 5, 1);
            int count = 1000;
            int resCount = 60;
            List<EventData> data = new List<EventData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart.AddHours(1),
                        EndTime = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<EventData> GenerateAgendaViewResEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 7);
            int count = 2000;
            int resCount = 60;
            List<EventData> data = new List<EventData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart.AddHours(1),
                        EndTime = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<EventData> GenerateYearViewResEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(2021, 1, 1);
            int count = 2000;
            int resCount = 60;
            List<EventData> data = new List<EventData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                scheduleStart = new DateTime(DateTime.Now.Year, 1, 1);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart.AddDays(1),
                        EndTime = scheduleStart.AddDays(2),
                        IsAllDay = (id % 10 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddDays(15);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<ResourceData> GenerateVirtualResourceData()
        {
            List<ResourceData> resources = new List<ResourceData>(300);
            var colors = new string[] { "#ff8787", "#9775fa", "#748ffc", "#3bc9db", "#69db7c",
            "#fdd835", "#748ffc", "#9775fa", "#df5286", "#7fa900",
            "#fec200", "#5978ee", "#00bdae", "#ea80fc"};
            for (int a = 1; a <= 300; a++)
            {
                int index = a % colors.Length;
                index = index == 0 ? (colors.Length / a) : index;
                resources.Add(new ResourceData
                {
                    Id = a,
                    Text = "Resource " + a,
                    Color = colors[index]
                });
            }
            return resources;
        }

        public static List<EventData> GenerateVirtualDayEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 8);
            int count = 9000;
            int resCount = 300;
            List<EventData> data = new List<EventData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                int a = 1;
                int rowCount = 30;
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 7);
                do
                {
                    if (a > rowCount)
                    {
                        i--;
                        break;
                    }
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart,
                        EndTime = scheduleStart.AddMinutes(30),
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddMinutes(30);
                    id++;
                    i++;
                    a++;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<EventData> GenerateVirtualMonthEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 5, 1);
            int count = 9000;
            int resCount = 300;
            List<EventData> data = new List<EventData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart.AddHours(1),
                        EndTime = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<EventData> GenerateVirtualYearEvents()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(2021, 1, 1);
            int count = 9000;
            int resCount = 300;
            List<EventData> data = new List<EventData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                scheduleStart = new DateTime(DateTime.Now.Year, 1, 1);
                do
                {
                    data.Add(new EventData
                    {
                        Id = id,
                        Subject = "Event #" + id,
                        StartTime = scheduleStart.AddDays(1),
                        EndTime = scheduleStart.AddDays(2),
                        IsAllDay = (id % 10 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddMonths(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<AppointmentData> GenerateMonthViewResEventsKendo()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 5, 1);
            int count = 2000;
            int resCount = 60;
            List<AppointmentData> data = new List<AppointmentData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new AppointmentData
                    {
                        Id = id,
                        Title = "Event #" + id,
                        Start = scheduleStart.AddHours(1),
                        End = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<AppointmentData> GenerateAgendaViewResEventsKendo()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 7);
            int count = 2000;
            int resCount = 60;
            List<AppointmentData> data = new List<AppointmentData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new AppointmentData
                    {
                        Id = id,
                        Title = "Event #" + id,
                        Start = scheduleStart.AddHours(1),
                        End = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<AppointmentData> GenerateDayViewResEventsKendo()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 8);
            int count = 1000;
            int resCount = 60;
            List<AppointmentData> data = new List<AppointmentData>();
            var id = 1;
            int resId = 0;
            for (var i = 0; i < count; i++)
            {
                resId++;
                int a = 1;
                int rowCount = 33;
                if (resId % 3 == 0) { rowCount = 34; }
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 7);
                do
                {
                    if (a > rowCount)
                    {
                        i--;
                        break;
                    }
                    data.Add(new AppointmentData
                    {
                        Id = id,
                        Title = "Event #" + id,
                        Start = scheduleStart,
                        End = scheduleStart.AddMinutes(30),
                        IsAllDay = (id % 20 != 0) ? false : true,
                        ResourceId = resId
                    });
                    scheduleStart = scheduleStart.AddMinutes(30);
                    id++;
                    i++;
                    a++;
                } while (scheduleStart < scheduleEnd && data.Count < count);
                if (resId >= resCount)
                {
                    resId = 0;
                }
            }
            return data;
        }

        public static List<EventField> GenerateWeekViewEventsDevExp()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 4, 12);
            int count = 2000;
            List<EventField> data = new List<EventField>();
            var id = 1;
            int labelId = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 5);
                do
                {

                    data.Add(new EventField
                    {
                        Id = id,
                        Title = "Event #" + id,
                        Start = scheduleStart,
                        End = scheduleStart.AddMinutes(30),
                        IsAllDay = (id % 20 != 0) ? false : true,
                        Label = labelId++
                    });
                    scheduleStart = scheduleStart.AddMinutes(30);
                    id++;
                    i++;
                    if (labelId > 10) { labelId = 1; }
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<EventField> GenerateMonthViewEventsDevExp()
        {
            DateTime scheduleStart;
            DateTime scheduleEnd = new DateTime(DateTime.Now.Year, 5, 1);
            int count = 2000;
            List<EventField> data = new List<EventField>();
            var id = 1;
            int labelId = 1;
            for (var i = 0; i < count; i++)
            {
                scheduleStart = new DateTime(DateTime.Now.Year, 4, 1);
                do
                {
                    data.Add(new EventField
                    {
                        Id = id,
                        Title = "Event #" + id,
                        Start = scheduleStart.AddHours(1),
                        End = scheduleStart.AddHours(2),
                        IsAllDay = (id % 10 != 0) ? false : true,
                        Label = labelId++
                    });
                    scheduleStart = scheduleStart.AddDays(1);
                    id++;
                    i = data.Count;
                    if (labelId > 10) { labelId = 1; }
                } while (scheduleStart < scheduleEnd && data.Count < count);
            }
            return data;
        }

        public static List<GroupData> GenerateResourceDataDevExp()
        {
            List<GroupData> resources = new List<GroupData>(60);
            var colors = typeof(Color).GetProperties(BindingFlags.Static | BindingFlags.DeclaredOnly | BindingFlags.Public)
                        .Select(c => (Color)c.GetValue(null, null))
                        .ToList();
            var backgroundColor = new string[] { "green-background", "orange-background", "yellow-background", "purple-background", "pink-background",
            "red-background", "blue-background", "violet-background", "silver-background", "ivory-background",
            "cyan-background", "chocolate-background", "brown-background", "aqua-background"};
            for (int a = 1; a <= 60; a++)
            {
                int index = a % colors.Count;
                index = index == 0 ? (colors.Count / a) : index;
                int backgroundIndex = a % backgroundColor.Length;
                backgroundIndex = backgroundIndex == 0 ? (backgroundColor.Length / a) : backgroundIndex;
                resources.Add(new GroupData
                {
                    Id = a,
                    Text = "Resource " + a,
                    ResColor = colors[index],
                    TextCss = "text-white",
                    BackgroundCss = backgroundColor[backgroundIndex]
                });
            }
            return resources;
        }

        public class EventData
        {
            public int Id { get; set; }
            public string Subject { get; set; }
            public DateTime StartTime { get; set; }
            public DateTime EndTime { get; set; }
            public bool IsAllDay { get; set; }
            public int ResourceId { get; set; }
        }

        public class AppointmentData
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public DateTime Start { get; set; }
            public DateTime End { get; set; }
            public bool IsAllDay { get; set; }
            public int ResourceId { get; set; }
        }

        public class EventField : AppointmentData
        {
            public int Label { get; set; }
        }

        public class ResourceData
        {
            public int Id { get; set; }
            public string Text { get; set; }
            public string Color { get; set; }
        }

        public class GroupData : ResourceData
        {
            public string TextCss { get; set; }
            public string BackgroundCss { get; set; }
            public Color ResColor { get; set; }
        }
    }
}
