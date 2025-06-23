"use client";

import React, { useState, useEffect } from "react";
import "../component/styles/EventScheduler.css";

function EventScheduler() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const url = "https://ccs1.gether.net.in/api";
  // const url = "https://391f-2406-7400-51-8cbb-7868-b7e8-6097-2286.ngrok-free.app/api";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEvent = async () => {
    const newEvent = {
      title: form.title,
      description: form.description,
      date: form.date,
      time: form.time,
    };

    try {
      const res = await fetch(`${url}/event/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (res.ok) {
        await fetchEvents();
        setForm({ title: "", description: "", date: "", time: "" });
        setModalOpen(false);
      }
    } catch (error) {
      console.log("error adding the event", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const res = await fetch(`${url}/event/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "ngrok-skip-browser-warning": true
        },
      });
      if (res.ok) {
        await fetchEvents();
      }
    } catch (error) {
      console.log("error deleting the event", error);
      console.log(id);
    }
  };

  const fetchEvents = async (pageNum = 1) => {
    try {
      const res = await fetch(`${url}/event/?page=${pageNum}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "ngrok-skip-browser-warning": true
        },
      });
      const data = await res.json();
      setEvents(data.events || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.log("error fetching events", error);
      setEvents([]);
    }
  };

  const clearForm = () => {
    setForm({ title: "", description: "", date: "", time: "" });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="event-container">
      <h1>Event Scheduler</h1>
      <button onClick={() => setModalOpen(true)} className="add-btn">
        Add Event
      </button>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add new Event</h2>
            <label className="label">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="textarea " />
            <label className="label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <label className="label">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <label className="label">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button
                onClick={() => [setModalOpen(false), clearForm()]}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button onClick={addEvent} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="event-list">
        {events.length === 0 ? (
          <p>No events scheduled</p>
        ) : (
          <>
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <button
                  onClick={() => deleteEvent(event._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  fetchEvents(currentPage - 1);
                }}
              >
                ⬅ Prev
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  fetchEvents(currentPage + 1);
                }}
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export default EventScheduler;

