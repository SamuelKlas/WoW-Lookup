package demo.Model;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class TokenHolder {

    private String token;
    private LocalDate created;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDate getCreated() {
        return created;
    }

    public void setCreated(LocalDate created) {
        this.created = created;
    }

}
