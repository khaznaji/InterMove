package com.example.intermove.Payload;

import com.example.intermove.Entities.User.roletype;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtSignup {
    private String email;
    private int cin;
    private String firstname;
    private String lastname;
    private String password;
    private String phone;
    private String address;
    private roletype Roletype;
    @Nullable
    private String profilepicture;
}
