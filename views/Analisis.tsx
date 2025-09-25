import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Analisis() {
  
  const movimientos = [
    { id: 1, nombre: "Mercado", monto: 120000, categoria: "Alimentación", fecha: new Date() },
    { id: 2, nombre: "Bus", monto: 10000, categoria: "Transporte", fecha: new Date() },
    { id: 3, nombre: "Almuerzo", monto: 30000, categoria: "Alimentación", fecha: new Date() },
  ];

  const hoy = new Date();
  const mes = hoy.getMonth();
  const anio = hoy.getFullYear();

  const delMes = movimientos.filter((m) => {
    const f = new Date(m.fecha);
    return f.getMonth() === mes && f.getFullYear() === anio;
  });

  const total = delMes.reduce((s, m) => s + m.monto, 0);

  
  const resumen = {};
  for (let i = 0; i < delMes.length; i++) {
    const mov = delMes[i];
    const clave = mov.categoria;
    resumen[clave] = (resumen[clave] || 0) + mov.monto;
  }

  const lineas = [];
  for (const cat in resumen) {
    lineas.push(
      <Text key={cat} style={estilos.resumenLinea}>
        • {cat}: ${resumen[cat]}
      </Text>
    );
  }

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.tarjeta}>
        <Text style={estilos.titulo}>Análisis mensual</Text>
        <Text style={{ color: "#374151", marginBottom: 10 }}>
          {hoy.toLocaleString(undefined, { month: "long" })} {anio}
        </Text>

        <View style={estilos.resumen}>
          <Text style={estilos.resumenTitulo}>Gasto total del mes: ${total}</Text>
          {lineas.length === 0 ? (
            <Text style={estilos.resumenLinea}>Sin datos este mes.</Text>
          ) : (
            lineas
          )}
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
    width: "100%",
    maxWidth: 920,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#2c7a7b",
  },
  resumen: {
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    borderRadius: 12,
  },
  resumenTitulo: { fontWeight: "bold", marginBottom: 6, color: "#111827" },
  resumenLinea: { color: "#374151", marginTop: 2 },
});
