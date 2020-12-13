export default () => {
  //防止页面后退
  window.history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    window.history.pushState(null, null, document.URL);
  });
  if (window.console) {
    var cons = console;
    if (cons) {
      cons.log("%c本页面由 @彭国东 负责开发", "font-size:15px;color:#7A297B")
      cons.log(`%c\n如果你对我在做的事情也有兴趣，欢迎通过添加\n\n个人微信：pengguodon 进行咨询了解更多内容。\n`, "font-weight:bold; line-height: 20px; color: #6190E8;");
    }
  }
  return null;
}