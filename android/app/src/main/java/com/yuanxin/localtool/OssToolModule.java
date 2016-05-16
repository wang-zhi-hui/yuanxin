package com.yuanxin.localtool;

import android.support.annotation.Nullable;
import android.util.Log;
import android.webkit.HttpAuthHandler;
import com.alibaba.sdk.android.oss.ClientException;
import com.alibaba.sdk.android.oss.ServiceException;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.yuanxin.alioss.CallBackBean;
import com.yuanxin.alioss.OssAsynCallBack;
import com.yuanxin.alioss.OssTool;
import com.yuanxin.alioss.UploadBean;
import com.yuanxin.customutil.CustomConstant;
import com.yuanxin.customutil.LocalUtil;
import com.yuanxin.imagechoosemodule.utils.TimeUtils;
import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/16.
 */
public class OssToolModule extends ReactContextBaseJavaModule {


//    private String bucket="yuanxinapp";
    private OssTool ossTool;
    private long totalFileSize=0;
    private long curentFileSize=0;
    private int current=0,total;
    private ArrayList<CallBackBean> mapArrayList;
    private ReactContext reactContext;
    private Gson gson;
    public OssToolModule(ReactApplicationContext reactContext) {
        super(reactContext);
        ossTool=new OssTool(reactContext);
        gson=new Gson();
        this.reactContext=reactContext;
    }

    @Override
    public String getName() {
        return "OssTool";
    }


    /**
     * downlaod file
     * @param bucket
     * @param object
     * @param tag
     * @param callback
     */
    @ReactMethod
    public void download( String bucket,String object,final  String tag,final  Callback callback)
    {
        ossTool.download(bucket, object, new OssAsynCallBack() {
            @Override
            public void success(CallBackBean map) {
                map.setTag( tag);

                callback.invoke(gson.toJson(map));
            }

            @Override
            public void failure(CallBackBean map) {
                map.setTag(tag);

                callback.invoke(gson.toJson(map));
            }
            @Override
            public void onUploading(CallBackBean map) {
                map.setTag(tag);

                callback.invoke(gson.toJson(map));
            }
        });
    }

    /**
     * upload file,if file is pic,compress meature
     * @param uploadObject
     */
    @ReactMethod
    public void multiUpload(  final String uploadObject)
    {

        Log.i("IMAGE", uploadObject);
        final List<Map> uploadFilePaths = gson.fromJson(uploadObject,List.class);

        mapArrayList=new ArrayList<>();

        for (int j=0;j<uploadFilePaths.size();j++)
        {
            totalFileSize+=new File((String) uploadFilePaths.get(j).get(UploadBean.getInstance().getFilePath())).length();
            total+=1;
        }
        for (int i=0;i<uploadFilePaths.size();i++) {
            final int tagIndex=i;
            ossTool.picMultipartUpload(UploadBean.getInstance().getBucket(), uploadFilePaths.get(i).get(UploadBean.getInstance().getOssFolder())+"/"+ TimeUtils.formatPhotoDate(new Date().getTime())+ LocalUtil.formatFileNamme((String) uploadFilePaths.get(i).get(UploadBean.getInstance().getFilePath())), (String)uploadFilePaths.get(i).get(UploadBean.getInstance().getFilePath()), new OssAsynCallBack() {
                @Override
                public void success(CallBackBean map) {

                    current+=1;
                    map.setTag((String) (uploadFilePaths.get(tagIndex).get(UploadBean.getInstance().getTag())));
                    map.setFileType((String) uploadFilePaths.get(tagIndex).get(UploadBean.getInstance().getFileType()));
                    map.setSortNo( String.valueOf(uploadFilePaths.get(tagIndex).get(UploadBean.getInstance().getSortNo())));
                    mapArrayList.add(map);
                    if (current>=total) {
                        Log.i("IMAGE", "success--" + gson.toJson(mapArrayList));
                        WritableMap writableMap= Arguments.createMap();
                        writableMap.putString("data",gson.toJson(mapArrayList));
                        writableMap.putString("status", "success");
                        sendEvent(reactContext, "finish", writableMap);
//                        callback.invoke(gson.toJson(mapArrayList));
                    }

                }

                @Override
                public void failure(CallBackBean map) {
                    map.setTag((String) (uploadFilePaths.get(tagIndex).get(UploadBean.getInstance().getTag())));

                    Log.i("IMAGE", "failure--" + gson.toJson(map));
                    WritableMap writableMap= Arguments.createMap();
                    writableMap.putString("data",gson.toJson(map));
                    writableMap.putString("status", "failure");
                    sendEvent(reactContext, "finish", writableMap);
//                    callback.invoke(gson.toJson(map));
                }

                @Override
                public void onUploading(CallBackBean map) {

                    curentFileSize+=(long)map.getCurrentSize();


                    map.setTag((String) (uploadFilePaths.get(tagIndex).get(UploadBean.getInstance().getTag())));
                    map.setPersent((int) (curentFileSize / totalFileSize * 100) + "%");
                    Log.i("IMAGE", "onUploading--" + gson.toJson(map));
                    WritableMap writableMap= Arguments.createMap();
                    writableMap.putString("status","onUploading");
                    writableMap.putString("data", gson.toJson(map));
                    sendEvent(reactContext, "finish", writableMap);
//                    callback.invoke(gson.toJson(map));
                }
            });
        }
    }
    public void sendEvent(ReactContext reactContext,
                          String eventName,
                          @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
