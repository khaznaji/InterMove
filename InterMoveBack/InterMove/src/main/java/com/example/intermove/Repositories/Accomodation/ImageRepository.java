package com.example.intermove.Repositories.Accomodation;

import com.example.intermove.Entities.Accomodation.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String name);
}
