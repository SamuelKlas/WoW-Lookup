package demo.Model;

import java.util.List;

public class CovenantData{
    String covenant;
    String soulbind;

    public String getCovenant() {
        return covenant;
    }

    public void setCovenant(String covenant) {
        this.covenant = covenant;
    }

    public String getSoulbind() {
        return soulbind;
    }

    public void setSoulbind(String soulbind) {
        this.soulbind = soulbind;
    }

    public List<Long> getSoulbinds() {
        return soulbinds;
    }

    public void setSoulbinds(List<Long> soulbinds) {
        this.soulbinds = soulbinds;
    }

    public List<ConduitPair> getConduits() {
        return conduits;
    }

    public void setConduits(List<ConduitPair> conduits) {
        this.conduits = conduits;
    }

    List<Long> soulbinds;
    List<ConduitPair> conduits;

    public CovenantData(String covenant, String soulbind, List<Long> soulbinds, List<ConduitPair> conduits) {
        this.covenant = covenant;
        this.soulbind = soulbind;
        this.soulbinds = soulbinds;
        this.conduits = conduits;
    }
}