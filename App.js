import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Configuracion from "./views/Configuracion";

export default function App() {
  const [screen, setScreen] = useState("Login"); // "Login" | "Registro" | "Configuracion"

  let contenido;
  if (screen === "Login") {
    contenido = (
      <Login
        onLogin={() => setScreen("Configuracion")}
        onIrARegistro={() => setScreen("Registro")}
      />
    );
  } else if (screen === "Registro") {
    contenido = (
      <Registro
        onRegistrado={() => setScreen("Configuracion")}
        onVolver={() => setScreen("Login")}
      />
    );
  } else {
    contenido = <Configuracion />;
  }

  return <View style={styles.container}>{contenido}</View>;
}

const styles = StyleSheet.create({ container: { flex: 1 } });
