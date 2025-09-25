import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Movimiento() {
  // lista local para ver algo funcionando
  const [movimientos, setMovimientos] = useState([
    { id: 1, nombre: "Mercado", monto: 120000, categoria: "Alimentación", fecha: new Date() },
    { id: 2, nombre: "Bus", monto: 10000, categoria: "Transporte", fecha: new Date() },
  ]);

  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");

  function guardar() {
    const montoNum = Number(monto);
    if (!nombre.trim() || !categoria.trim() || !montoNum) {
      window.alert("Campos incompletos. " + "Completa nombre, categoría y un monto válido.");
      return;
    }
    setMovimientos((prev) => [
      ...prev,
      { id: Date.now(), nombre: nombre.trim(), categoria: categoria.trim(), monto: montoNum, fecha: new Date() },
    ]);
    setNombre("");
    setMonto("");
    setCategoria("");
    window.alert("Listo. " + "Movimiento agregado.");
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <View style={estilos.pantalla}>
        <View style={estilos.tarjeta}>
          <Text style={estilos.titulo}>Añadir movimiento</Text>

          <TextInput
            style={estilos.campo}
            placeholder="Nombre (ej: Mercado)"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={estilos.campo}
            placeholder="Categoría (ej: Alimentación)"
            value={categoria}
            onChangeText={setCategoria}
          />
          <TextInput
            style={estilos.campo}
            placeholder="Monto (ej: 120.000)"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
          />

          <TouchableOpacity style={[estilos.boton, estilos.primario]} onPress={guardar}>
            <Text style={estilos.textoBtn}>Guardar</Text>
          </TouchableOpacity>

          <Text style={[estilos.label, { marginTop: 14 }]}>Últimos movimientos</Text>
          <FlatList
            data={[...movimientos].reverse().slice(0, 5)}
            keyExtractor={(item) => String(item.id)}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            renderItem={({ item }) => (
              <View style={estilos.item}>
                <Text style={{ fontWeight: "600", color: "#111827" }}>{item.nombre}</Text>
                <Text style={{ color: "#374151" }}>{item.categoria}</Text>
                <Text style={{ fontWeight: "700", color: "#2c7a7b" }}>${item.monto}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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
  campo: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  boton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  primario: { backgroundColor: "#2c7a7b" },
  textoBtn: { color: "#fff", fontWeight: "bold" },
  label: { fontSize: 14, color: "#374151", marginBottom: 6 },
  item: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
