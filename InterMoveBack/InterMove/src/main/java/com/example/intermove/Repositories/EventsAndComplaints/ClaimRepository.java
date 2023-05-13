package com.example.intermove.Repositories.EventsAndComplaints;

import com.example.intermove.Entities.EventsAndComplaints.Claim;
import com.example.intermove.Entities.EventsAndComplaints.Events;
import com.example.intermove.Services.EventsAndComplaints.DuplicateComplainers;
import com.example.intermove.Services.EventsAndComplaints.MostComplainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim,Integer> {
    List<Claim> findByStatus(boolean status);
    @Query(value="select users.lastname ,count(claim.id) occ from claim claim"
            + " left join user users on claim.id =users.userid"
            + " group by claim.id"
            + " Order by occ"
            + " DESC ",nativeQuery=true)

    public List<MostComplainer> mostComplainer();
    @Query(value="select distinct users.email , count(cmp.id) as doublon from user users left join claim cmp on users.userid=cmp.id group by (cmp.id) ",nativeQuery=true)
    public List<DuplicateComplainers> getDuplicateComplainers();
}
