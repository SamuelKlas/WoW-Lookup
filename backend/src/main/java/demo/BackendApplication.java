package demo;


import demo.Model.ImageDownloader;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@SpringBootApplication
@EnableConfigurationProperties
@EnableScheduling
@RestController
public class BackendApplication {
    @Autowired ImageDownloader img;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);


    }
    @GetMapping("/yeet")
    public void yoted() throws IOException, ParseException {

        img.writeImages(new int[]{1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,117,118,119,120,121,122,123,124});
    }

}

