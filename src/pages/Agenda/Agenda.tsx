import React, { useState } from 'react'
import { Calendar } from 'rsuite';
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import './App.css'

interface Event{
  id: number
  title: string
  date: string
  time: string
}

const Agenda: React.FC = () =>{
    const [events, setEvents] = useState<Event[]>([])
    const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ title: '', date: '', time: '' })
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())


    {/*Add new event*/}
    const addEvent = (e: React.FormEvent) => {
      e.preventDefault();
      if (newEvent.title && newEvent.date && newEvent.time){
          setEvents([...events,{...newEvent, id: Date.now()}])
          setNewEvent({title: '', date: '', time: ''})
      }
  }

  
  {/*delete event*/}
  const deleteEvent = (id: number) => {
      setEvents(events.filter(event => event.id !== id))
  }

  const getEventsForDate = (date: Date) => {
      return events.filter(event => event.date === date.toISOString().split('T')[0])
  }


    {/*const dialog = (document.getElementById("dialog") as HTMLInputElement).value;*/}
    const dialog = document.getElementById("dialog");
    
    const handleOpenDialog = (e: React.FormEvent) => {
      e.preventDefault();
      dialog.showModal();
    }

    const handleCloseDialog = () => {
        dialog.close();
      }

  return(
        <>
          <div className='container mx-auto p-4 max-w-6xl'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Agenda</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <Calendar
                  defaultValue = {selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border shadow" 
                />
                      
                <dialog id='dialog' className='w-[400px] h-[400px] bg-white rounded-xl px-6 py-6'>
                  <div className='flex items-center content-center'>
                    <h2 className='font-bold'>Aggiungi Nuovo Evento</h2>

                    <button id="close-modal" className="float-right">
                      <IoIosClose onClick={handleCloseDialog}/>
                    </button>
                  </div>
                        

                  <form onSubmit={addEvent} className="space-y-4 py-6">
                    <div>
                      <label htmlFor="title">Titolo</label>
                        <input
                          id="title"
                          type="text"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                          placeholder="Inserisci il titolo dell'evento"
                          className="w-full"
                        />
                    </div>
                    <div>
                      <label htmlFor="date">Data</label>
                      <input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="time">Ora</label>
                        <input
                          id="time"
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                          className="w-full"
                        />
                    </div>
                    <button type="submit" className="w-full">
                      Aggiungi Evento
                    </button>
                  </form>
                </dialog>

                <button 
                  type='button' 
                  className=" flex items-center mt-4 w-full rounded-md bg-black text-white"
                  onClick={handleOpenDialog}
                  >
                  <FaPlus size={20}/> Aggiungi Evento
                </button>
                      
              </div>
            </div>

            <div className="space-y-4 float-right top-0">
              <h2 className="text-2xl font-semibold mb-4">Eventi</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium">Eventi per {selectedDate.toLocaleDateString()}</h3>
                  {getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="bg-white p-4 rounded-lg shadow mt-2">
                      <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
                      <p className="text-gray-600">Ora: {event.time}</p>
                      <button  
                        className="mt-2"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <FaTrash className="mr-2 h-4 w-4" /> Elimina
                      </button>
                    </div>
                  ))}
              </div>
            
              <h3 className="text-lg font-medium">Tutti gli eventi</h3>
                {events.map(event => (
                  <div key={event.id} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-lg mb-2">{event.title}</h4>
                    <p className="text-gray-600">Data: {event.date}</p>
                    <p className="text-gray-600">Ora: {event.time}</p>
                    <button  
                      className="mt-2 flex items-center"
                      onClick={() => deleteEvent(event.id)}
                    >
                      <FaTrash className="mr-2 h-4 w-4" /> Elimina
                    </button>
                  </div>
                ))}
                

            </div>


          </div>
        </>
  )
}

export default Agenda
