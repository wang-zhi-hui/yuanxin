package com.yuanxin.localtool;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.yuanxin.MainActivity;
import com.yuanxin.customutil.CustomConstant;
import com.yuanxin.customutil.LocalUtil;
import com.yuanxin.imagechoosemodule.MultiImageSelectorActivity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/3/10.
 */
public class LocalImageChooseModule extends ReactContextBaseJavaModule implements ImageResultCallback{


    private ArrayList<String> mSelectPath;
    private static final int REQUEST_IMAGE = 2;
    public LocalImageChooseModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "LocalImageChoose";
    }

    @ReactMethod
    public void choose(int total,boolean isCut,String tag)
    {


        LocalUtil.putStorageData(getCurrentActivity(), CustomConstant.tag,tag);
        int selectedMode=MultiImageSelectorActivity.MODE_MULTI;
        if (isCut)
        {
            selectedMode = MultiImageSelectorActivity.MODE_SINGLE;
        }else {
            selectedMode=MultiImageSelectorActivity.MODE_MULTI;
        }
//        mSelectPath=((MainActivity)getCurrentActivity()).mSelectPath;
        Intent intent = new Intent(getCurrentActivity(), MultiImageSelectorActivity.class);
        // 是否显示拍摄图片
        intent.putExtra(MultiImageSelectorActivity.EXTRA_SHOW_CAMERA, true);
        // 最大可选择图片数量
        intent.putExtra(MultiImageSelectorActivity.EXTRA_SELECT_COUNT, total);
        // 选择模式
        intent.putExtra(MultiImageSelectorActivity.EXTRA_SELECT_MODE, selectedMode);

        // 默认选择
        if(mSelectPath != null && mSelectPath.size()>0){
            intent.putExtra(MultiImageSelectorActivity.EXTRA_DEFAULT_SELECTED_LIST, mSelectPath);
        }
        getCurrentActivity().startActivityForResult(intent, REQUEST_IMAGE);
    }

    public void sendEvent(ReactContext reactContext,
                          String eventName,
                          @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public void meature(WritableMap writableMap) {
        sendEvent(this.getReactApplicationContext(), "ImageCapture", writableMap);
    }

}
