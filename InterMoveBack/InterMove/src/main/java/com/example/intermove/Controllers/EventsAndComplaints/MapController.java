package com.example.intermove.Controllers.EventsAndComplaints;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;


@Controller
public class MapController {

    @Value("${tomtom.apikey}")
    private String tomTomApiKey;

    @GetMapping("/location")
    public String homePage(Model model) {
        model.addAttribute("apikey", tomTomApiKey);
        model.addAttribute("coolLocations", coolLocations());
        return "Location";
    }








    private List<Location> coolLocations() {
        return  Arrays.asList(new Location(new double[]{  2.33333, 48.866669}, "Intermove Paris"),

                new Location(new double[]{10.16488399324,  36.8526637182417}, "Intermove Tunis"),
                new Location(new double[]{10.1385998,15,   36.8403528}, "InterMove Nigeria")





        );
    }

    private static class Location {
        private final double[] lnglat;
        private final String description;

        public Location(double[] lnglat, String description) {
            this.lnglat = lnglat;
            this.description = description;
        }

        public double[] getLnglat() {
            return lnglat;
        }

        public String getDescription() {
            return description;
        }
    }

}


