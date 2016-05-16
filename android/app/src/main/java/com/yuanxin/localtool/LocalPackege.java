package com.yuanxin.localtool;


import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.yuanxin.customview.CustomWebViewManager;
import com.yuanxin.customview.YuanXinWebViewMessage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2016/3/10.
 */
public class LocalPackege implements ReactPackage {


    public ImageResultCallback imageResultCallback;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        LocalImageChooseModule localImageChooseModule = new LocalImageChooseModule(reactContext);
        imageResultCallback = localImageChooseModule;
        modules.add(localImageChooseModule);
        modules.add(new OssToolModule(reactContext));
        modules.add(new YuanXinWebViewMessage(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {

        List<ViewManager> viewManagers = new ArrayList<>();
        viewManagers.add(new CustomWebViewManager());
        return viewManagers;

    }

}
