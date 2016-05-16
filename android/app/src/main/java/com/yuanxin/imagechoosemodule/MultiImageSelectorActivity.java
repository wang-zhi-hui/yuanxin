package com.yuanxin.imagechoosemodule;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import com.yuanxin.businessplatform.R;
import com.yuanxin.imagechoosemodule.utils.FileUtils;
import com.yuanxin.imagechoosemodule.utils.TimeUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

/**
 * 多图选择
 * Created by Nereo on 2015/4/7.
 * Updated by nereo on 2016/1/19.
 */
public class MultiImageSelectorActivity extends FragmentActivity implements MultiImageSelectorFragment.Callback{

    /** 最大图片选择次数，int类型，默认9 */
    public static final String EXTRA_SELECT_COUNT = "max_select_count";
    /** 图片选择模式，默认多选 */
    public static final String EXTRA_SELECT_MODE = "select_count_mode";
    /** 是否显示相机，默认显示 */
    public static final String EXTRA_SHOW_CAMERA = "show_camera";
    /** 选择结果，返回为 ArrayList&lt;String&gt; 图片路径集合  */
    public static final String EXTRA_RESULT = "select_result";
    /** 默认选择集 */
    public static final String EXTRA_DEFAULT_SELECTED_LIST = "default_list";
    public static final int PIC_CUT=3;
    /** 单选 */
    public static final int MODE_SINGLE = 0;
    /** 多选 */
    public static final int MODE_MULTI = 1;

