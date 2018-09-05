package com.luohw.springboot.util;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;

import java.io.IOException;
import java.util.Map;

public class HttpClientUtil {
    private static volatile CloseableHttpClient httpClientPool;

    private static PoolingHttpClientConnectionManager connectionManager = null;
    private static HttpClientBuilder httpBulder = null;
    private static RequestConfig requestConfig = null;
    private static int MAXCONNECTION = 200;
    static{
        requestConfig = RequestConfig.custom()
                .setSocketTimeout(5000)
                .setConnectTimeout(5000)
                .setConnectionRequestTimeout(5000)
                .build();

        connectionManager = new PoolingHttpClientConnectionManager();
        connectionManager.setMaxTotal(MAXCONNECTION);
        connectionManager.setDefaultMaxPerRoute(connectionManager.getMaxTotal());
        httpBulder = HttpClients.custom();
        httpBulder.setConnectionManager(connectionManager);
        httpClientPool = httpBulder.build();
    }

    public static HttpResponse post(String url, Map<String,String> headerMap, HttpEntity httpEntity){
        HttpPost httpPost = new HttpPost(url);
        HttpResponse response = null;
        if (headerMap != null) {
            for (String key : headerMap.keySet()) {
                httpPost.setHeader(key, headerMap.get(key));
            }
        }
        httpPost.setEntity(httpEntity);
        try {
            response=httpClientPool.execute(httpPost);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return response;
    }

    public static HttpResponse get(String url, Map<String,String> headerMap) throws IOException {
        HttpGet httpGet = new HttpGet(url);
        if (headerMap != null) {
            for (String key : headerMap.keySet()) {
                httpGet.setHeader(key, headerMap.get(key));
            }
        }
        return httpClientPool.execute(httpGet);
    }
}
