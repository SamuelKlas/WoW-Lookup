package demo.Controller;

import demo.Model.ImageDownloader;
import demo.Model.TokenHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/{region}/{realmSlug}/{name}")
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {

    private TokenHolder tokenHolder;
    private RestTemplate restTemplate;
    private ImageDownloader imageDownloader;
    @Autowired
    public DataController(TokenHolder tokenHolder, RestTemplate restTemplate,ImageDownloader imageDownloader) {
        this.tokenHolder = tokenHolder;
        this.restTemplate = restTemplate;
        this.imageDownloader = imageDownloader;
    }

    private HttpEntity<String> makeBaseHttpEntity(String region) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + this.tokenHolder.getToken());
        headers.add("Battlenet-Namespace", "profile-" + region);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return entity;
    }

    private String getBaseUrl(String region, String realmSlug, String name) {
        return "https://" + region + ".api.blizzard.com/profile/wow/character/" + realmSlug + "/" + name;
    }

    private String getLocale() {
        return "?locale=en_GB";
    }


    @GetMapping("")
    public String getSummaryData(@PathVariable String region, @PathVariable String realmSlug, @PathVariable String name) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }


    /*pvpBracket == 2v2 || 3v3 || rbg*/
    @GetMapping("/pvp/{pvpBracket}")
    public String getPvPData(@PathVariable String region,
                             @PathVariable String realmSlug, @PathVariable String name, @PathVariable String pvpBracket) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/pvp-bracket/" + pvpBracket + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    /*encounterType == dungeons || raids*/
    @GetMapping("/encounters/{encounterType}")
    public String getPveData(@PathVariable String region,
                             @PathVariable String realmSlug, @PathVariable String name,@PathVariable String encounterType) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/encounters/" + encounterType + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @GetMapping("/mythicPlusProfile")
    public String getMythicPlusProfileData(@PathVariable String region, @PathVariable String realmSlug, @PathVariable String name) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/mythic-keystone-profile" + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    /*Season 5 is the current ongoing season as of 16.04.2021*/
    @GetMapping("/mythicPlusProfile/season/{seasonId}")
    public String getMythicPlusSeasonData(@PathVariable String region, @PathVariable String realmSlug, @PathVariable String name,@PathVariable String seasonId) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/mythic-keystone-profile/season/" + seasonId + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        System.out.println(response.getBody());
        return response.getBody();
    }

    @GetMapping("/equipment")
    public String getEquipmentData(@PathVariable String region,
                             @PathVariable String realmSlug, @PathVariable String name) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/equipment"  + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @GetMapping("/equipment/media/{itemId}")
    public String getEquipmentMediaUrl(@PathVariable String region,
                                   @PathVariable String realmSlug, @PathVariable String name,@PathVariable String itemId) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = "https://us.api.blizzard.com/data/wow/media/item/19019?namespace=static-us&locale=en_US&access_token=US6DnRrogmXUeS9bxwgD7m41F8E7t1znVA";
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }


}
