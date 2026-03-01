function check_if_ios(){
    var isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    //// console.log('isIOS: ' + isIOS);
    //alert('isIOS:' + isIOS);
    return isIOS;
}





