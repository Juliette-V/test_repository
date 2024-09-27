import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import { useState } from 'react';
import { EventForm } from './components/Calendar/EventForm';
import { getBoundingRect } from './utils';
import { EventFormLocation, EventFormMode } from './types';
import { MainLayout } from './components/Layout/MainLayout';

function App() {
  const [formLocation, setFormLocation] = useState<EventFormLocation | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<EventFormMode>('create');
  const [formSelectInfo, setFormSelectInfo] = useState<DateSelectArg>();
  const [formClickInfo, setFormClickInfo] = useState<EventClickArg>();

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setFormLocation(getBoundingRect(selectInfo.jsEvent));
    setFormMode('create');
    setIsFormOpen(true);
    setFormSelectInfo(selectInfo);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setFormLocation(getBoundingRect(clickInfo.jsEvent));
    setFormMode('edit');
    setIsFormOpen(true);
    setFormClickInfo(clickInfo);
  };

  return (
    <MainLayout>
      <h1 className="title">Calendar</h1>
      {isFormOpen && (
        <EventForm
          onClose={() => setIsFormOpen(false)}
          location={formLocation}
          formMode={formMode}
          selectInfo={formSelectInfo}
          clickInfo={formClickInfo}
        />
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'today,prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        buttonText={{
          prev: 'back',
          next: 'next',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
      />
    </MainLayout>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <div className="event" style={{ background: eventContent.backgroundColor }}>
      {eventContent.event.title}
    </div>
  );
}

export default App;
