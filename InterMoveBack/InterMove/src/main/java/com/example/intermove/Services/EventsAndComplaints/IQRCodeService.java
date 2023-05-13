package com.example.intermove.Services.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.QRCode;

public interface IQRCodeService {
    QRCode findByLink(String link);

}
