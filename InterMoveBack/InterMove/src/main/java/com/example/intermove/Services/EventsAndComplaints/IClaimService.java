package com.example.intermove.Services.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.Claim;
import com.example.intermove.Entities.EventsAndComplaints.Events;

import java.util.List;

public interface IClaimService {
    public Claim addClaim(Claim claim , int id) ;
    public List<Claim> getAllComplaints();


    public Claim getComplaintsById(Integer id);
    public void deleteComplaints(Integer id);
    Claim UpdateClaim (Claim E , Integer id);
   public List<Claim> getClaimsByStatus(Boolean status);
  public List<Claim> findAll() ;



    public void updateStatus(int id, boolean newValue) ;
    public List<MostComplainer> mostComplainer() ;
    public List<DuplicateComplainers> duplicateComplainers();
    public Claim findById(Integer id);
}
