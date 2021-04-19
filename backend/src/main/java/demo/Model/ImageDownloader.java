package demo.Model;

import demo.Model.TokenHolder;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class ImageDownloader
{
    @Autowired
    private TokenHolder tokenHolder;
    @Autowired
    private RestTemplate restTemplate;





    public void writeImage(int id,String imgUrl) throws IOException {
        String path = "D:\\itemimages";
        BufferedImage image =null;
        URL url =new URL(imgUrl);
        // read the url
        image = ImageIO.read(url);

        ImageIO.write(image, "png",new File(path + "\\"+ id + ".png"));
    }

    public void writeImages(int [] ids) throws ParseException, IOException {
        List<Integer> failures = new ArrayList<>();
        String path = "D:\\itemimages";
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        for(int i = 0;i < ids.length;i++) {
            System.out.println(i);
            boolean failed = false;
            ResponseEntity<String> response = null;
            try {
                 response
                        = restTemplate.exchange("https://us.api.blizzard.com/data/wow/media/item/" + ids[i] + "?namespace=static-us&locale=en_US&access_token=" + this.tokenHolder.getToken(), HttpMethod.GET, entity, String.class);
            }catch(Exception e){
                failed = true;
                failures.add(ids[i]);
                System.out.println("WASNT ABLE TO RETRIEVE ID "+ ids[i]);

            }
            if (failed == true)continue;
            JSONParser jsonParser = new JSONParser();
            JSONObject json = (JSONObject) jsonParser.parse(response.getBody());
            JSONArray assets = (JSONArray) json.get("assets");
            JSONObject asset = (JSONObject) assets.get(0);
            String value = (String) asset.get("value");

            BufferedImage image =null;
            URL url =new URL(value);
            // read the url
            image = ImageIO.read(url);

            ImageIO.write(image, "png",new File(path + "\\"+ ids[i] + ".png"));
        }
        System.out.println(failures);




    }

    }
