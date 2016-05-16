package com.yuanxin.alioss;

import android.content.Context;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import com.alibaba.sdk.android.oss.ClientConfiguration;
import com.alibaba.sdk.android.oss.ClientException;
import com.alibaba.sdk.android.oss.OSS;
import com.alibaba.sdk.android.oss.OSSClient;
import com.alibaba.sdk.android.oss.ServiceException;
import com.alibaba.sdk.android.oss.callback.OSSCompletedCallback;
import com.alibaba.sdk.android.oss.callback.OSSProgressCallback;
import com.alibaba.sdk.android.oss.common.OSSLog;
import com.alibaba.sdk.android.oss.common.auth.OSSCredentialProvider;
import com.alibaba.sdk.android.oss.common.auth.OSSPlainTextAKSKCredentialProvider;
import com.alibaba.sdk.android.oss.common.utils.IOUtils;
import com.alibaba.sdk.android.oss.internal.OSSAsyncTask;
import com.alibaba.sdk.android.oss.model.CompleteMultipartUploadRequest;
import com.alibaba.sdk.android.oss.model.CompleteMultipartUploadResult;
import com.alibaba.sdk.android.oss.model.GetObjectRequest;
import com.alibaba.sdk.android.oss.model.GetObjectResult;
import com.alibaba.sdk.android.oss.model.InitiateMultipartUploadRequest;
import com.alibaba.sdk.android.oss.model.InitiateMultipartUploadResult;
import com.alibaba.sdk.android.oss.model.ObjectMetadata;
import com.alibaba.sdk.android.oss.model.PartETag;
import com.alibaba.sdk.android.oss.model.ResumableUploadRequest;
import com.alibaba.sdk.android.oss.model.ResumableUploadResult;
import com.alibaba.sdk.android.oss.model.UploadPartRequest;
import com.alibaba.sdk.android.oss.model.UploadPartResult;
import com.yuanxin.customutil.CustomConstant;
import com.yuanxin.customutil.LocalUtil;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/3/16.
 */
public class OssTool {

    private OSS oss;
    private static final String endpoint = "http://oss-cn-beijing.aliyuncs.com";
    private static final String accessKeyId = "ElsIho4Y4fWTvFib";
    private static final String accessKeySecret = "W9nZpJCpg3XXbhI9Yk8FITwJa7bvvi";
//    private static final String uploadFilePath = "<upload_file_path>";
//
//    private static final String testBucket = "<bucket_name>";
//    private static final String uploadObject = "sampleObject";
//    private static final String downloadObject = "sampleObject";


    private Context context;
    public OssTool(Context context)
    {
     this.context=context;
        inite();
    }

    public void inite()
    {
        OSSCredentialProvider credentialProvider = new OSSPlainTextAKSKCredentialProvider(accessKeyId, accessKeySecret);

        ClientConfiguration conf = new ClientConfiguration();
        conf.setConnectionTimeout(15 * 1000); // 连接超时，默认15秒
        conf.setSocketTimeout(15 * 1000); // socket超时，默认15秒
        conf.setMaxConcurrentRequest(5); // 最大并发请求书，默认5个
        conf.setMaxErrorRetry(2); // 失败后最大重试次数，默认2次

        OSSLog.enableLog();
        oss = new OSSClient(context, endpoint, credentialProvider, conf);

    }

