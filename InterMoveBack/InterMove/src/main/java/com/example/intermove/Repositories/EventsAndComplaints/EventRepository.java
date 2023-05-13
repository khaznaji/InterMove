package com.example.intermove.Repositories.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Events,Integer>{
    @Query("SELECT u FROM Events u WHERE u.title LIKE %:title% ")
    List<Events> findByTitle(@Param("title") String title);

    @Query("SELECT e FROM Events e WHERE e.id = ?1")
    Events findEventsById(Integer id);
}
