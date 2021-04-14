package demo.Controller;

import demo.BackendApplication;
import demo.Model.TokenHolder;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.stream.Collectors;

@EnableConfigurationProperties
@EnableScheduling
@Configuration
@EnableAutoConfiguration
@ComponentScan
public class TokenController {

    private TokenHolder tokenHolder;
    private RestTemplate restTemplate;
    private JSONParser jsonParser;

    @Autowired
    public TokenController(TokenHolder tokenHolder, RestTemplate restTemplate,JSONParser jsonParser) {
        this.tokenHolder = tokenHolder;
        this.restTemplate = restTemplate;
        this.jsonParser = jsonParser;
    }

    private String getToken() throws ParseException {
        String[] credentials = getCredentialsFromStream(
                getFileFromResourceAsStream("accessInfo.txt"));

        String clientId = credentials[0];
        String clientSecret = credentials[1];

        String url = "https://us.battle.net/oauth/token";
        String requestJson = "grant_type=client_credentials&client_id="
                + clientId + "&client_secret=" + clientSecret;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);
        String answer = restTemplate.postForObject(url, entity, String.class);
        JSONObject json = (JSONObject) jsonParser.parse(answer);
        return (String) json.get("access_token");

    }

    private InputStream getFileFromResourceAsStream(String fileName) {

        ClassLoader classLoader = BackendApplication.class.getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(fileName);

        if (inputStream == null) {
            throw new IllegalArgumentException("file not found! " + fileName);
        } else {
            return inputStream;
        }

    }

    private String[] getCredentialsFromStream(InputStream is) {
        String result = new BufferedReader(new InputStreamReader(is))
                .lines().collect(Collectors.joining("\n"));
        return result.split("\\r?\\n");
    }

    @EventListener(ApplicationReadyEvent.class)
    public void assignTokenAtStartup() throws ParseException {
        this.tokenHolder.setToken(getToken());
        this.tokenHolder.setCreated(LocalDate.now());
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void updateTokenEveryDay() throws ParseException {
        this.tokenHolder.setToken(getToken());
        this.tokenHolder.setCreated(LocalDate.now());

    }
}
