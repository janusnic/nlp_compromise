//1200 common first-names.
//not sure what regional/cultural/demographic bias this has. Probably a lot.
//used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
var firstnames = (function() {

  var main=["aaron","abby","abigail","agnes","aida","aileen","aimee","aisha","april","ashlee","ashley","ava","avis","barbara","barbra","barry","bianca","bill","billie","billy","blanca","blanche","byron","cindy","craig","cristina","crystal","curtis","cynthia","dina","dionne","dixie","duane","dustin","dwayne","dwight","earl","earlene","earline","earnestine","ebony","effie","eileen","emilia","emily","emma","enid","enrique","erma","erna","ernest","ernestine","ethel","etta","eugene","eugenia","eula","eunice","fannie","fanny","fay","faye","gena","gene","geneva","genevieve","george","georgette","georgina","gerald","geraldine","gertrude","gilbert","gilda","gina","ginger","goldie","gordon","guadalupe","guy","gwen","gwendolyn","hilary","hilda","hillary","hollie","holly","hope","howard","hugh","ian","ida","ila","ilene","imelda","imogene","ines","inez","ingrid","irene","iris","irma","isaac","isabel","isabella","isabelle","iva","ivan","ivy","krystal","kurt","kyle","lloyd","muriel","myra","myrna","myrtle","odessa","ofelia","opal","ophelia","ora","oscar","philip","phillip","phoebe","phyllis","polly","priscilla","queen","rhea","rhoda","rhonda","ryan","scott","sidney","silvia","simone","sue","summer","suzanne","suzette","sybil","sylvia","ted","tessa","twila","tyler","tyrone","ursula","valarie","valeria","valerie","vanessa","vonda","wendi","wendy","wesley","whitney","winifred","winnie","yesenia","yolanda","yvette","yvonne","zachary","zelma","shirley","susie","angie","muhammed","mahammed","mahamed","urich","lars"]
  main=main.reduce(function(h,st){
    h[st]=true
    return h
  },{})

  //an ad-hoc prefix encoding for names. 2ms decompression of names
  var compact = {
    "ad": "a,am,die,ela,ele,eline,rian,riana,rienne",
    "al": "an,ana,ba,bert,berta,berto,fred,fredo,ma,ta,thea,vin,yce,yson,yssa",
    "ale": "jandra,x,xis",
    "alexa": "nder,ndra,ndria",
    "ali": ",ce,cia,ne,sa,sha,son,ssa",
    "all": "an,en,ie,ison,yson",
    "am": "alia,anda,ber,elia,ie,paro,y",
    "an": "a,astasia,dre,drea,drew,dy,ita,thony,toinette,tonia,tonio",
    "angel": "a,ia,ica,ina,ine,ique,ita",
    "ann": ",a,abelle,e,ette,ie,marie",
    "ar": "aceli,lene,line,mando,nold,thur",
    "au": "dra,drey,gusta,relia,rora,tumn",
    "be": "atrice,atriz,cky,linda,n,nita,njamin,ssie,ulah,verley,verly",
    "ber": "nadette,nadine,nard,nice,ta,tha,tie,yl",
    "bet": "h,hany,sy,te,tie,ty,tye",
    "bo": "b,bbi,bbie,bby,nita,nnie",
    "bra": "d,dley",
    "brand": "i,ie,on,y",
    "br": "enda,ent,ett,ooke,uce,yan",
    "bri": "an,ana,anna,dget,dgett,dgette,gitte,tney,ttany,ttney",
    "ca": "itlin,llie,lvin,mille,ndace,ndice,ndy,sandra,sey,ssandra,ssie,talina,therine,thleen,thryn,thy",
    "car": "a,ey,issa,l,la,lene,los,ly,mela,mella,men,rie",
    "carol": ",e,ina,ine,yn",
    "ce": "celia,cil,cile,cilia,leste,lia,lina",
    "cha": "d,ndra,sity",
    "char": "ity,maine",
    "charl": "ene,es,ie,otte",
    "che": "lsea,ri,rie,rry,ryl,ster",
    "chris": ",ta,ti,tian,tie,tina,tine,topher,ty",
    "chr": "ystal",
    "cla": "ire,yton",
    "clar": "a,e,ence,ice,issa",
    "claud": "e,ette,ia,ine",
    "cl": "eo,ifford,ifton,inton,yde",
    "co": "dy,leen,lette,lleen,ncepcion,ncetta,nnie,nstance,nsuelo,urtney",
    "cor": "a,ey,ine,inne,nelia,rine,y",
    "da": "isy,le,n,na,niel,nielle,nny,phne,ve,vid,wn",
    "dar": "cy,la,lene,rell,ren,ryl,yl",
    "dean": ",a,n,na,ne",
    "de": "bbie,bora,borah,bra,e,ena,idre,irdre,lia,lla,lores,loris,na,nise,nnis,rek,rrick,siree",
    "dian": "a,e,n,na,ne",
    "do": "llie,lly,lores,minique,n,na,nald,nna,uglas",
    "dor": "a,een,is,othea,othy,thy",
    "ed": "die,gar,ith,na,uardo,ward,win,wina",
    "el": "aine,ba,eanor,ena,la,len,ma,mer,nora,oise,sa,sie,va,via,vira",
    "eli": "nor,sa,sabeth,se,za,zabeth",
    "eri": "c,ca,cka,k,ka,n",
    "es": "meralda,peranza,sie,tela,tella,telle,ter,ther",
    "ev": "a,angelina,angeline,e,elyn,erett",
    "fe": "lecia,licia,lix,rn,rnando",
    "fl": "ora,orence,orine,ossie,oyd",
    "fran": ",k,kie,klin",
    "franc": "es,esca,ine,is,isca,isco",
    "fr": "ed,eda,eddie,ederick,eida,ieda",
    "ga": "briel,briela,brielle,il,le,ry,yle",
    "gl": "adys,en,enda,enn,enna,oria",
    "gr": "ace,acie,aciela,eg,egory,eta,etchen",
    "ha": "ley,llie,nnah,rold,rriet,rriett,rry,rvey,ttie,zel",
    "he": "ather,ctor,idi,len,lena,lene,lga,nrietta,nry,rbert,rman,rminia,ster",
    "jac": "k,kie,klyn,lyn,ob,queline,quelyn",
    "ja": "ime,mes,mi,mie,red,smine,son,vier,y,yne",
    "jan": ",a,e,ell,elle,et,ette,ice,ie,ine,is,na,nie",
    "jean": ",ette,ie,ine",
    "jeann": "e,ette,ie,ine",
    "je": "ff,ffery,ffrey,nifer,nna,nnie,nnifer,nny,remy,ri,rome,rri,rry,sse,ssica,ssie,wel,well",
    "ji": "ll,llian,m,mmie,mmy",
    "jo": ",an,ann,anna,anne,celyn,di,die,dy,e,el,hanna,hn,hnnie,hnny,lene,n,nathan,ni,rdan,rge,yce",
    "jos": "e,efa,efina,eph,ephine,hua,ie",
    "ju": "an,ana,anita,dith,dy,ne,stin,stine",
    "julia": ",n,na,nne",
    "juli": "e,et,ette,o",
    "ka": "itlin,sey,y,ye,yla",
    "kar": "a,en,i,in,ina,l,la,yn",
    "kat": "e,elyn,ie,ina,rina,y",
    "kath": "arine,erine,eryn,ie,leen,rine,ryn,y",
    "ke": "isha,ith,lley,lli,llie,lly,lsey,n,ndra,nneth,nya,ri,rri,rry,vin",
    "ki": "m,mberley,mberly,rk,rsten,tty",
    "krist": "a,en,i,ie,in,ina,ine,y",
    "la": "cey,cy,donna,keisha,kisha,na,nce,ra,rry,tasha,tisha,tonya,toya,ura,urel,uren,uri,urie,verne,vonne,wanda,wrence",
    "le": "a,ah,ann,anna,anne,e,igh,ila,la,lia,na,nora,nore,o,ola,on,ona,onard,roy,ta,tha,ticia,titia,wis",
    "les": "a,ley,lie,sie,ter",
    "li": "dia,na,nda,ndsay,ndsey,sa,z,za,zzie",
    "lil": "a,ia,ian,iana,lian,lie,ly,y",
    "lo": "is,la,lita,nnie,ttie",
    "lor": "a,aine,ena,ene,etta,i,ie,na,raine,rie",
    "lou": ",ella,is,isa,ise,rdes",
    "lu": "ann,cia,cile,cille,cinda,cy,ella,is,isa,la,pe,z",
    "ly": "dia,nda,nette,nn,nne",
    "ma": "bel,ble,deleine,deline,delyn,dge,e,gdalena,ggie,i,linda,llory,mie,ndy,nuel,nuela,thew,tilda,tthew,ttie,ude,ura,ureen,urice,vis,x,xine,yra",
    "mar": "a,jorie,k,la,lene,quita,sha,shall,ta,tha,tin,tina,va,vin,y,yann,yanne,yellen,ylou",
    "marc": ",ella,i,ia,ie,us,y",
    "marg": "aret,arita,ery,ie,o,ret,uerite",
    "mari": ",bel,cela,e,etta,lyn,na,o,on,sa,sol,ssa,tza",
    "maria": ",n,na,nne",
    "me": "agan,gan,ghan,rcedes,redith,rle",
    "mel": "anie,ba,inda,isa,issa,ody,va,vin",
    "mi": "a,chael,cheal,chele,chelle,guel,ke,ndy,nerva,nnie,randa,riam,sty,tchell,tzi",
    "mil": "agros,dred,licent,lie,ton",
    "mo": "llie,lly,na,nica,nique,rgan,rris",
    "na": "dia,dine,ncy,nette,nnie,omi",
    "nat": "alia,alie,asha,han,haniel",
    "ne": "il,lda,ll,llie,lson,ttie,va",
    "ni": "cholas,chole,cole,kki,na,ta",
    "no": "elle,emi,la,na,ra,reen,rma,rman",
    "ol": "a,ga,ive,ivia,lie",
    "pa": "ige,m,mela,nsy,ul,ula,ulette,uline",
    "pat": ",sy,ti,ty",
    "patri": "ca,ce,cia,ck",
    "pe": "arl,arlie,dro,ggy,nelope,nny,rry,ter,tra",
    "ra": "chael,chel,chelle,e,fael,lph,mon,mona,ndall,ndi,ndy,quel,ul,y,ymond",
    "re": "ba,becca,bekah,gina,ginald,na,ne,nee,va,yna",
    "ri": "cardo,chard,ck,cky,ta",
    "rob": "bie,ert,erta,erto,in,yn",
    "ro": "chelle,dney,ger,land,n,nald,nda,nnie,wena,xanne,xie,y",
    "rosa": ",nna,nne,rio",
    "rosal": "ie,ind,inda,yn",
    "ros": "e,eann,emarie,emary,etta,ie,lyn,s",
    "ru": "ben,by,ssell,th,thie",
    "sa": "brina,die,llie,lly,lvador,m,mantha,muel,ndra,ndy,ra,rah,sha,undra,vannah",
    "se": "an,lena,lma,rena,rgio,th",
    "sha": "na,ne,nna,nnon,ri,rlene,ron,rron,una,wn,wna",
    "she": "ena,ila,lby,lia,lley,lly",
    "sher": "ee,i,ri,rie,ry,yl",
    "so": "fia,ndra,nia,nja,nya,phia,phie",
    "sta": "cey,ci,cie,cy,nley",
    "ste": "fanie,lla,phanie,phen,ve,ven",
    "susan": ",a,na,ne",
    "ta": "batha,bitha,nia,nisha,nya,ra,sha,ylor",
    "tam": "ara,eka,era,i,ika,mi,mie,my,ra",
    "ter": "esa,i",
    "terr": "a,ance,ence,i,ie,y",
    "th": "elma,eodore,eresa,erese,omas",
    "ti": "a,ffany,m,mothy,na,sha",
    "to": "dd,m,mmie,mmy,ni,nia,ny,nya",
    "tra": "cey,ci,cie,cy,vis",
    "tr": "icia,ina,isha,oy,udy",
    "ve": "lma,ra,rna,rnon,ronica",
    "vic": "ki,kie,ky,tor,toria",
    "vi": "ncent,ola,olet,rgie,rgil,rginia,vian",
    "wa": "de,llace,lter,nda,rren,yne",
    "wil": "da,la,lard,liam,lie,ma"
  }

  var keys=Object.keys(compact)
  var l=keys.length
  var i;
  for(i=0; i<l; i++){
    compact[keys[i]].split(',').forEach(function(s){
      main[keys[i]+s]=true
    })
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = main;
  }
  return main
})()
// console.log(JSON.stringify(firstnames, null, 2));
