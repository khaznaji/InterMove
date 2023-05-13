package com.example.intermove.Repositories.User;

import com.example.intermove.Entities.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    public User findByemail(String email);

    public boolean existsByEmail(String email);

    @Query("select u.active from User u where u.email=?1")
    public int getActive(String email);

    @Query("select u.password from User u where u.email=?1")
    public String getPasswordByEmail(String email);

    //@Query("SELECT u FROM User u JOIN u.userRoles r WHERE r.roleName = 'Patient'")
   // List<User> findAllPatients();


}

