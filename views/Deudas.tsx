import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function Deudas() {
  // lista local para probar (luego lo conectas a tu estado/BD)
  const [deudas, setDeudas] = useState([
    { id: 1, nombre: "Teléfono", monto: 50000, estaPaga: false },
    { id: 2, nombre: "Internet", monto: 60000, estaPaga: true },
  ]);
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");

  function agregar() {
    const montoNum = Number(monto);
    if (!nombre.trim() || !montoNum) return;
    setDeudas((prev) => [...prev, { id: Date.now(), nombre: nombre.trim(), monto: montoNum, estaPaga: false }]);
    setNombre("");
    setMonto("");
  }

  function togglePagar(id) {
    setDeudas((prev) => prev.map((d) => (d.id === id ? { ...d, estaPaga: !d.estaPaga } : d)));
  }

  function borrar(id) {
    setDeudas((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.tarjeta}>
        <Text style={estilos.titulo}>Deudas</Text>

        <View style={estilos.fila}>
          <TextInput
            style={[estilos.campo, { flex: 1 }]}
            placeholder="Nombre (ej: Teléfono)"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={[estilos.campo, { width: 120, marginLeft: 8 }]}
            placeholder="Monto"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
          />
          <TouchableOpacity style={[estilos.boton, estilos.primario, { marginLeft: 8 }]} onPress={agregar}>
            <Text style={estilos.textoBtn}>Agregar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={deudas}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <View style={[estilos.item, { flexDirection: "row", alignItems: "center" }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "600", color: "#111827" }}>{item.nombre}</Text>
                <Text style={{ color: "#374151" }}>${item.monto}</Text>
                <Text style={{ color: item.estaPaga ? "#059669" : "#b45309" }}>
                  {item.estaPaga ? "PAGADA" : "PENDIENTE"}
                </Text>
              </View>

              <TouchableOpacity
                style={[estilos.boton, estilos.secundario, { marginRight: 8 }]}
                onPress={() => togglePagar(item.id)}
              >
                <Text style={estilos.textoBtn}>
                  {item.estaPaga ? "Pendiente" : "Pagada"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[estilos.boton, { backgroundColor: "#ef4444" }]} onPress={() => borrar(item.id)}>
                <Text style={estilos.textoBtn}>Borrar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
  fila: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  campo: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  boton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  primario: { backgroundColor: "#2c7a7b" },
  secundario: { backgroundColor: "#6b7280" },
  textoBtn: { color: "#fff", fontWeight: "bold" },
  item: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
