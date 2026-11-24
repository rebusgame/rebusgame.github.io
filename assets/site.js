/* REBUS resmi site - ortak dil ve alt bilgi (rebusgame.github.io) */
(function(){
  var DILLER=["tr","en","de","es","fr"];
  var AD={tr:"Türkçe",en:"English",de:"Deutsch",es:"Español",fr:"Français"};
  var ALT={
    tr:{destek:"Destek",gizlilik:"Gizlilik",kosullar:"Kullanım Koşulları",silme:"Hesap ve veri silme"},
    en:{destek:"Support",gizlilik:"Privacy",kosullar:"Terms of Use",silme:"Account & data deletion"},
    de:{destek:"Support",gizlilik:"Datenschutz",kosullar:"Nutzungsbedingungen",silme:"Konto- & Datenlöschung"},
    es:{destek:"Soporte",gizlilik:"Privacidad",kosullar:"Condiciones de uso",silme:"Eliminar cuenta y datos"},
    fr:{destek:"Assistance",gizlilik:"Confidentialité",kosullar:"Conditions d'utilisation",silme:"Suppression du compte"}
  };
  function oku(){try{return localStorage.getItem("rebus_dil");}catch(e){return null;}}
  function yaz(d){try{localStorage.setItem("rebus_dil",d);}catch(e){}}
  function dilBul(){
    var q=new URLSearchParams(location.search).get("lang");
    if(q&&DILLER.indexOf(q)>=0) return q;
    var s=oku(); if(s&&DILLER.indexOf(s)>=0) return s;
    var n=(navigator.language||"en").slice(0,2).toLowerCase();
    return DILLER.indexOf(n)>=0?n:"en";
  }
  var ua=navigator.userAgent||"";
  window.REBUS={
    PAKET:"com.unuvargames.rebus",
    APPLE:"https://apps.apple.com/app/id6836883587",
    android:/Android/i.test(ua),
    ios:/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1),
    play:function(ref){return "https://play.google.com/store/apps/details?id="+this.PAKET+(ref?"&referrer="+encodeURIComponent(ref):"");},
    baslat:function(M,ciz){
      var d=dilBul(); var T=M[d]||M.en; document.documentElement.lang=d;
      ciz(T,d);
      var f=document.getElementById("altbilgi"); if(!f) return;
      var A=ALT[d];
      f.innerHTML='<nav><a href="/support/">'+A.destek+'</a> · <a href="/privacy/">'+A.gizlilik+'</a> · <a href="/terms/">'+A.kosullar+
        '</a> · <a href="/delete-account/">'+A.silme+'</a></nav><p>© 2026 Unuvar Games · <a href="mailto:rebus.game.help@gmail.com">rebus.game.help@gmail.com</a></p><div class="diller"></div>';
      var k=f.querySelector(".diller");
      DILLER.forEach(function(x){
        var b=document.createElement("button"); b.textContent=AD[x]; if(x===d) b.className="secili";
        b.onclick=function(){ yaz(x); var u=new URL(location.href); u.searchParams.delete("lang"); location.replace(u.toString()); };
        k.appendChild(b);
      });
    }
  };
})();
