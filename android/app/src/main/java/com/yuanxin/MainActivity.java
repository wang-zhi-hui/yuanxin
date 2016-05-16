package com.yuanxin;

import android.content.Intent;
import android.net.Uri;
import android.webkit.WebChromeClient;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.shell.MainReactPackage;
import com.google.gson.Gson;
import com.microsoft.codepush.react.CodePush;
import com.yuanxin.businessplatform.BuildConfig;
import com.yuanxin.common.YuanXinCommon;
import com.yuanxin.customutil.CustomConstant;
import com.yuanxin.customutil.LocalUtil;
import com.yuanxin.imagechoosemodule.MultiImageSelectorActivity;
import com.yuanxin.localtool.LocalPackege;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends ReactActivity {

    private static final int REQUEST_IMAGE = 2;
    public ArrayList<String> mSelectPath;
    private LocalPackege localPackege;

    @javax.annotation.Nullable
    @Override
    protected String getJSBundleFile() {
        return CodePush.getBundleUrl();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "YuanXin";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        List<ReactPackage> reactPackages = new ArrayList<>();
        reactPackages.add(new MainReactPackage());
        localPackege = new LocalPackege();
        reactPackages.add(localPackege);
        reactPackages.add(new CodePush("VJqDQ8m-gGQG51d3k3fs0BKjSbuBVyk97A8Ce", this, BuildConfig.DEBUG));
        return reactPackages;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mSelectPath = new ArrayList<>();
        if (requestCode == REQUEST_IMAGE) {
            if (resultCode == RESULT_OK) {
                mSelectPath = data.getStringArrayListExtra(MultiImageSelectorActivity.EXTRA_RESULT);
                WritableMap writableMap = Arguments.createMap();
                writableMap.putString("data", new Gson().toJson(mSelectPath));
                if (LocalUtil.getStorageData(this, CustomConstant.tag) != null) {
                    writableMap.putString("tag", LocalUtil.getStorageData(this, CustomConstant.tag));
                    LocalUtil.clearStorageData(this, CustomConstant.tag);
                }
                localPackege.imageResultCallback.meature(writableMap);
            }
        } else if (requestCode == YuanXinCommon.ActivityForResultCode.FILECHOOSER_RESULTCODE) {
            if (YuanXinApplication.getInstance().getUploadMessage() != null) {
                YuanXinApplication.getInstance().getUploadMessage().onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
                YuanXinApplication.getInstance().setUploadMessage(null);
            } else if (YuanXinApplication.getInstance().getUploadMessage1() != null) {
                Uri result = data == null || resultCode != RESULT_OK ? null
                        : data.getData();
                YuanXinApplication.getInstance().getUploadMessage1().onReceiveValue(result);
                YuanXinApplication.getInstance().setUploadMessage1(null);
            }
        }
    }
}
