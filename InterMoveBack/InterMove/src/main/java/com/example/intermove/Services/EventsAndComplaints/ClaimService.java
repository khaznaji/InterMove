package com.example.intermove.Services.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.Claim;
import com.example.intermove.Entities.EventsAndComplaints.Events;
import com.example.intermove.Entities.User.User;
import com.example.intermove.Repositories.EventsAndComplaints.ClaimRepository;
import com.example.intermove.Repositories.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service

public class ClaimService implements IClaimService{
    @Autowired
    ClaimRepository claimRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;
  @Override
  public Claim addClaim(Claim claim , int id) {
      User e = userRepository.findById(id).orElse(null);
     e.getComplaints().add(claim);
     claim.setUser(e);
      return claimRepository.save(claim);
         }
    public Claim save(Claim employee) {
        return claimRepository.save(employee);
    }
    @Override
    public Claim findById(Integer id) {
        return claimRepository.findById(id).get() ;
    }


    @Override
    public List<Claim> getAllComplaints() {
        return (List<Claim>) claimRepository.findAll();
    }

    @Override
    public Claim getComplaintsById(Integer id) {
        return claimRepository.findById(id).get();
    }

    @Override
    public void deleteComplaints(Integer id) {
        claimRepository.deleteById(id);

    }
    @Override
    public List<Claim> findAll() {
        return   claimRepository.findAll() ;
    }




    @Override
        public Claim UpdateClaim(Claim E, Integer id) {
        E.setId(id);
        return claimRepository.save(E);     }

    @Override
    public List<Claim> getClaimsByStatus(Boolean status) {
        return claimRepository.findByStatus(status);
    }




    @Override

    public void updateStatus(int id, boolean newValue) {
        // Recherche de l'objet MyClass correspondant à l'identifiant "id"
        Claim myObject = claimRepository.findById(id).orElse(null);

        // Vérification que l'objet a été trouvé
        if (myObject != null) {
            // Modification de la propriété "property2"
            myObject.setStatus(newValue);
            claimRepository.save(myObject);
        }


}

    @Override
    public List<MostComplainer> mostComplainer() {
        return claimRepository.mostComplainer();

    }

    @Override
    public List<DuplicateComplainers> duplicateComplainers() {

            return claimRepository.getDuplicateComplainers();

    }
    public void sendEmail(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Claim");
        message.setText("Hello Miss/Sir  " + user.getLastname() + ",\n\nWe have just received your complaint. To talk in detail please join us on this link: http://localhost:8060/InterMove/Claim/room and in the channel please enter this code :"+ user.getUserid()+
                "NB: do not give the ID ROOM to anyone,\n InterMove");

        mailSender.send(message);
    }

}

