package demo.Controller;

import demo.Model.TokenHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/{region}/{realmSlug}/{name}")
@CrossOrigin(origins = "*")

public class RaiderIoDataController {
    private TokenHolder tokenHolder;
    private RestTemplate restTemplate;

    @Autowired
    public RaiderIoDataController(TokenHolder tokenHolder, RestTemplate restTemplate) {
        this.tokenHolder = tokenHolder;
        this.restTemplate = restTemplate;
    }

    private HttpEntity<String> makeBaseHttpEntity() {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return entity;
    }
    private String getBaseUrl() {
        return "https://raider.io/api/v1/characters/profile";
    }

    @GetMapping("/mythicPlus/raiderIO")
    public String getMythicPlusSeasonData(@PathVariable String region, @PathVariable String realmSlug, @PathVariable String name) {
        HttpEntity<String> entity = makeBaseHttpEntity();
        String url = getBaseUrl();
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("region", region)
                .queryParam("realm", realmSlug)
                .queryParam("name", name)
                .queryParam("fields","mythic_plus_best_runs");

        ResponseEntity<String> response
                = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        System.out.println(response.getBody());
        return response.getBody();
    }


}
