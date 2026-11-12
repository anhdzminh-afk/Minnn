package com.liveaibot.android;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
public class MainActivity extends Activity {
 private WebView web;
 @Override public void onCreate(Bundle b) { super.onCreate(b); web=new WebView(this); web.setWebViewClient(new WebViewClient()); web.getSettings().setJavaScriptEnabled(true); setContentView(web); web.loadUrl("file:///android_asset/index.html"); }
 @Override public void onDestroy(){ if(web!=null)web.destroy(); super.onDestroy(); }
}
