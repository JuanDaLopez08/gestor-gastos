import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Login from "./views/Login";
import Registro from "./views/Registro";
import Configuracion from "./views/Configuracion";
import Analisis from "./views/Analisis";
import Deudas from "./views/Deudas";
import Movimiento from "./views/Movimiento";

export default function App() {
  const [screen, setScreen] = useState("Login"); 
  const [activeTab, setActiveTab] = useState("Movimiento"); 

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
  } else if (screen === "Configuracion") {
    contenido = <Configuracion onGuardado={() => setScreen("Main")} />;
  } else if (screen === "Main") {
    // Renderizar la vista activa con navbar
    let vistaActiva;
    if (activeTab === "Movimiento") {
      vistaActiva = <Movimiento />;
    } else if (activeTab === "Analisis") {
      vistaActiva = <Analisis />;
    } else if (activeTab === "Deudas") {
      vistaActiva = <Deudas />;
    }

    contenido = (
      <View style={{ flex: 1 }}>
        {vistaActiva}
        {/* Navbar */}
        <View style={navStyles.navbar}>
          <TouchableOpacity 
            style={[navStyles.navButton, activeTab === "Movimiento" && navStyles.navButtonActive]}
            onPress={() => setActiveTab("Movimiento")}
          >
            <Text style={[navStyles.navText, activeTab === "Movimiento" && navStyles.navTextActive]}>
              Movimientos
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[navStyles.navButton, activeTab === "Analisis" && navStyles.navButtonActive]}
            onPress={() => setActiveTab("Analisis")}
          >
            <Text style={[navStyles.navText, activeTab === "Analisis" && navStyles.navTextActive]}>
              Análisis
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[navStyles.navButton, activeTab === "Deudas" && navStyles.navButtonActive]}
            onPress={() => setActiveTab("Deudas")}
          >
            <Text style={[navStyles.navText, activeTab === "Deudas" && navStyles.navTextActive]}>
              Deudas
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <View style={styles.container}>{contenido}</View>;
}

const styles = StyleSheet.create({ container: { flex: 1 } });

const navStyles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  navButtonActive: {
    backgroundColor: "#2c7a7b",
  },
  navText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  navTextActive: {
    color: "#fff",
  },
});
