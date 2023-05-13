package com.example.intermove.Services.EventsAndComplaints;


import com.example.intermove.Services.User.UserService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.util.Arrays;

@Service
public class TwillioServiceImpl implements TwillioService {
	
	@Value("${twillio.accountSID}")
	private String ACCOUNT_SID;
	
	@Value("${twillio.authToken}")
	private String AUTH_TOKEN;
	
	@Override
	public void sendSms(String to,String from,String body) {
		
		try {
		 Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	        Message message = Message.creator( new PhoneNumber(to), new PhoneNumber(from),body) // to:to which no  you want to send sms           
	            .setMediaUrl(Arrays.asList(URI.create("https://demo.twilio.com/owl.png")))     // from: twillio given phone no
	            .setStatusCallback(URI.create("http://demo.twilio.com/docs/voice.xml"))                      // body : text message
	            .create();

	        System.out.println(message);
	        System.out.println(message.getSid());

		}catch(Exception e) {
			
			e.printStackTrace();
			
		}
		
	}




	@Autowired
	private UserService userService;

	public void makeCall(String to, String message) {
		try {
			Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
			String confirmationMessage = message;
			String encodedTwiml = URLEncoder.encode( confirmationMessage , "UTF-8");
			String url = "http://twimlets.com/message?Message%5B0%5D=" + encodedTwiml;

			Call.creator(
					new PhoneNumber(to),
					new PhoneNumber("15075288337"),
					new URI(url)
			).create();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}


}















