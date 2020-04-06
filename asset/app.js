var i18nZHData = {
  'tran-site-categories':'网站分类',
  'tran-site-tags':'网站标签',
  'tran-posted-in':'发布到',
  'tran-tags':'标签: ',
  'tran-archives':'归档',
  'tran-categories':'分类: ',
  'tran-comments':'评论',
  'tran-readmore':'阅读全文',
  'tran-prev-page':'&laquo; 上一页',
  'tran-next-page':'下一页 &raquo;',
  'tran-disqus-comments':'评论',
  'tran-archives': '归档',
  'tran-author': '作者：',
  'tran-theme': '主题：',
  'tran-notice': '公告'
};

// 监听媒体查询事件，切换暗黑模式
var darkMode = window.matchMedia('(prefers-color-scheme: dark)');
darkMode.addListener(handleModeChange);
function handleModeChange(darkMode) {
  var comment = document.getElementById('github-comment');
  var frame = document.querySelectorAll('.utterances-frame');
  var params = [];
  if (frame.length > 0) params = getQueryParams(frame[0].getAttribute('src'));
  if (darkMode.matches) {
    if (comment) comment.setAttribute('theme', 'github-dark');
    if (frame.length > 0 && params) {
      params['theme'] = 'github-dark';
      frame[0].setAttribute('src', genUrl(params));
    }
  } else {
    if (comment) comment.setAttribute('theme', 'github-light');
    if (frame.length > 0 && params) {
      params['theme'] = 'github-light';
      frame[0].setAttribute('src', genUrl(params));
    }
  }
}

/**
 * 生成URL
 */
function genUrl(params) {
  var res = '';
  for(let key in params){
    if (!res) res = `${key}=${params[key]}`;
    else res += `&${key}=${params[key]}`;
  }
  return decodeURI(res);
}

/**
 * 获取URL参数
 */
function getQueryParams(url) {
  var vars = url.split("&");
  var data = {};
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    data[pair[0]] = pair[1];
  }
  return data;
}

// DOM加载完执行
document.addEventListener('DOMContentLoaded',function(){
  const el = document.getElementById('navbarSNSRssSwitchBtn');
  el.addEventListener('click',function(){
    const $target = document.getElementById('navbarSNSRssButtons');
    el.classList.toggle('is-active');
    $target.classList.toggle('is-active');
  });

  var userLang = navigator.language || navigator.userLanguage; 
  if(userLang.indexOf('zh') != -1){
    var result = Object.keys(i18nZHData);
    for (var i = 0; i < result.length; i++) {
        var key = result[i];
        var eles = document.querySelectorAll('.'+key);
        eles.forEach(function(ele){
          ele.innerHTML = i18nZHData[key];
        });
    }
  }

  handleModeChange(darkMode);
});

