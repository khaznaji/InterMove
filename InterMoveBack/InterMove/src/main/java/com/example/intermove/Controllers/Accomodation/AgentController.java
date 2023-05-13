package com.example.intermove.Controllers.Accomodation;

import com.example.intermove.Entities.Accomodation.Agent;
import com.example.intermove.Services.Accomodation.IAccomodationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Agents Management")
@RestController
@RequestMapping("/Agents")
public class AgentController {
    @Autowired
    IAccomodationService accomodationService;

    @GetMapping("/AllAgents")
    @ResponseBody
    public List<Agent> getAllAgents() {
        return accomodationService.getAllAgents();
    }

    @PostMapping("/addAgent/{idAgency}")
    @ResponseBody
    public int addAgent(@RequestBody Agent agent, @PathVariable("idAgency") int id) {

        return accomodationService.addAgent(agent,id);
    }


    @PutMapping("/updateAgent")
    @ResponseBody
    public Agent updateAgent(@RequestBody Agent agent) {
        return accomodationService.updateAgent(agent);
    }


    @DeleteMapping("/deleteAgent/{id}")
    @ResponseBody
    public void deleteAgency(@PathVariable("id") int id) {
        accomodationService.deleteAgent(id);
    }

    @DeleteMapping("/deleteAll")
    @ResponseBody
    public void deleteAll(){
        accomodationService.deleteAllAgents();
    }

    @GetMapping("/getAgentById/{id}")
    @ResponseBody
    public Agent getAgentById(@PathVariable("id") int id) {
        return accomodationService.getAgentById(id);
    }
}
