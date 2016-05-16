package com.yuanxin.alioss;

import java.util.Map;

/**
 * Created by Administrator on 2016/3/16.
 */
public interface OssAsynCallBack {

    void success(CallBackBean map);
    void failure(CallBackBean map);
    void onUploading(CallBackBean map);
}
