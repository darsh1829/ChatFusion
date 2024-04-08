import { initializeApp, getApps, getApp } from "firebase/app";

// Firebase configuration for Authentication Project
const firebaseAuthConfig = {
  apiKey: "AIzaSyAmLx1bGWKOnMRsWFJ2T-qmwSkOlUrtVUc",
  authDomain: "chatfusionadminpanel.firebaseapp.com",
  projectId: "chatfusionadminpanel",
  storageBucket: "chatfusionadminpanel.appspot.com",
  messagingSenderId: "656471641066",
  appId: "1:656471641066:web:11774ecbc3b6c5263f0093",
  measurementId: "G-TJ0HWJL8GZ"
};

// Firebase configuration for Analytics Project (Chat App)
const firebaseAnalyticsConfig = {
  apiKey: "AIzaSyCaXciTDYfYFiSVoJmPOzkkY1Vj8AKIV9A",
  authDomain: "chatfusion-9104b.firebaseapp.com",
  projectId: "chatfusion-9104b",
  storageBucket: "chatfusion-9104b.appspot.com",
  messagingSenderId: "446430013858",
  appId: "1:446430013858:web:c288dc23f775a764ee2afb",
  measurementId: "G-175DHFPCR6"
};

const apps = getApps();
const authApp = !apps.length ? initializeApp(firebaseAuthConfig, "auth") : getApp("auth");
const analyticsApp = !apps.some(app => app.name === "analytics") ? initializeApp(firebaseAnalyticsConfig, "analytics") : getApp("analytics");



export { authApp, analyticsApp };
