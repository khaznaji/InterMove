package com.example.intermove.Controllers.User;

import com.example.intermove.Entities.User.roletype;
import com.example.intermove.Payload.JwtLogin;
import com.example.intermove.Payload.LoginResponse;
import com.example.intermove.Payload.TokenDto;
import com.example.intermove.Services.User.TokenService;
import com.example.intermove.Services.User.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;

// http://localhost:8080
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/social")
// http://localhost:8080/social
public class SocialController {

    @Value("google.id")
    private String idClient;

    private UserService userService;
    private TokenService tokenService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public SocialController(UserService userService, TokenService tokenService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    //http://localhost:8080/social/google
    @PostMapping("/google")
    public LoginResponse loginWithGoogle(@RequestBody TokenDto tokenDto) throws IOException {
        NetHttpTransport transport = new NetHttpTransport();
        JacksonFactory factory = JacksonFactory.getDefaultInstance();
        GoogleIdTokenVerifier.Builder ver =
                new GoogleIdTokenVerifier.Builder(transport,factory)
                        .setAudience(Collections.singleton(idClient));
        GoogleIdToken googleIdToken = GoogleIdToken.parse(ver.getJsonFactory(),tokenDto.getToken());
        GoogleIdToken.Payload payload = googleIdToken.getPayload();
        return login(payload.getEmail());
    }

    //http://localhost:8080/social/facebook
    @PostMapping("/facebook")
    public LoginResponse loginWithFacebook(@RequestBody TokenDto tokenDto){
        Facebook facebook = new FacebookTemplate(tokenDto.getToken());
        String [] data = {"email","name","picture"};
        User userFacebook = facebook.fetchObject("me",User.class,data);
        return login(userFacebook.getEmail());

    }

    private LoginResponse login(String email){
        boolean result = userService.ifEmailExist(email); // t   // f
        if(!result){
            com.example.intermove.Entities.User.User user = new com.example.intermove.Entities.User.User();
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode("farouk"));
            user.setActive(1);
            user.setRoletype(roletype.USER);
            userService.addUser(user);
        }
        JwtLogin jwtLogin = new JwtLogin();
        jwtLogin.setEmail(email);
        jwtLogin.setPassword("farouk");
        return tokenService.login(jwtLogin);
    }
}
