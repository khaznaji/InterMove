package com.example.intermove.Services.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.Events;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class EventExcelGenerator {
    public static ByteArrayInputStream eventsToExcel(List<Events> events) throws IOException {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet("Events");

            // Create header row
            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("Id");
            headerRow.createCell(1).setCellValue("Title");
            headerRow.createCell(2).setCellValue("Start Date");
            headerRow.createCell(3).setCellValue("End Date");
            headerRow.createCell(4).setCellValue("Description");

            // Create data rows
            int rowNum = 1;
            for (Events event : events) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(event.getId());
                row.createCell(1).setCellValue(event.getTitle());
                row.createCell(2).setCellValue(event.getDateD().toString());
                row.createCell(3).setCellValue(event.getDateF().toString());
                row.createCell(4).setCellValue(event.getDescription());

            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
    }

