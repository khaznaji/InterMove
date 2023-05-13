package com.example.intermove.Repositories.Accomodation;

import com.example.intermove.Entities.Accomodation.Agency;
import com.example.intermove.Entities.Accomodation.Agent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface IAgencyRepository extends CrudRepository<Agency,Integer> {

    Agency getById(Integer integer);

    List<Agency> findByNameContains(String name);





}
