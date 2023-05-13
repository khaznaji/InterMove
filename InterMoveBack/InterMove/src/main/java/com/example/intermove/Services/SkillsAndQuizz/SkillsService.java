package com.example.intermove.Services.SkillsAndQuizz;


import com.example.intermove.Entities.Domain;
import com.example.intermove.Entities.SkillsAndQuizz.SkillDTO;
import com.example.intermove.Entities.SkillsAndQuizz.Skills;
import com.example.intermove.Entities.User.User;
import com.example.intermove.Repositories.SkillsAndQuizz.SkillsRepository;
import com.example.intermove.Repositories.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillsService implements ISkillsService {

    @Autowired
    SkillsRepository SkillsRep;
    @Autowired
    UserRepository userRepository;


    @Override
    public void addSkillsToUser(Skills skills, int id){
        User user = userRepository.findById(id).orElse(null);
        skills.setUser(user);
        SkillsRep.save(skills);

    }



    public List<SkillDTO> findSkillsWithUserAndQuizzNames() {
        List<Object[]> skillObjects = SkillsRep.findSkillsWithUserAndQuizzNames();
        List<SkillDTO> skillDTOs = new ArrayList<>();
        for (Object[] skillObject : skillObjects) {
            SkillDTO skillDTO = new SkillDTO();
            skillDTO.setId((int) skillObject[0]);
            skillDTO.setDescription((String) skillObject[1]);
            skillDTO.setDomain((Domain) skillObject[2]);
            skillDTO.setUser((String) skillObject[3]);
            skillDTO.setQuiz((String) skillObject[4]);
            skillDTOs.add(skillDTO);
        }
        return skillDTOs;
    }

    @Override
    public Skills retrieveSkills(Integer  id){
        return SkillsRep.findById(id).get();
    }

    @Override
    public List<Skills> searchSkills(String description) {
        return SkillsRep.searchSkills(description);    }



    @Override
    public void removeSkills(Integer id){
        Skills s=retrieveSkills(id);
        SkillsRep.delete(s);


    }

@Override
    public Skills updateSkills(Skills skills, Integer id) {

        skills.setId(id);

        return SkillsRep.save(skills);

    }
    private SkillDTO mapToDTO(final Skills skills,
                              final SkillDTO skillDTO) {
        skillDTO.setId(skills.getId());
        skillDTO.setDescription(skills.getDescription());
        skillDTO.setDomain(skills.getDomain());
        skillDTO.setUser(skills.getUser().getLastname());
        skillDTO.setQuiz(skills.getQuiz().getNom());





        //   offerDTO.setUserSell(sellerOffer.getUser() == null ? null : sellerOffer.getUser().getUserid());
        return skillDTO;
    }
    @Override
    public List<SkillDTO> getOffreByDomain(Domain domain) {

        final List<Skills> sellerOffers = SkillsRep.findByDomain(domain);
        return sellerOffers.stream()
                .map((sellerOffer) -> mapToDTO(sellerOffer, new SkillDTO()))
                .collect(Collectors.toList());
    }

}
