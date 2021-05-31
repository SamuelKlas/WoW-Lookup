package demo.Controller;

import demo.Model.ConduitPair;
import demo.Model.CovenantData;
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

import java.util.ArrayList;
import java.util.List;




@RestController
@RequestMapping("/{region}/{realmSlug}/{name}")
@CrossOrigin(origins = "*")
public class DataController {

    private TokenHolder tokenHolder;
    private RestTemplate restTemplate;
    private ImageDownloader imageDownloader;

    @Autowired
    public DataController(TokenHolder tokenHolder, RestTemplate restTemplate, ImageDownloader imageDownloader) {
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

    @GetMapping("/character-media")
    public String getCharacterMedia(@PathVariable String region, @PathVariable String realmSlug, @PathVariable String name) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/character-media"+ getLocale();
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
                             @PathVariable String realmSlug, @PathVariable String name, @PathVariable String encounterType) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/encounters/" + encounterType + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @GetMapping("/equipment")
    public String getEquipmentData(@PathVariable String region,
                                   @PathVariable String realmSlug, @PathVariable String name) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/equipment" + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    @GetMapping("/talents")
    public String getTalentData(@PathVariable String region,
                                @PathVariable String realmSlug, @PathVariable String name) {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/specializations" + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    public String getActiveSoulBind(String region,
                                        String realmSlug, String name) throws ParseException {
        HttpEntity<String> entity = makeBaseHttpEntity(region);
        String url = getBaseUrl(region, realmSlug, name) + "/soulbinds" + getLocale();
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        JSONParser jsonParser = new JSONParser();
        JSONObject json = (JSONObject) jsonParser.parse(response.getBody());
        JSONArray soulbinds = (JSONArray) json.get("soulbinds");


        JSONObject activeSoublind = null;
        for (int i = 0; i < soulbinds.size(); i++) {
            JSONObject soulbind = (JSONObject) soulbinds.get(i);
            Boolean isActive = (Boolean) soulbind.get("is_active");
            if (isActive != null) {
                activeSoublind = soulbind;
            }

        }

        return activeSoublind.toString();
    }

    public List<Long> parseSoulbindForTraits( String region,
                                              String realmSlug,  String name) throws ParseException {
        List<String> urls = new ArrayList<>();
        String soulBindString= getActiveSoulBind(region, realmSlug, name);
        JSONParser jsonParser = new JSONParser();
        JSONObject activeSoulBind = (JSONObject) jsonParser.parse(soulBindString);
        JSONArray traits = (JSONArray) activeSoulBind.get("traits");

        for (int i = 0; i < traits.size(); i++) {
            JSONObject element = (JSONObject) traits.get(i);
            JSONObject trait = (JSONObject) element.get("trait");
            if (trait != null) {
                JSONObject key = (JSONObject) trait.get("key");
                String href = key.get("href").toString();
                urls.add(href);
            }

        }
        List<Long> ids = new ArrayList<>();
        for (int i = 0; i < urls.size() ; i++) {
            ids.add(getSoulbindTraitId(urls.get(i)));
        }
        return ids;
    }

    public String getCovenantFromSoulbind(String soulbind){
        String ret = "";
        switch(soulbind){
            case "Pelagos" : case "Kleia" : case "Forgelite Prime Mikanikos":
                ret = "Kyrian";
                break;
            case "Plague Deviser Marileth": case "Emeni" : case "Bonesmith Heirmir":
                ret = "Necrolord";
                break;
            case "Niya" : case "Dreamweaver" : case "Korayn":
                ret = "Night Fae";
                break;
            case "Theotar the Mad Duke": case "Nadjia the Mistblade": case "General Draven":
                ret = "Venthyr";
                break;

        }
        return ret;

    }

    public List<ConduitPair> parseSoulbindForConduits( String region,
                                                       String realmSlug,  String name) throws ParseException {
        List<ConduitPair> pairs = new ArrayList<>();
        List<String> urls = new ArrayList<>();
        List<Long> ranks = new ArrayList<>();
        String soulBindString= getActiveSoulBind(region, realmSlug, name);
        JSONParser jsonParser = new JSONParser();
        JSONObject activeSoulBind = (JSONObject) jsonParser.parse(soulBindString);
        JSONArray traits = (JSONArray) activeSoulBind.get("traits");
        for (int i = 0; i < traits.size(); i++) {
            JSONObject element = (JSONObject) traits.get(i);
            JSONObject trait = (JSONObject) element.get("conduit_socket");
            if (trait != null) {
                trait = (JSONObject) trait.get("socket");
                long rank = (Long) trait.get("rank");
                trait = (JSONObject) trait.get("conduit");
                ranks.add(rank);
                trait = (JSONObject) trait.get("key");
                String href = trait.get("href").toString();
                urls.add(href);
            }

        }
        List<Long> ids = new ArrayList<>();
        for (int i = 0; i < urls.size() ; i++) {
            ids.add(getConduitId(urls.get(i)));
            pairs.add(new ConduitPair(getConduitId(urls.get(i)),getConduitItemLevelFromRank(ranks.get(i))));
        }
        return pairs;
    }


    @GetMapping("/covenant")
    public CovenantData parseSoulbind(@PathVariable String region,
                                      @PathVariable String realmSlug, @PathVariable String name) throws ParseException {

        List<ConduitPair>conduits = parseSoulbindForConduits(region, realmSlug, name);
        List<Long> traits = parseSoulbindForTraits(region, realmSlug, name);
        String soulBindString= getActiveSoulBind(region, realmSlug, name);
        JSONParser jsonParser = new JSONParser();
        JSONObject activeSoulBind = (JSONObject) jsonParser.parse(soulBindString);
        JSONObject soulBindName = (JSONObject) activeSoulBind.get("soulbind");
        String sName  = soulBindName.get("name").toString();
        String covenant = getCovenantFromSoulbind(sName);

        CovenantData data = new CovenantData(covenant,sName,traits,conduits);

        return data;



    }


    public long getSoulbindTraitId(String url) throws ParseException {
        HttpEntity<String> entity = makeBaseHttpEntity("us");
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        JSONParser jsonParser = new JSONParser();
        JSONObject json = (JSONObject) jsonParser.parse(response.getBody());
        JSONObject spellTooltip = (JSONObject) json.get("spell_tooltip");
        spellTooltip = (JSONObject) spellTooltip.get("spell");
        long ret = (Long) spellTooltip.get("id");
        return ret;
    }

    public long getConduitId(String url) throws ParseException {
        HttpEntity<String> entity = makeBaseHttpEntity("us");
        ResponseEntity<String> response
                = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        JSONParser jsonParser = new JSONParser();
        JSONObject json = (JSONObject) jsonParser.parse(response.getBody());
        JSONArray ranks = (JSONArray) json.get("ranks");
        JSONObject firstRank = (JSONObject) ranks.get(0);
        JSONObject spellToolTip = (JSONObject) firstRank.get("spell_tooltip");
        spellToolTip = (JSONObject) spellToolTip.get("spell");
        long ret = (Long) spellToolTip.get("id");

        return ret;
    }

    public long getConduitItemLevelFromRank(long rank){
        int [] itemLevels = {0,145,158,171,184,200,213,226,239,252};
        return itemLevels[(int)rank];
    }

}
