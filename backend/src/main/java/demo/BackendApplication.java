package demo;


import org.json.simple.parser.ParseException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableConfigurationProperties
@EnableScheduling
@RestController
public class BackendApplication {

    public static void main(String[] args) throws ParseException {
        SpringApplication.run(BackendApplication.class, args);
    }

}

