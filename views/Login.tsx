import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Login({ onLogin, onIrARegistro }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  function iniciarSesion() {
    onLogin && onLogin(); // va a Configuración
  }

  function registrarse() {
    onIrARegistro && onIrARegistro(); // va a Registro
  }

  function cancelar() {
    setCorreo("");
    setContrasena("");
  }

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.tarjeta}>
        <View style={estilos.izquierda}>
          <Text style={estilos.marca}>Gestor de Gastos</Text>
          <Text style={estilos.titulo}>Iniciar sesión</Text>

          <View style={{ width: "100%", marginTop: 15 }}>
            <TextInput
              style={estilos.campo}
              placeholder="Correo electrónico"
              autoCapitalize="none"
              value={correo}
              onChangeText={setCorreo}
            />
            <TextInput
              style={[estilos.campo, { marginTop: 10 }]}
              placeholder="Contraseña"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />

            <View style={{ marginTop: 15, gap: 10 }}>
              <TouchableOpacity style={estilos.botonPrimario} onPress={iniciarSesion}>
                <Text style={[estilos.textoPrimario, estilos.texto]}>iniciar sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity style={estilos.botonSecundario} onPress={cancelar}>
                <Text style={[estilos.textoSecundario, estilos.texto]}>cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={estilos.derecha}>
          <Text style={estilos.tituloDerecha}>¡Hola!</Text>
          <Text style={estilos.textoDerecha}>
            Crea tu cuenta para empezar a organizar tus finanzas
          </Text>

          <TouchableOpacity style={estilos.botonContorno} onPress={registrarse}>
            <Text style={[estilos.textoContorno, estilos.texto]}>registrarse</Text>
          </TouchableOpacity>
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

  botonContorno: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 26,
  },
  textoContorno: { color: "#fff", fontWeight: "bold", letterSpacing: 0.5,},
  texto:{textTransform:"uppercase"},
});
