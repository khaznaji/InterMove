package com.example.intermove.Services.User;

import com.example.intermove.Entities.User.User;
import com.example.intermove.Payload.JwtLogin;
import com.example.intermove.Payload.JwtProperties;
import com.example.intermove.Payload.LoginResponse;
import com.example.intermove.Repositories.User.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenService {
    private AuthenticationManager authenticationManager;
    private UserService userService;
    private UserRepository userRepository;
    @Value("${bezkoder.app.jwtSecret}")
    private String jwtSecret;
    @Autowired
    public TokenService(UserRepository userRepository,AuthenticationManager authenticationManager,UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService=userService;
        this.userRepository=userRepository;

    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }


    private String generateToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();


        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userPrincipal.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public LoginResponse login(JwtLogin jwtLogin) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtLogin.getEmail(),
                jwtLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        UserDetailsImpl userDetails = userService.loadUserByUsername(jwtLogin.getEmail());
        String newGeneratedToken = generateToken(authenticate);

        User user = userRepository.findByemail(jwtLogin.getEmail());
        String token = generateToken(authenticate);
        return new LoginResponse(user,jwtLogin.getEmail(),token);

    }
}
