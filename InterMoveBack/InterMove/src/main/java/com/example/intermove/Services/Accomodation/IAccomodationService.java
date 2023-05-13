package com.example.intermove.Services.Accomodation;

import com.example.intermove.Entities.Accomodation.Agency;
import com.example.intermove.Entities.Accomodation.Agent;
import com.example.intermove.Entities.Accomodation.House;
import com.example.intermove.Entities.Accomodation.TypeHouses;

import javax.transaction.Transactional;
import java.util.List;

public interface IAccomodationService {
    int addAgency(Agency agency);

    List<Agency> getAllAgencies();



    //House
    @Transactional
    int addHouses(House h, int idAgenc);

    List<Agent> getAllAgents();

    Agency getAgencyById(int id);
    List<Agency> getAgencyByName(String name);

    List<House> getAllHouses();

    Agent getAgentById(int id);

    Agency updateAgency(Agency agency);

    House getHouseById(int id);

    Agent updateAgent(Agent agent);

    void deleteAgency(int id);
    void deleteAll();

    @Transactional
    int addAgent(Agent a, int idAgenc);

    House updateHouses(House house);

    void deleteAgent(int id);

    void deleteHouse(int id);

    List<House> findByCountryAndRegion(String country, String region, Boolean available, TypeHouses typeHouses,Integer Loyer);

    void deleteAllAgents();

    List<Agent> findAgentsByAgency_Name(String AgencyName);
}
