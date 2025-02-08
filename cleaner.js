// MIT License
// Copyright (c) 2025 Kevin Secaida

let contadorEstados = 0;

function reflex_agent(location, state) {
    if (state == "SUCIO") return "LIMPIAR";
    else if (location == "A") return "MOVER A LA DERECHA";
    else if (location == "B") return "MOVER A LA IZQUIERDA";
}

function test(states) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    contadorEstados++;
    document.getElementById("log").innerHTML += "<br>Paso #".concat(contadorEstados).concat(" | POSICIÓN ACTUAL: ").concat(location).concat(" | ACCIÓN TOMADA: ").concat(action_result);

    if (action_result == "LIMPIAR") {
        if (location == "A") states[1] = "LIMPIO";
        else if (location == "B") states[2] = "LIMPIO";
    } else if (action_result == "MOVER A LA DERECHA") states[0] = "B";
    else if (action_result == "MOVER A LA IZQUIERDA") states[0] = "A";

    // Verificar si ambas áreas están limpias
    if (states[1] == "LIMPIO" && states[2] == "LIMPIO") {
        document.getElementById("log").innerHTML += "<br>Todas las zonas están limpias. Finalizando...";
        return;
    }

    // Ensuciar aleatoriamente una de las ubicaciones después de un tiempo
    setTimeout(function() {
        if (Math.random() < 0.5) {
            states[1] = "SUCIO";
            document.getElementById("log").innerHTML += "<br>La zona A se ha ensuciado.";
        } else {
            states[2] = "SUCIO";
            document.getElementById("log").innerHTML += "<br>La zona B se ha ensuciado.";
        }
        setTimeout(function() { test(states); }, 1000);
    }, 1000);
}

// Iniciar el agente con el estado inicial
window.onload = function() {
    var states = ["A", "SUCIO", "SUCIO"];
    test(states);
};
