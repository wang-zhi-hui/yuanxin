package com.yuanxin.customview;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;
import com.yuanxin.YuanXinApplication;
import com.yuanxin.common.YuanXinCommon;

/**
 * Created by lemon on 16/4/30.
 */
public class YuanXinWebViewMessage extends ReactContextBaseJavaModule {
    public YuanXinWebViewMessage(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "YuanXinWebViewMessage";
    }

    @ReactMethod
    public void sendMessage(final String message) {
        System.out.println(message);
        WebViewMessageBean webViewMessageBean = new Gson().fromJson(message, WebViewMessageBean.class);
        if (webViewMessageBean.getType() != 5) {
            if (YuanXinApplication.getInstance().getWebView() != null) {
                YuanXinApplication.getInstance().getWebView().post(new Runnable() {
                    @Override
                    public void run() {
                        String script = "javascript:WebViewBridge.onMessage('" + message + "');";
                        YuanXinApplication.getInstance().getWebView().loadUrl(script);
                    }
                });
            }
        } else {
            Intent i = new Intent(Intent.ACTION_GET_CONTENT);
            i.addCategory(Intent.CATEGORY_OPENABLE);
            i.setType("image/*");
            getCurrentActivity().startActivityForResult(
                    Intent.createChooser(i, "sd"),
                    YuanXinCommon.ActivityForResultCode.FILECHOOSER_RESULTCODE);
        }


    }
}
