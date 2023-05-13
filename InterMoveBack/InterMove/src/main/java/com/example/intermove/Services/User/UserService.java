package com.example.intermove.Services.User;


import com.example.intermove.Entities.User.User;
import com.example.intermove.Repositories.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByemail(username);
        return UserDetailsImpl.build(user);}

    @Transactional
    public void addUser(User user){
        userRepository.save(user);
    }

    public void deletePatient(Integer id) {
        userRepository.deleteById(id);
    }
    public boolean ifEmailExist(String email){
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public int getUserActive(String email){
        return userRepository.getActive(email);
    }

    @Transactional
    public String getPasswordByEmail(String email){
        return userRepository.getPasswordByEmail(email);
    }

    public User getUserByMail(String mail){
        return this.userRepository.findByemail(mail);
    }
    public void editUser(User user){
        this.userRepository.save(user);
    }


    private Set getAuthority(User user) {
        return null ;
    }

    public User updateUser(User user) {
        Integer id = user.getUserid();
        User std = userRepository.findById(id).get();
        std.setCin(user.getCin());
        std.setFirstname(user.getFirstname());
        std.setLastname(user.getLastname());
        std.setEmail(user.getEmail());
        //std.setBadge(user.getBadge());
        //std.setAddress(user.getAddress());
        std.setPhone(user.getPhone());
       // std.setProfilepicture(user.getProfilepicture());
     //   std.setActive(user.getActive());

        return userRepository.save(std);
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> retrieveAllUsers(){
        return (List<User>) userRepository.findAll();
    }
    public User retrieveUserById(Integer userid){
        return userRepository.findById(userid).orElse(null);
    }

}
