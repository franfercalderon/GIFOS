//CONSTANTES

const menuBtn= document.querySelector(".menuIcon");
const mobileUl= document.querySelector(".mobileUl");
const body=document.body;
const switchDarkMobile= document.querySelector(".switchDarkMobile");
const switchDarkDesktop=document.querySelector(".switchDarkDesktop");
const mainLogo= document.querySelector(".logo");
const newLogo= document.querySelector(".newGifoBtn");
const searchIcon= document.querySelector(".searchicon");
const closeSearch= document.querySelector(".closesearch");
const mygifosSec= document.querySelector(".mygifossec");
const favBtnMobile=document.querySelector('favbtn');
const favBtnDesktop=document.querySelector('favbtn');
const trendingTags=document.querySelector(".tagspan");
const searchBar=document.querySelector(".searchinput");
const autocompleteUL= document.querySelector(".autocomplete");
const autocompletecontainer= document.querySelector(".autocompletecontainer");
const mainTrending= document.querySelector(".mainTrending");
const leftArrow= document.querySelector(".leftslider");
const rightArrow= document.querySelector(".rightslider");

    //SECCIONES
    const mainSec= document.querySelector(".main");
    const searchResults= document.querySelector(".searchresults");
    const maxSec= document.querySelector(".maxsec");
    const favSec= document.querySelector(".favsec");
    const trendingSec= document.querySelector(".trending");

    //LOGOS
    const fbLogo= document.querySelectorAll(".socialLogo")[0];
    const twLogo= document.querySelectorAll(".socialLogo")[1];
    const igLogo= document.querySelectorAll(".socialLogo")[2];


//VARIABLES

var menuOpen= false;
var darkStatus= false;
var favOpen= false;
var prevOffset= 0;
var iterations = 0;
var gifoResults= [];
var imgTrack= "burger";
var arrayTrendingGifos=[];
var trendingOffset=0;
