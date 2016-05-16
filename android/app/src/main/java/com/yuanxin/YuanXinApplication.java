package com.yuanxin;

import android.app.Application;
import android.net.Uri;
import android.webkit.ValueCallback;
import android.webkit.WebView;

import com.facebook.react.bridge.ReactContext;

/**
 * Created by lemon on 16/4/29.
 */
public class YuanXinApplication extends Application {
    private static YuanXinApplication instance;

    private static WebView webView;

    private static ValueCallback<Uri[]> mUploadMessage;

    private static ValueCallback<Uri> uploadMessage1;

    /**
     * Called when the application is starting, before any activity, service,
     * or receiver objects (excluding content providers) have been created.
     * Implementations should be as quick as possible (for example using
     * lazy initialization of state) since the time spent in this function
     * directly impacts the performance of starting the first activity,
     * service, or receiver in a process.
     * If you override this method, be sure to call super.onCreate().
     */
    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
    }

    public static YuanXinApplication getInstance() {
        return instance;
    }

    public static WebView getWebView() {
        return webView;
    }

    public static void setWebView(WebView tempWebView) {
        webView = tempWebView;
    }

    public static void setUploadMessage(ValueCallback<Uri[]> tempUploadMessage) {
        mUploadMessage = tempUploadMessage;
    }

    public static ValueCallback<Uri[]> getUploadMessage() {
        return mUploadMessage;
    }

    public static void setUploadMessage1(ValueCallback<Uri> tempUploadMessage) {
        uploadMessage1 = tempUploadMessage;
    }

    public static ValueCallback<Uri> getUploadMessage1() {
        return uploadMessage1;
    }
}
