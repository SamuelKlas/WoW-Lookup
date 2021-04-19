package demo.Controller;

import demo.Model.ImageDownloader;
import demo.Model.TokenHolder;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
@RequestMapping("/equipment")
@CrossOrigin(origins = "http://localhost:3000")

public class EquipmentDataController {
    private TokenHolder tokenHolder;
    private RestTemplate restTemplate;
    private JSONParser jsonParser;
    private ImageDownloader imageDownloader;

    @Autowired
    public EquipmentDataController(TokenHolder tokenHolder, RestTemplate restTemplate,JSONParser jsonParser,ImageDownloader imageDownloader) {
        this.tokenHolder = tokenHolder;
        this.restTemplate = restTemplate;
        this.jsonParser = jsonParser;
        this.imageDownloader = imageDownloader;
    }

    private HttpEntity<String> makeBaseHttpEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + this.tokenHolder.getToken());
        headers.add("Battlenet-Namespace", "static-us");
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return entity;
    }

    private String getBaseUrl(String itemId) {
        return "https://us.api.blizzard.com/data/wow/media/item/"+itemId +"?locale=en_US";
    }


    @GetMapping("/media/{itemId}")
    public String getEquipmentMediaUrl(@PathVariable String itemId) throws ParseException, IOException {
        HttpEntity<String> entity = makeBaseHttpEntity();
        String url = getBaseUrl(itemId);
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        JSONParser jsonParser = new JSONParser();
        JSONObject json = (JSONObject) jsonParser.parse(response.getBody());
        JSONArray assets = (JSONArray) json.get("assets");
        JSONObject asset = (JSONObject) assets.get(0);
        String value = (String) asset.get("value");
        imageDownloader.writeImage(Integer.parseInt(itemId),value);
        return value;
    }
}
