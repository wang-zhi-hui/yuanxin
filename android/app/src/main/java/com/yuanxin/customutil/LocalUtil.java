package com.yuanxin.customutil;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Administrator on 2016/3/15.
 */
public class LocalUtil {

    /**
     *
     *
     * @param context
     * @param key
     * @param data
     */
    public static void putStorageData(Context context, String key, String data) {
        SharedPreferences.Editor editor = context.getSharedPreferences(
                CustomConstant.sharedName, Context.MODE_PRIVATE).edit();
        editor.putString(key, data);
        editor.commit();
    }
    /**
     *
     * @param context
     * @param key
     * @param data
     */
    public static void putStorageData(Context context, String key, Boolean data) {
        SharedPreferences.Editor editor = context.getSharedPreferences(
                CustomConstant.sharedName, Context.MODE_PRIVATE).edit();
        editor.putBoolean(key, data);
        editor.commit();
    }

    /**
     *
     * @param context
     * @param key
     */
    public static void clearStorageData(Context context, String key) {
        SharedPreferences.Editor editor = context.getSharedPreferences(
                CustomConstant.sharedName, Context.MODE_PRIVATE).edit();
        editor.remove(key);
        editor.commit();
    }

    /**
     *
     * @param context
     */
    public static void clearAllStorageData(Context context) {
        SharedPreferences.Editor editor = context.getSharedPreferences(
                CustomConstant.sharedName, Context.MODE_PRIVATE).edit();
        editor.clear();
        editor.commit();
    }
    /**
     * remove cookie
     * @param context
     */
    public static void removeCookie(Context context) {
        CookieSyncManager.createInstance(context);
        CookieManager cookieManager = CookieManager.getInstance();
        cookieManager.removeAllCookie();
        CookieSyncManager.getInstance().sync();
    }
    /**
     *
     * @param context
     * @param key
     * @return
     */
    public static String getStorageData(Context context,String key)
    {
        SharedPreferences editor = context.getSharedPreferences(
                CustomConstant.sharedName, Context.MODE_PRIVATE);

        return editor.getString(key, null);
    }
    /**
     *
     * @param context
     * @param key
     * @return
     */
    public static Boolean getBooleanData(Context context,String key)
    {
        SharedPreferences editor = context.getSharedPreferences(
                CustomConstant.sharedName, Context.MODE_PRIVATE);

        return editor.getBoolean(key, false);
    }
    public static Long getLongData(Context context,String key)
    {
        SharedPreferences editor = context.getSharedPreferences(
                CustomConstant.sharedName, Context.MODE_PRIVATE);

        return editor.getLong(key, 0);
    }
    public static void putStorageData(Context context, String key, Long data) {
        SharedPreferences.Editor editor = context.getSharedPreferences(
                CustomConstant.sharedName, Context.MODE_PRIVATE).edit();
        editor.putLong(key,data);
        editor.commit();
    }

    /**
     * 路径中取出文件名字。
     * @param filePath
     * @return
     */
    public static String formatFileNamme(String filePath)
    {
        return  filePath.substring(filePath.lastIndexOf("/")+1,filePath.length());
    }

    /**
     * 创建文本地件
     * @param fileName
     * @return
     */
    public static File createFile(String fileName)
    {
        File file=new File(Environment.getExternalStorageDirectory()+"/com.yuanxin/"+fileName);
        if (!file.exists())
        {
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return  file;
    }

    /**
     * 是否是图片
     * @param fileName
     * @return
     */
    public static boolean isPic(String fileName)
    {
        String lowPic=fileName.toLowerCase();
        if (lowPic.endsWith("jpg"))
        {
            return true;
        }else if (lowPic.endsWith("png")){
            return  true;
        }if (lowPic.endsWith("jpeg"))
        {
            return true;
        }if (lowPic.endsWith("gif"))
        {
            return true;
        }else {
            return false;
        }
    }


    /**
     * 图片压缩 压缩至小于100K。小于100K，则不压缩；
     * @param picFilePath
     * @return
     */
    public static byte[] getCompressPic(String picFilePath)
    {
        Bitmap image=getBitmapFromFile(new File(picFilePath),100,100);


        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        image.compress(Bitmap.CompressFormat.JPEG, 100, baos);//质量压缩方法，这里100表示不压缩，把压缩后的数据存放到baos中
        int options = 100;
        while ( baos.toByteArray().length / 1024>100) {    //循环判断如果压缩后图片是否大于100kb,大于继续压缩
            baos.reset();//重置baos即清空baos
            options -= 10;//每次都减少10
            if (options>0)
            {
                image.compress(Bitmap.CompressFormat.JPEG, options, baos);//这里压缩options%，把压缩后的数据存放到baos中
            }

        }
//        ByteArrayInputStream isBm = new ByteArrayInputStream(baos.toByteArray());//把压缩后的数据baos存放到ByteArrayInputStream中
//        Bitmap bitmap = BitmapFactory.decodeStream(isBm, null, null);//把ByteArrayInputStream数据生成图片

        return baos.toByteArray();


    }

    /**
     *
     * @param dst
     * @param width
     * @param height
     * @return
     */
    public static Bitmap getBitmapFromFile(File dst, int width, int height) {
        if (null != dst && dst.exists()) {
            BitmapFactory.Options opts = null;
            if (width > 0 && height > 0) {
                opts = new BitmapFactory.Options();          //设置inJustDecodeBounds为true后，decodeFile并不分配空间，此时计算原始图片的长度和宽度
                        opts.inJustDecodeBounds = true;
                BitmapFactory.decodeFile(dst.getPath(), opts);
                // 计算图片缩放比例
                final int minSideLength = Math.min(width, height);
                opts.inSampleSize = computeSampleSize(opts, minSideLength,
                        width * height);           //这里一定要将其设置回false，因为之前我们将其设置成了true
                        opts.inJustDecodeBounds = false;
                opts.inInputShareable = true;
                opts.inPurgeable = true;
            }
            try {
                return BitmapFactory.decodeFile(dst.getPath(), opts);
            } catch (OutOfMemoryError e) {
                e.printStackTrace();
            }
        }
        return null;
    }


    /**
     *
     * @param options
     * @param minSideLength
     * @param maxNumOfPixels
     * @return
     */
    public static int computeSampleSize(BitmapFactory.Options options,
                                        int minSideLength, int maxNumOfPixels) {
        int initialSize = computeInitialSampleSize(options, minSideLength,
                maxNumOfPixels);

        int roundedSize;
        if (initialSize <= 8) {
            roundedSize = 1;
            while (roundedSize < initialSize) {
                roundedSize <<= 1;
            }
        } else {
            roundedSize = (initialSize + 7) / 8 * 8;
        }

        return roundedSize;
    }

    /**
     *
     * @param options
     * @param minSideLength
     * @param maxNumOfPixels
     * @return
     */
    private static int computeInitialSampleSize(BitmapFactory.Options options,
                                                int minSideLength, int maxNumOfPixels) {
        double w = options.outWidth;
        double h = options.outHeight;

        int lowerBound = (maxNumOfPixels == -1) ? 1 : (int) Math.ceil(Math
                .sqrt(w * h / maxNumOfPixels));
        int upperBound = (minSideLength == -1) ? 128 : (int) Math.min(Math
                .floor(w / minSideLength), Math.floor(h / minSideLength));

        if (upperBound < lowerBound) {
            // return the larger one when there is no overlapping zone.
            return lowerBound;
        }

        if ((maxNumOfPixels == -1) && (minSideLength == -1)) {
            return 1;
        } else if (minSideLength == -1) {
            return lowerBound;
        } else {
            return upperBound;
        }
    }

}
