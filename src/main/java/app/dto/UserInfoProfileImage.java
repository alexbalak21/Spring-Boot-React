package app.dto;

import java.util.List;

public class UserInfoProfileImage {
    private Long id;
    private String name;
    private String email;
    private List<String> roles;
    private String createdAt;
    private String updatedAt;
    private String profileImage;

    public UserInfoProfileImage(UserInfo userInfo, String profileImage) {
        this.id = userInfo.getId();
        this.name = userInfo.getName();
        this.email = userInfo.getEmail();
        this.roles = userInfo.getRoles();
        this.createdAt = userInfo.getCreatedAt();
        this.updatedAt = userInfo.getUpdatedAt();
        this.profileImage = profileImage;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public List<String> getRoles() { return roles; }
    public String getCreatedAt() { return createdAt; }
    public String getUpdatedAt() { return updatedAt; }
    public String getProfileImage() { return profileImage; }
}