    private ArrayList<String> resultList = new ArrayList<>();
    private Button mSubmitButton;
    private int mDefaultCount;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_default);

        Intent intent = getIntent();
        mDefaultCount = intent.getIntExtra(EXTRA_SELECT_COUNT, 9);
        int mode = intent.getIntExtra(EXTRA_SELECT_MODE, MODE_MULTI);
        boolean isShow = intent.getBooleanExtra(EXTRA_SHOW_CAMERA, true);
        if(mode == MODE_MULTI && intent.hasExtra(EXTRA_DEFAULT_SELECTED_LIST)) {
            resultList = intent.getStringArrayListExtra(EXTRA_DEFAULT_SELECTED_LIST);
//            resultList=new ArrayList<>();
        }

        Bundle bundle = new Bundle();
        bundle.putInt(MultiImageSelectorFragment.EXTRA_SELECT_COUNT, mDefaultCount);
        bundle.putInt(MultiImageSelectorFragment.EXTRA_SELECT_MODE, mode);
        bundle.putBoolean(MultiImageSelectorFragment.EXTRA_SHOW_CAMERA, isShow);
        bundle.putStringArrayList(MultiImageSelectorFragment.EXTRA_DEFAULT_SELECTED_LIST, resultList);

        getSupportFragmentManager().beginTransaction()
                .add(R.id.image_grid, Fragment.instantiate(this, MultiImageSelectorFragment.class.getName(), bundle))
                .commit();

        // 返回按钮
        findViewById(R.id.btn_back).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setResult(RESULT_CANCELED);
                finish();
            }
        });

        // 完成按钮
        mSubmitButton = (Button) findViewById(R.id.commit);
        if(resultList == null || resultList.size()<=0){
            mSubmitButton.setText(R.string.action_done);
            mSubmitButton.setEnabled(false);
        }else{
            updateDoneText();
            mSubmitButton.setEnabled(true);
        }
        mSubmitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(resultList != null && resultList.size() >0){
                    // 返回已选择的图片数据
                    Intent data = new Intent();
                    data.putStringArrayListExtra(EXTRA_RESULT, resultList);
                    setResult(RESULT_OK, data);
                    finish();
                }
            }
        });
    }

    private void updateDoneText(){
        mSubmitButton.setText(String.format("%s(%d/%d)",
                getString(R.string.action_done), resultList.size(), mDefaultCount));
    }

    @Override
    public void onSingleImageSelected(String path) {
//        Intent data = new Intent();
//        resultList.add(path);
//        data.putStringArrayListExtra(EXTRA_RESULT, resultList);
//        setResult(RESULT_OK, data);
//        finish();
        Log.i("MultiActivity","onSingleImageSelected----"+path);
        startCropImageIntent(path);
    }

    @Override
    public void onImageSelected(String path) {
        if(!resultList.contains(path)) {
            resultList.add(path);
        }
        Log.i("MultiActivity", "onImageSelected----" + path);
        // 有图片之后，改变按钮状态
        if(resultList.size() > 0){
            updateDoneText();
            if(!mSubmitButton.isEnabled()){
                mSubmitButton.setEnabled(true);
            }
        }
    }

    @Override
    public void onImageUnselected(String path) {
        if(resultList.contains(path)){
            resultList.remove(path);
        }
        updateDoneText();
        // 当为选择图片时候的状态
        if(resultList.size() == 0){
            mSubmitButton.setText(R.string.action_done);
            mSubmitButton.setEnabled(false);
        }
    }

    @Override
    public void onCameraShot(File imageFile) {
        Log.i("MultiActivity","onCameraShot----"+imageFile);
        if(imageFile != null) {


            // notify system
            sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(imageFile)));
            Intent data = new Intent();
            resultList.add(imageFile.getAbsolutePath());
            data.putStringArrayListExtra(EXTRA_RESULT, resultList);
            setResult(RESULT_OK, data);

            finish();
        }
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        // TODO Auto-generated method stub

        if(requestCode == MultiImageSelectorFragment.REQUEST_CAMERA){
            if(resultCode == RESULT_OK) {
                if (MultiImageSelectorFragment.mTmpFile != null) {
                    if ( this!= null) {
                        onCameraShot(MultiImageSelectorFragment.mTmpFile);
                        Log.i("MultiActivity", "onCameraShot-onActivityResult---resultCode:"+resultCode + MultiImageSelectorFragment.mTmpFile);
                    }
                }
            }else{
                while (MultiImageSelectorFragment.mTmpFile != null && MultiImageSelectorFragment.mTmpFile.exists()){
                    boolean success = MultiImageSelectorFragment.mTmpFile.delete();
                    if(success){
                        MultiImageSelectorFragment.mTmpFile = null;
                        Log.i("MultiActivity", "onCameraShot-onActivityResult---" + MultiImageSelectorFragment.mTmpFile);
                    }
                }
            }
        }
        if(resultCode==RESULT_OK)
        {
            if (MultiImageSelectorFragment.mTmpFile != null) {
                if ( this!= null) {
                    onCameraShot(MultiImageSelectorFragment.mTmpFile);
                    Log.i("MultiActivity", "onCameraShot-onActivityResult---resultCode:"+resultCode + MultiImageSelectorFragment.mTmpFile);
                }
            }
        }else {
            return;
        }
        switch(requestCode){
            case 0:
                final Bitmap photo = data.getParcelableExtra("data");
                if(photo!=null){
                }
            case PIC_CUT:
                Bitmap photo1 = data.getParcelableExtra("data");
                if(photo1!=null){
                    try {
                        File tmpFile = new File(FileUtils.createTmpFile(this),"/"+ TimeUtils.formatPhotoDate(new Date().getTime()));
                        if (!tmpFile.exists())
                        {
                            tmpFile.createNewFile();
                        }
                        FileOutputStream out = new FileOutputStream(tmpFile);
                        photo1.compress(Bitmap.CompressFormat.JPEG, 90, out);
                        out.flush();
                        out.close();
                        Intent data1 = new Intent();
                        resultList.add(tmpFile.getAbsolutePath());
                        data1.putStringArrayListExtra(EXTRA_RESULT, resultList);
                        setResult(RESULT_OK, data1);
                        finish();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
        }
    }
    public  void startCropImageIntent(String uri) {
        Intent intent = new Intent("com.android.camera.action.CROP");
        intent.setDataAndType(Uri.fromFile(new File(uri)), "image/*");
//下面这个crop=true是设置在开启的Intent中设置显示的VIEW可裁剪
        intent.putExtra("crop", "true");
// aspectX aspectY 是宽高的比例
        intent.putExtra("aspectX", 1);
        intent.putExtra("aspectY", 0.8);
// outputX outputY 是裁剪图片宽高
        intent.putExtra("outputX", 150);
        intent.putExtra("outputY", 120);
        intent.putExtra("scale", false);
        intent.putExtra("outputFormat", "JPEG");// 返回格式
        intent.putExtra("return-data", true);
        startActivityForResult(intent,PIC_CUT);

    }
}
