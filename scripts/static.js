function lmr1(){
    let m1r = "moc.isciem@ofni";
    let m1 = m1r.split("").reverse().join("");
    let m1E = document.getElementsByClassName("m1");
    for (let i = 0; i < m1E.length; i++) {
        m1E[i].innerHTML = m1;
        m1E[i].setAttribute("href", "mailto:" + m1);
    }
}
lmr1();