package com.example.intermove.Controllers.User;


import com.example.intermove.Entities.User.Code;
import com.example.intermove.Entities.User.User;
import com.example.intermove.Entities.User.roletype;
import com.example.intermove.Payload.*;
import com.example.intermove.Repositories.User.UserRepository;
import com.example.intermove.Services.User.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

// http://localhost:8080/
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping
// http://localhost:8080/
public class UserController {

    private TokenService tokenService;
    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private EmailService emailService;
    private UserRepository userRepository;

    @Autowired
    public UserController( UserRepository userRepository,TokenService tokenService, UserService userService, PasswordEncoder passwordEncoder, EmailService emailService,PasswordEncoder encoder) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.userRepository = userRepository;

    }

    // http://localhost:8080/signin
    @PostMapping("/signin")
    public LoginResponse logIn(@RequestBody JwtLogin jwtLogin){
        return tokenService.login(jwtLogin);
    }

    @PutMapping("/updateUser")
    @Transactional
    public User updateStudent(@RequestBody User user) {
        return  userService.updateUser(user);
    }
    // http://localhost:8080/sigup
    @PostMapping("/signup")
    public AccountResponse createUser(@RequestBody JwtSignup jwtLogin){
        AccountResponse accountResponse = new AccountResponse();
        boolean result = userService.ifEmailExist(jwtLogin.getEmail());
        if(result){
            accountResponse.setResult(0);
        } else {
            String myCode = UserCode.getCode();
            User user = new User();
            user.setAddress(jwtLogin.getAddress());
            user.setEmail(jwtLogin.getEmail());
            user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
            user.setCin(jwtLogin.getCin());
            user.setFirstname(jwtLogin.getFirstname());
            user.setLastname(jwtLogin.getLastname());
            user.setPhone(jwtLogin.getPhone());
            user.setProfilepicture(jwtLogin.getProfilepicture());
            user.setRoletype(roletype.USER);
            user.setActive(0);
            Mail mail = new Mail(jwtLogin.getEmail(),myCode);
            emailService.sendCodeByMail(mail);
            Code code = new Code();
            code.setCode(myCode);
            user.setCode(code);
            userRepository.save(user);
            accountResponse.setResult(1);
        }
        return accountResponse;
    }


    // http://localhost:8080/active
    @PostMapping("/active")
    public UserActive getActiveUser(@RequestBody JwtLogin jwtLogin){
        String enPassword = userService.getPasswordByEmail(jwtLogin.getEmail());  // from DB
        boolean result = passwordEncoder.matches(jwtLogin.getPassword(),enPassword); // Sure
        UserActive userActive = new UserActive();
        if (result){
            int act = userService.getUserActive(jwtLogin.getEmail());
            if(act == 0){
                String code = UserCode.getCode();
                Mail mail = new Mail(jwtLogin.getEmail(),code);
                emailService.sendCodeByMail(mail);
                User user = userService.getUserByMail(jwtLogin.getEmail());
                user.getCode().setCode(code);
                userService.editUser(user);
            }
            userActive.setActive(act);
        } else {
            userActive.setActive(-1);
        }
        return userActive;
    }

    // http://localhost:8080/activated
    @PostMapping("/activated")
    public AccountResponse activeAccount(@RequestBody ActiveAccount activeAccount){
        User user = userService.getUserByMail(activeAccount.getMail());
        AccountResponse accountResponse = new AccountResponse();
        if(user.getCode().getCode().equals(activeAccount.getCode())){
            user.setActive(1);
            userService.editUser(user);
            accountResponse.setResult(1);
        } else {
            accountResponse.setResult(0);
        }
        return accountResponse;
    }
    @GetMapping("/retrieve-all-users")
    public List<User> fetchPatientList()
    {
        return userService.retrieveAllUsers();
    }

    // http://localhost:8080/checkEmail
    @PostMapping("/checkEmail")
    public AccountResponse resetPasswordEmail(@RequestBody ResetPassword resetPassword){
        User user = this.userService.getUserByMail(resetPassword.getEmail());
        AccountResponse accountResponse = new AccountResponse();
        if(user != null){
            String code = UserCode.getCode();
            Mail mail = new Mail(resetPassword.getEmail(),code);
            emailService.sendCodeByMail(mail);
            user.getCode().setCode(code);
            this.userService.editUser(user);
            accountResponse.setResult(1);
        } else {
            accountResponse.setResult(0);
        }
        return accountResponse;
    }

    // http://localhost:8080/resetPassword
    @PostMapping("/resetPassword")
    public AccountResponse resetPassword(@RequestBody NewPassword newPassword){
        User user = this.userService.getUserByMail(newPassword.getEmail());
        AccountResponse accountResponse = new AccountResponse();
        if(user != null){
            if(user.getCode().getCode().equals(newPassword.getCode())){
                user.setPassword(passwordEncoder.encode(newPassword.getPassword()));
                userService.addUser(user);
                accountResponse.setResult(1);
            } else {

                accountResponse.setResult(0);
            }
        } else {
            accountResponse.setResult(0);
        }
        return accountResponse;
    }

    @GetMapping("/username")
    public String getCurrentUserName(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
       /* List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());*/
        return
                userDetails.getUsername()+" "+userDetails.getId()+" "+userDetails.getEmail()
                ;
    }
    @DeleteMapping("/remove-user")
    @Transactional
    public void deleteStudent(@RequestParam Integer id) {
        userService.deletePatient(id);
    }

    @GetMapping("/retrieve-user/{user-id}")
    public ResponseEntity<User> getUserById(@PathVariable("user-id") Integer userid) {
        User u = userService.retrieveUserById(userid);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }



}
