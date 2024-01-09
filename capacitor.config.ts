import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.sandsale.starterFCM',
  appName: 'sandsale',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
  SplashScreen: {
    launchShowDuration: 3000,
    launchAutoHide: true,
    launchFadeOutDuration: 3000,   
    androidSplashResourceName: "splash",
    androidScaleType: "CENTER_CROP",
    showSpinner: true,
    androidSpinnerStyle: "large",
    iosSpinnerStyle: "small",
    spinnerColor: "#007D9E",
    splashFullScreen: true,
    splashImmersive: true,
    layoutName: "launch_screen",
    useDialog: true,
  },
};

export default config;
