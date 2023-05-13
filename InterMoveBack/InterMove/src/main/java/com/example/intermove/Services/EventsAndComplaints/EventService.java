package com.example.intermove.Services.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.QRCode;
import com.example.intermove.Entities.User.User;
import com.example.intermove.Repositories.EventsAndComplaints.EventRepository;
import com.example.intermove.Repositories.User.UserRepository;

import com.example.intermove.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import com.example.intermove.Entities.EventsAndComplaints.Events;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service

public class EventService implements IEventsService {

    private final String accountSid = "ACe3ef0d872e4a7d5145ee4b5d2371e958";
    private final String authToken = "2cd596d52549a4b5bc2af597dfee2b01";
    private final String twilioPhoneNumber = "12762959644";
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;


    public Integer saveEvents(Events event) {
        return eventRepository.save(event).getId();
    }

    public Events save(Events employee) {
        return eventRepository.save(employee);
    }

    @Override
    public List<Events> getAllEvents() {
        return (List<Events>) eventRepository.findAll();
    }


    @Override
    public Events getEventsById(Integer id) {
        return eventRepository.findById(id).get();
    }

    @Override
    public void deleteEvent(Integer id) {
        eventRepository.deleteById(id);
    }

    @Override
    public Events UpdateEvent(Events E, Integer id) {
        E.setId(id);
        return eventRepository.save(E);
    }
    public byte[] getQRCodeImage (int id) throws IOException {
        Events qrCode = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("QRCode not found"));
        File file = new File(qrCode.getSpeaker());
        FileInputStream fis = new FileInputStream(file);
        byte[] image = Files.readAllBytes(file.toPath());
        fis.close();
        return image;
    }
   /* public Events getById(int id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Event not found with ID " + id));
    }*/
    @Override
    public List<Events> findByTitle(String title) {
        return eventRepository.findByTitle(title);
    }

    public Optional<Events> findById(Integer id) {
        return eventRepository.findById(id);
    }

    //public void AssignUserToEvendt(Long id, Integer idE) {
    //User user = userRepository.findById(id).orElse(null);
    //Events events = eventRepository.findById(idE).orElse(null);
    //user.setEvents(events);
    //userRepository.save(user);
    // }
    @Override

    public void assignUserToEvent(int userId, Integer eventId) throws Exception {
        Optional<Events> optionalEvent = eventRepository.findById(eventId);
        if (optionalEvent.isPresent()) {
            Events event = optionalEvent.get();
            if (event.getNbreDePlaces() > 0) {
                // Decrement available participants and save event
                event.setNbreDePlaces(event.getNbreDePlaces() - 1);
                User user = userRepository.findById(userId).orElse(null);
                if (user != null) {
                    // Check if user is already assigned to the event
                    boolean alreadyAssigned = false;
                    for (Events assignedEvent : user.getEvents()) {
                        if (assignedEvent.getId() == eventId) {
                            alreadyAssigned = true;
                            break;
                        }
                    }
                    if (!alreadyAssigned) {
                        user.getEvents().add(event);
                        userRepository.save(user);
                    } else {
                        throw new Exception("User is already assigned to this event");
                    }
                } else {
                    throw new Exception("User not found");
                }
            } else {
                throw new Exception("Event is full");
            }
        } else {
            throw new Exception("Event not found");
        }
    }

    public void removeUserFromEvent(int userId, Integer eventId) throws Exception {
        Optional<Events> optionalEvent = eventRepository.findById(eventId);
        if (optionalEvent.isPresent()) {
            Events event = optionalEvent.get();
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                throw new Exception("User not found");
            }
            if (!user.getEvents().contains(event)) {
                throw new Exception("User is not assigned to this event");
            }
            user.getEvents().remove(event);
            userRepository.save(user);
            event.setNbreDePlaces(event.getNbreDePlaces() + 1);
            eventRepository.save(event);
        } else {
            throw new Exception("Event not found");
        }
    }

    }







