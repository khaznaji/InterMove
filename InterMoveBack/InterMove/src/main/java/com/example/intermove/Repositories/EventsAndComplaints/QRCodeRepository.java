package com.example.intermove.Repositories.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QRCodeRepository extends JpaRepository<QRCode, Long> {
    QRCode findByLink(String link);
}
