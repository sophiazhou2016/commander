import loadStaticResource from './loadStaticResource.js';

const loadFont = (option) => {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isiOS) {
    console.log('ios');
    const rsList = [
        // location.protocol + '//loanweb.ppdai.com/PPDWebUI/1.6.3/PPDWebUI.min.js',
        `${location.protocol}//loanweb.ppdai.com/web/dist/static/font/fzlt.ttf`,
        `${location.protocol}//loanweb.ppdai.com/web/dist/static/font/fzlt_bold.ttf`,
        `${location.protocol}//loanweb.ppdai.com/web/dist/static/font/number.otf`,
        `${location.protocol}//loanweb.ppdai.com/web/dist/static/font/number_light.otf`,
    ];
    try {
        loadStaticResource(rsList);
    } catch (error) {
        console.log(error);
    }
    return;
  }
  var newStyle = document.createElement('style');
  newStyle.appendChild(
    document.createTextNode(
      '@font-face {\
  	font-family: "fzlt";\
  	src: url("//www.ppdwebui.com/theme/font/fzlt.ttf") format("truetype");\
		}'
    )
  );
  newStyle.appendChild(
    document.createTextNode(
      '@font-face {\
  	font-family: "fzlt_bold";\
  	src: url("//www.ppdwebui.com/theme/font/fzlt_bold.ttf") format("truetype");\
		}'
    )
  );
  newStyle.appendChild(
    document.createTextNode(
      '@font-face {\
  	font-family: "uni_sans_regular";\
  	src: url("//www.ppdwebui.com/theme/font/number.otf") format("truetype");\
		}'
    )
  );
  newStyle.appendChild(
    document.createTextNode(
      '@font-face {\
  	font-family: "number";\
  	src: url("//www.ppdwebui.com/theme/font/number.otf") format("truetype");\
		}'
    )
  );
  newStyle.appendChild(
    document.createTextNode(
      '@font-face {\
  	font-family: "uni_sans_light";\
  	src: url("//www.ppdwebui.com/theme/font/number_light.ttf") format("truetype");\
		}'
    )
  );
  document.head.appendChild(newStyle);
};

export default loadFont;