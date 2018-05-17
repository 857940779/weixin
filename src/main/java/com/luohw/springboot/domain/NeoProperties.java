package com.luohw.springboot.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by luohw on 2018/5/2 0002.
 */
//声明为组件，可以直接注入
@Component
public class NeoProperties {

    @Value("${com.neo.title}")
    private String title;
    @Value("${com.neo.description}")
    private String description;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
