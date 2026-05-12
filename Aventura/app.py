from flask import Flask, render_template, request

app = Flask(__name__)

STAGES = {
    "reglas": {
        "titulo": "La Cámara de las Reglas",
        "tipo": "lista",
        "info": [
            "1. Respeto",
            "2. Importante participación activa en orden",
            "3. No entregar trabajos incompletos",
            "4. No se aplican exámenes fuera de tiempo",
            "5. Plagio de trabajos = 0 para todos",
            "6. 3 faltas = Final del parcial",
            "7. Calificación Máxima en final: 8"
        ],
        "preguntas": [
            {"q": "¿Qué valor se pide en clase?", "a": "Respeto"},
            {"q": "¿Es posible realizar exámenes después del tiempo establecido? (Si o No)", "a": "No"}
        ],
        "siguiente": "notas"
    },
    "notas": {
        "titulo": "El Oráculo de las Notas",
        "tipo": "tabla",
        "encabezados": ["Criterio", "1P/2P (%)", "3P (%)"],
        "filas": [
            ["EVIDENCIA DE CONOCIMIENTO", "40%", "10%"],
            ["EVIDENCIA DE DESEMPEÑO", "20%", "10%"],
            ["EVIDENCIA DE PRODUCTO", "30%", "30%"],
            ["PROYECTO INTEGRADOR", "10%", "50%"]
        ],
        "preguntas": [
            {"q": "¿En qué parcial es más importante el Proyecto Integrador?", "a": "3"},
            {"q": "¿Qué porcentaje vale el Proyecto Integrador en ese parcial?", "a": "50"}
        ],
        "siguiente": "skills"
    },
    "skills": {
        "titulo": "Skills a Desbloquear",
        "tipo": "lista",
        "info": [
            "Objetivo General: Desarrollar aplicaciones móviles integrando APIs y bases de datos.",
            "Objetivo Específico:",
            "1. JS (JavaScript)",
            "2. ReactNative:",
            "   a. Componentes",
            "   b. Screens",
            "   c. Navegations",
            "   d. Comunicación con API"
        ],
        "preguntas": [
            {"q": "¿Cuál es el lenguaje base?", "a": "JS"},
            {"q": "¿Qué tecnología se usa para Componentes y Screens?", "a": "ReactNative"}
        ],
        "siguiente": "timeline"
    },
    "timeline": {
        "titulo": "La Línea del Tiempo",
        "tipo": "lista",
        "info": [
            "Examen Parcial 1: 01-06-26",
            "Examen Parcial 2: 06-07-26",
            "Examen Parcial 3: 10-08-26",
            "Examen Final: 17-08-26"
        ],
        "preguntas": [
            {"q": "¿Día del examen final?", "a": "17"},
            {"q": "¿Día del examen 1?", "a": "01"}
        ],
        "siguiente": "fin"
    }
}

@app.route('/')
def aventura():
    paso = request.args.get('paso', 'reglas')
    
    if paso == "fin":
        return """
        <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 100px;">
            <h1>¡Misión Cumplida!</h1>
            <p>Has superado la inducción de Programación Móvil.</p>
            <a href='/?paso=reglas' style="color: #333; text-decoration: none; border: 1px solid #333; padding: 10px; border-radius: 4px;">Reiniciar Aventura</a>
        </div>
        """
    
    etapa = STAGES.get(paso, STAGES['reglas'])
    msg = ""
    
    r1 = request.args.get('r1')
    r2 = request.args.get('r2')
    check = request.args.get('check')

    if r1 and r2:
        correctas = etapa['preguntas']
        if r1.strip().lower() == correctas[0]['a'].lower() and \
           r2.strip().lower() == correctas[1]['a'].lower() and check:
            return f"<script>window.location.href='/?paso={etapa['siguiente']}';</script>"
        else:
            msg = "Respuestas incorrectas o falta marcar el compromiso."

    return render_template('index.html', etapa=etapa, error=msg, paso_actual=paso)

if __name__ == '__main__':
    app.run(debug=True)