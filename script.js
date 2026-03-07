let animacion;

function iniciar() {

    clearInterval(animacion);

    let v0 = parseFloat(document.getElementById("v0").value);
    let vf = parseFloat(document.getElementById("vf").value);
    let a  = parseFloat(document.getElementById("a").value);
    let d  = parseFloat(document.getElementById("d").value);
    let t_total = parseFloat(document.getElementById("tiempo").value);

    for (let i = 0; i < 2; i++) {

        if (isNaN(v0)) {
            if (!isNaN(vf) && !isNaN(a) && !isNaN(t_total)) v0 = vf - a*t_total;
            else if (!isNaN(d) && !isNaN(a) && !isNaN(t_total)) v0 = (d - 0.5*a*t_total*t_total)/t_total;
            else if (!isNaN(vf) && !isNaN(d) && !isNaN(t_total)) v0 = (2*d/t_total) - vf;
        }

        if (isNaN(vf)) {
            if (!isNaN(v0) && !isNaN(a) && !isNaN(t_total)) vf = v0 + a*t_total;
            else if (!isNaN(v0) && !isNaN(a) && !isNaN(d)) vf = Math.sqrt(v0*v0 + 2*a*d);
            else if (!isNaN(d) && !isNaN(t_total) && !isNaN(v0)) vf = (2*d/t_total) - v0;
        }

        if (isNaN(a)) {
            if (!isNaN(v0) && !isNaN(vf) && !isNaN(t_total)) a = (vf - v0)/t_total;
            else if (!isNaN(d) && !isNaN(v0) && !isNaN(t_total)) a = (2*(d - v0*t_total))/(t_total*t_total);
            else if (!isNaN(vf) && !isNaN(v0) && !isNaN(d)) a = (vf*vf - v0*v0)/(2*d);
        }

        if (isNaN(t_total)) {
            if (!isNaN(vf) && !isNaN(v0) && !isNaN(a) && a !== 0)
                t_total = (vf - v0)/a;
            else if (!isNaN(d) && !isNaN(v0) && !isNaN(vf))
                t_total = (2*d)/(v0 + vf);
        }

        if (isNaN(d)) {
            if (!isNaN(v0) && !isNaN(t_total) && !isNaN(a))
                d = v0*t_total + 0.5*a*t_total*t_total;
            else if (!isNaN(v0) && !isNaN(vf) && !isNaN(t_total))
                d = ((v0 + vf)/2)*t_total;
        }
    }

    if (isNaN(v0) || isNaN(a) || isNaN(t_total)) {
        alert("Faltan datos para calcular. Ingresa al menos 3 variables.");
        return;
    }

    document.getElementById("v0").value = v0.toFixed(2);
    document.getElementById("vf").value = vf.toFixed(2);
    document.getElementById("a").value  = a.toFixed(2);
    document.getElementById("d").value  = d.toFixed(2);
    document.getElementById("tiempo").value = t_total.toFixed(2);

    let objeto = document.getElementById("objeto");
    let resultado = document.getElementById("resultado");

    let t_anim = 0;
    let paso = 0.02;

    objeto.style.left = "0px";

    animacion = setInterval(function() {

        t_anim += paso;

        let posicion = v0*t_anim + 0.5*a*t_anim*t_anim;

        objeto.style.left = (posicion * 20) + "px";

        if (t_anim >= t_total) {
            clearInterval(animacion);
            resultado.innerHTML = "<strong>¡Simulación terminada!</strong>";
        }

    }, 20);
}

function limpiar() {
    clearInterval(animacion);

    document.getElementById("v0").value = "";
    document.getElementById("vf").value = "";
    document.getElementById("a").value  = "";
    document.getElementById("d").value  = "";
    document.getElementById("tiempo").value = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("objeto").style.left = "0px";
}