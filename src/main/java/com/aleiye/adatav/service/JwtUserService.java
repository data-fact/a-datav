package com.aleiye.adatav.service;

import com.aleiye.adatav.entity.UserInfo;
import com.aleiye.adatav.exception.ApiException;
import com.aleiye.adatav.security.AccountUser;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Project_name: demo-jwt
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2021/2/23.
 * Description:
 * Modified By:
 */
public class JwtUserService implements UserDetailsService{

    private static final String ADMIN_NAME = "admin";

    @Autowired
    private CacheManager cacheManager;
    private Cache cache;

    @Autowired
    IUserInfoService userInfoService;

    private PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

    @PostConstruct
    public void postConstruct(){
         cache = cacheManager.getCache("userSalt");
    }

    public UserDetails getUserLoginInfo(DecodedJWT jwt) {
        String userId = jwt.getClaim("userId").asString();
        String inviteCode = jwt.getClaim("inviteCode").asString();
        String username = jwt.getSubject();
        Cache.ValueWrapper cacheValue = cache.get(username);
        if(cacheValue == null)
            return null;
        String salt = (String) cacheValue.get();
        /**
         * @todo ?????????????????????????????????jwt token???????????????salt
         * salt = redisTemplate.opsForValue().get("token:"+username);
         */
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        if(StringUtils.equals(ADMIN_NAME,username))
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        AccountUser user = new AccountUser(
            userId,
            username,
            salt,
            authorities
        );
        user.setInviteCode(inviteCode);
        return user;
//        UserDetails user = loadUserByUsername(username);
//        //???salt??????password????????????
//        return User.builder().username(user.getUsername()).password(salt).authorities(user.getAuthorities()).build();
    }

    public String saveUserLoginInfo(AccountUser account) {
//        String salt = BCrypt.gensalt(); //BCrypt.gensalt();  ?????????????????????????????????????????????????????????salt
        String salt = String.valueOf(UUID.randomUUID());
        /**
         * @todo ???salt?????????????????????????????????
         * redisTemplate.opsForValue().set("token:"+username, salt, 3600, TimeUnit.SECONDS);
         */
        cache.put(account.getUsername(),salt);
        Algorithm algorithm = Algorithm.HMAC256(salt);
        long day = 24 * 60 * 60 * 1000;
        if(account.getRemember() != null && account.getRemember())
            day *= 7;
        Date date = new Date(System.currentTimeMillis() + day);  //??????24???????????????
        return JWT.create()
                .withClaim("userId",account.getUserId())
                .withClaim("inviteCode",account.getInviteCode())
                .withSubject(account.getUsername())
                .withExpiresAt(date)
                .withIssuedAt(new Date())
                .sign(algorithm);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo userInfo = null;
        try {
            userInfo = userInfoService.getUserByUserName(username);
        } catch (ApiException e) {
            throw new UsernameNotFoundException("????????????????????????");
        }
        if(userInfo == null)
            throw new UsernameNotFoundException("????????????????????????");
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        if(StringUtils.equals(ADMIN_NAME,username))
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        AccountUser user = new AccountUser(
            userInfo.getId(),
            userInfo.getUserName(),
            userInfo.getPassword(),
            authorities
        );
        user.setCreateTime(userInfo.getCreateTime());
        return user;
    }

    public void createUser(String username, String password) {
        String encryptPwd = passwordEncoder.encode(password);
        /**
         * @todo ?????????????????????????????????????????????
         */
    }

    public void deleteUserLoginInfo(String username) {
        /**
         * @todo ????????????????????????????????????salt
         */
        cache.evict(username);
    }
}
