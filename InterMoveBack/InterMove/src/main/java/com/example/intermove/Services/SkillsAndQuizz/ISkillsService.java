package com.example.intermove.Services.SkillsAndQuizz;


import com.example.intermove.Entities.Domain;
import com.example.intermove.Entities.SkillsAndQuizz.SkillDTO;
import com.example.intermove.Entities.SkillsAndQuizz.Skills;

import java.util.List;

public interface ISkillsService {

    public void addSkillsToUser(Skills skills,int id);
    public void removeSkills(Integer id);
    public Skills updateSkills(Skills skills,Integer id) ;
    public Skills retrieveSkills(Integer  id);

    List<Skills> searchSkills(String description);
    public List<SkillDTO> findSkillsWithUserAndQuizzNames();
    public List<SkillDTO> getOffreByDomain(Domain domain);

}
