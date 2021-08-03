import * as ele from './elements';
import {gsap} from 'gsap';

export const sortNavHeight = (function(){

    let scroll = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let newScroll = null;

    return function(scrollArg){
        if(innerWidth < 994) return;
        ele.nav.style.transition = '';
        ele.navLogo.style.transition = '';
        newScroll = scrollArg;
        if(newScroll !== scroll || newScroll === 0){
            ele.nav.style.transition = 'all 0.15s ease-in-out';
            ele.navLogo.style.transition = 'all 0.15s ease-in-out';
        }
        
        if(newScroll > 0){
            ele.nav.style.height = '90px';
            ele.navLogo.style.width = '80px';
            return;
        }
        ele.nav.style.height = '120px';
        ele.navLogo.style.width = '100px';
    }
})();
sortNavHeight();

ele.navLogo.onclick = () => {
    ele.openSection.scrollIntoView({behavior: 'smooth'});
    window.location.hash = '#Home';
};

let hamburgerOpen = false;

export function setHamburgerOpen(value){
    hamburgerOpen = value;
}

ele.hamburger.onclick = () => {
    hamburgerOpen = !hamburgerOpen;
    if(hamburgerOpen){
        gsap.to(ele.navItems, {duration: 0.5, height:'328px', ease: 'easeInOut'});
        gsap.to(ele.hl1, {duration: 0.5, ease: 'easeInOut', top: '25px', rotate: '45deg'});
        gsap.to(ele.hl2, {duration: 0.5, ease: 'easeInOut', opacity: '0'});
        gsap.to(ele.hl3, {duration: 0.5, ease: 'easeInOut', top: '-19px', rotate: '-45deg'});
        return;
    };
    gsap.to(ele.navItems, {duration: 0.5, height:'0', ease: 'easeInOut'});
    gsap.to(ele.hl1, {duration: 0.5, ease: 'easeInOut', top: '0', rotate: '0'});
    gsap.to(ele.hl2, {duration: 0.5, ease: 'easeInOut', opacity: '1'});
    gsap.to(ele.hl3, {duration: 0.5, ease: 'easeInOut', top: '0', rotate: '0'});
};

ele.openArrow.onclick = () => {
    ele.aboutSection.scrollIntoView({behavior: 'smooth'});
}
ele.navLinks[0].onclick = () => {
    ele.aboutSection.scrollIntoView({behavior: 'smooth'});
}
ele.navLinks[1].onclick = () => {
    ele.menuSection.scrollIntoView({behavior: 'smooth'});
}
ele.navLinks[2].onclick = () => {
    ele.locationSection.scrollIntoView({behavior: 'smooth'});
}
ele.navLinks[3].onclick = () => {
    ele.contactSection.scrollIntoView({behavior: 'smooth'});
}