    /**
     *
     * @param bucket
     * @param object
     * @param asynCallBack
     */
    public void download(String bucket,   final String object,final  OssAsynCallBack asynCallBack)
    {
        GetObjectRequest get = new GetObjectRequest(bucket,object);
        OSSAsyncTask task = oss.asyncGetObject(get, new OSSCompletedCallback<GetObjectRequest, GetObjectResult>() {
            @Override
            public void onSuccess(GetObjectRequest request, GetObjectResult result) {
                // 请求成功
                long totalSize,currentSize=0;

                InputStream inputStream = result.getObjectContent();
                totalSize=result.getContentLength();
                File file= LocalUtil.createFile(LocalUtil.formatFileNamme(object));
                FileOutputStream outputStream=null;
                try {
                     outputStream=new FileOutputStream(file);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                byte[] buffer = new byte[2048];
                int len;

                try {
                    while ((len = inputStream.read(buffer)) != -1) {
                        // 处理下载的数据
                        currentSize+=len;
                        outputStream.write(buffer, 0, len);
                        outputStream.flush();
                        CallBackBean map=new CallBackBean();

                        if (currentSize>=totalSize)
                        {
                            map.setFilePath(file.getAbsolutePath());
                            map.setSuffix(file.getAbsolutePath().substring(file.getAbsolutePath().lastIndexOf("/") + 1, file.getAbsolutePath().length()));
                            asynCallBack.success(map);
                        }else {
                            map.setPersent( (int) (currentSize / totalSize * 100) + "%");
                            asynCallBack.onUploading(map);
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(GetObjectRequest request, ClientException clientExcepion, ServiceException serviceException) {
                // 请求异常
                CallBackBean map=new CallBackBean();
                // 请求异常
                if (clientExcepion != null) {
                    // 本地异常如网络异常等
                    clientExcepion.printStackTrace();
                    map.setMsg(clientExcepion.getMessage());
                }
                if (serviceException != null) {
                    // 服务异常
                    Log.e("ErrorCode", serviceException.getErrorCode());
                    Log.e("RequestId", serviceException.getRequestId());
                    Log.e("HostId", serviceException.getHostId());
                    Log.e("RawMessage", serviceException.getRawMessage());
                    map.setMsg(serviceException.getMessage());

                }
                map.setFilePath(object);
                asynCallBack.failure(map);
            }
        });
    }

    /**
     *断点上传
     * @param bucket
     * @param object
     * @param uploadFilePath
     * @param asynCallBack
     */
    public void picMultipartUpload(final  String bucket, final   String object, final String uploadFilePath,final  OssAsynCallBack asynCallBack)
    {
        final Handler handler=new Handler()
        {
            @Override
            public void handleMessage(Message msg) {
                super.handleMessage(msg);
                switch (msg.arg1)
                {
                    case 1:
                        asynCallBack.success((CallBackBean) msg.obj);
                        break;
                    case 2:
                        asynCallBack.onUploading((CallBackBean) msg.obj);
                        break;
                    case 0:
                        asynCallBack.failure((CallBackBean) msg.obj);
                        break;
                }
            }
        };
        new Thread(new Runnable() {
            @Override
            public void run() {
                String uploadId;
                InitiateMultipartUploadRequest init = new InitiateMultipartUploadRequest(bucket, object);
                ObjectMetadata objectMetadata=new ObjectMetadata();
                try {
                InputStream input=null;
                long fileLength=0;
                if (LocalUtil.isPic(uploadFilePath))
                {
                    byte[] enPic = LocalUtil.getCompressPic(uploadFilePath);
                    input=new ByteArrayInputStream(enPic);
                    fileLength=enPic.length;
                    objectMetadata.setContentType("image/jpeg");
                }else {
                    File    uploadFile = new File(uploadFilePath);
                    input = new FileInputStream(uploadFile);
                    fileLength = uploadFile.length();
                }


                init.setMetadata(objectMetadata);
                InitiateMultipartUploadResult initResult = null;

                    initResult = oss.initMultipartUpload(init);
                    uploadId = initResult.getUploadId();
                    long partSize = 128 * 1024;
                    int currentIndex = 1;



                    long uploadedLength = 0;
                    List<PartETag> partETags = new ArrayList<PartETag>();
                    while (uploadedLength < fileLength) {
                        int partLength = (int) Math.min(partSize, fileLength - uploadedLength);
                        byte[] partData = IOUtils.readStreamAsBytesArray(input, partLength);

                        UploadPartRequest uploadPart = new UploadPartRequest(bucket, object, uploadId, currentIndex);
                        uploadPart.setPartContent(partData);

                        UploadPartResult uploadPartResult = oss.uploadPart(uploadPart);

                        partETags.add(new PartETag(currentIndex, uploadPartResult.getETag()));

                        uploadedLength += partLength;
                        currentIndex++;

                        CallBackBean map=new CallBackBean();
                        map.setCurrentSize(uploadedLength);
//                        asynCallBack.onUploading(map);
                        Message message=new Message();
                        message.arg1=2;
                        message.obj=map;
                        handler.sendMessage(message);

                    }

                    CompleteMultipartUploadRequest complete = new CompleteMultipartUploadRequest(bucket, object, uploadId, partETags);

                    CompleteMultipartUploadResult completeResult = oss.completeMultipartUpload(complete);
                    CallBackBean map=new CallBackBean();

                    map.setOssFileName(completeResult.getObjectKey());//map.put(CustomConstant.fileName,completeResult.getObjectKey());
                    map.setOssFileSize(new File(uploadFilePath).length());//map.put(CustomConstant.fileSize,new File(uploadFilePath).length());
                    map.setFilePath(uploadFilePath);//map.put(CustomConstant.FilePath,uploadFilePath);
                    map.setUpdateLoadUrl(completeResult.getLocation());//map.put(CustomConstant.UpdateloadUrl,completeResult.getLocation());
                    map.setSuffix(uploadFilePath.substring(uploadFilePath.lastIndexOf(".") + 1, uploadFilePath.length()));//map.put(CustomConstant.suffixName,uploadFilePath.substring(uploadFilePath.lastIndexOf(".") + 1, uploadFilePath.length()));
                    Message message=new Message();
                    message.arg1=1;
                    message.obj=map;
                    handler.sendMessage(message);
                    Log.d("multipartUpload", "multipart upload success! Location: " + completeResult.getLocation());
                } catch (ClientException e) {
                    e.printStackTrace();
                    CallBackBean map=new CallBackBean();
                    map.setMsg(e.getMessage());//map.put(CustomConstant.msg,e.getMessage());
                    map.setFilePath(uploadFilePath);//map.put(CustomConstant.FilePath, uploadFilePath);
                    Message message=new Message();
                    message.arg1=0;
                    message.obj=map;
                    handler.sendMessage(message);
                } catch (ServiceException e) {
                    e.printStackTrace();
                    CallBackBean map=new CallBackBean();
                    map.setMsg(e.getMessage());//map.put(CustomConstant.msg,e.getMessage());
                    map.setFilePath(uploadFilePath);//map.put(CustomConstant.FilePath, uploadFilePath);
                    Message message=new Message();
                    message.arg1=0;
                    message.obj=map;
                    handler.sendMessage(message);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                    CallBackBean map=new CallBackBean();
                    map.setMsg(e.getMessage());//map.put(CustomConstant.msg,e.getMessage());
                    map.setFilePath(uploadFilePath);//map.put(CustomConstant.FilePath, uploadFilePath);
                    Message message=new Message();
                    message.arg1=0;
                    message.obj=map;
                    handler.sendMessage(message);
                } catch (IOException e) {
                    e.printStackTrace();
                    CallBackBean map=new CallBackBean();
                    map.setMsg(e.getMessage());//map.put(CustomConstant.msg,e.getMessage());
                    map.setFilePath(uploadFilePath);//map.put(CustomConstant.FilePath, uploadFilePath);
                    Message message=new Message();
                    message.arg1=0;
                    message.obj=map;
                    handler.sendMessage(message);
                }
            }
        }).start();

    }

//    /**
//     * 断点上传，适用大文件本地文件上传。
//     * @param bucket
//     * @param object
//     * @param uploadFilePath
//     * @param asynCallBack
//     */
//    public void multipartUpload(  String bucket,   String object, final String uploadFilePath,final  OssAsynCallBack asynCallBack)
//    {
//// 创建断点上传请求
//        ResumableUploadRequest request = new ResumableUploadRequest(bucket, object, uploadFilePath);
//// 设置上传过程回调
//        request.setProgressCallback(new OSSProgressCallback<ResumableUploadRequest>() {
//            @Override
//            public void onProgress(ResumableUploadRequest request, long currentSize, long totalSize) {
//                Log.d("resumableUpload", "currentSize: " + currentSize + " totalSize: " + totalSize);
//                Map map=new HashMap();
//                map.put(CustomConstant.currentSize,currentSize);
//                asynCallBack.onUploading(map);
//            }
//        });
//// 异步调用断点上传
//        OSSAsyncTask resumableTask = oss.asyncResumableUpload(request, new OSSCompletedCallback<ResumableUploadRequest, ResumableUploadResult>() {
//            @Override
//            public void onSuccess(ResumableUploadRequest request, ResumableUploadResult result) {
//                Log.d("resumableUpload", "success!");
//                Map map=new HashMap();
//
//                map.put(CustomConstant.fileName,result.getObjectKey());
//                map.put(CustomConstant.fileSize,new File(uploadFilePath).length());
//                map.put(CustomConstant.FilePath,uploadFilePath);
//                map.put(CustomConstant.UpdateloadUrl,result.getLocation());
//                map.put(CustomConstant.suffixName,uploadFilePath.substring(uploadFilePath.lastIndexOf(".") + 1, uploadFilePath.length()));
//                asynCallBack.success(map);
//
//            }
//
//            @Override
//            public void onFailure(ResumableUploadRequest request, ClientException clientExcepion, ServiceException serviceException) {
//
//                Map map=new HashMap();
//                // 请求异常
//                if (clientExcepion != null) {
//                    // 本地异常如网络异常等
//                    clientExcepion.printStackTrace();
//
//                    map.put(CustomConstant.msg,clientExcepion.getMessage());
//                }
//                if (serviceException != null) {
//                    // 服务异常
//                    Log.e("ErrorCode", serviceException.getErrorCode());
//                    Log.e("RequestId", serviceException.getRequestId());
//                    Log.e("HostId", serviceException.getHostId());
//                    Log.e("RawMessage", serviceException.getRawMessage());
//
//                    map.put(CustomConstant.msg, serviceException.getMessage());
//
//                }
//                map.put(CustomConstant.fileSize,new File(uploadFilePath).length());
//                map.put(CustomConstant.FilePath,uploadFilePath);
//                asynCallBack.failure(map);
//            }
//        });
//    }
}
