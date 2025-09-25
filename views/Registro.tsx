import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Registro({ onRegistrado, onVolver }) {
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");

  function registrarse() {
    onRegistrado && onRegistrado(); // continúa a Configuración (o donde quieras)
  }

  function volver() {
    onVolver && onVolver(); // regresa al Login
  }

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.tarjeta}>
        <View style={estilos.derecha}>
          <Text style={estilos.tituloDerecha}>¡Bienvenido!</Text>
          <Text style={estilos.textoDerecha}>
            Crea tu cuenta para empezar a organizar tus finanzas en Gestor de Gastos.
          </Text>
        </View>

        <View style={estilos.izquierda}>
          <Text style={estilos.marca}>Gestor de Gastos</Text>
          <Text style={estilos.titulo}>Regístrate</Text>

          <View style={{ width: "100%", marginTop: 16 }}>
            <TextInput style={estilos.campo} placeholder="Primer nombre" value={primerNombre} onChangeText={setPrimerNombre} />
            <TextInput style={estilos.campo} placeholder="Segundo nombre" value={segundoNombre} onChangeText={setSegundoNombre} />
            <TextInput style={estilos.campo} placeholder="Primer Apellido" value={primerApellido} onChangeText={setPrimerApellido} />
            <TextInput style={estilos.campo} placeholder="Segundo Apellido" value={segundoApellido} onChangeText={setSegundoApellido} />
            <TextInput style={estilos.campo} placeholder="Correo electrónico" value={correo} onChangeText={setCorreo} />
            <TextInput style={estilos.campo} placeholder="Contraseña" secureTextEntry value={contrasena} onChangeText={setContrasena} />
            <TextInput style={estilos.campo} placeholder="Confirmar contraseña" secureTextEntry value={confirmar} onChangeText={setConfirmar} />

            <View style={{ marginTop: 18, gap: 12 }}>
              <TouchableOpacity style={estilos.botonPrimario} onPress={registrarse}>
                <Text style={[estilos.textoPrimario, estilos.texto]}>registrarse</Text>
              </TouchableOpacity>

              <TouchableOpacity style={estilos.botonSecundario} onPress={volver}>
                <Text style={[estilos.textoSecundario, estilos.texto]}>volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  tarjeta: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    overflow: "hidden",
    width: "100%",
    maxWidth: 920,
    minHeight: 460,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  izquierda: {
    flex: 3,
    padding: 28,
    justifyContent: "center",
  },
  marca: { fontSize: 14, color: "#6b7280", marginBottom: 4 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#2c7a7b" },

  campo: {
    width: "100%",
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 10,
  },

  botonPrimario: {
    backgroundColor: "#2c7a7b",
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: "center",
  },
  textoPrimario: { color: "#fff", fontWeight: "bold", letterSpacing: 0.5 },

  botonSecundario: {
    backgroundColor: "#6b7280",
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: "center",
  },
  textoSecundario: { color: "#fff", fontWeight: "bold", letterSpacing: 0.5 },

  derecha: {
    flex: 2,
    backgroundColor: "#2bb6a6",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  tituloDerecha: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  textoDerecha: { color: "rgba(255,255,255,0.92)", textAlign: "center", marginBottom: 18 },
  texto: { textTransform: "uppercase" },
});
