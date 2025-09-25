import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const COLOR_PRIMARIO = "#2c7a7b";
const COLOR_SECUNDARIO = "#6b7280";
const BG = "#f2f4f7";
const BORDE = "#e5e7eb";

export default function Configuracion() {
  const [salario, setSalario] = useState("");
  const [topeGeneral, setTopeGeneral] = useState(""); // %
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [categorias, setCategorias] = useState([
    { nombre: "Alimentación", porcentaje: "" },
    { nombre: "Transporte", porcentaje: "" },
    { nombre: "Ahorro", porcentaje: "" },
  ]);

  // --- utilidades ---
  function agregarCategoria() {
    const nombre = nuevaCategoria.trim();
    if (!nombre) return;
    setCategorias((prev) => [...prev, { nombre, porcentaje: "" }]);
    setNuevaCategoria("");
  }

  function actualizarPorcentaje(indice, valor) {
    setCategorias((prev) => {
      const copia = [...prev];
      copia[indice] = { ...copia[indice], porcentaje: valor };
      return copia;
    });
  }

  function quitarCategoria(indice) {
    setCategorias((prev) => prev.filter((_, i) => i !== indice));
  }

  function cancelar() {
    setSalario("");
    setTopeGeneral("");
    setNuevaCategoria("");
    setCategorias([
      { nombre: "Alimentación", porcentaje: "" },
      { nombre: "Transporte", porcentaje: "" },
      { nombre: "Ahorro", porcentaje: "" },
    ]);
  }

  function guardar() {
    const datos = { salario, topeGeneral, categorias };
    console.log("CONFIG INICIAL →", datos);
  }

  const salarioNum = Number(salario) || 0;
  const topeGeneralNum = Number(topeGeneral) || 0;

  // --- construir UI con for (sin .map) ---
  const filasCategorias = [];
  for (let i = 0; i < categorias.length; i++) {
    const cat = categorias[i];
    filasCategorias.push(
      <View key={`cat-${i}`} style={estilos.fila}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.catNombre}>{cat.nombre}</Text>
        </View>

        <TextInput
          style={[estilos.campo, { width: 90 }]}
          value={cat.porcentaje}
          onChangeText={(v) => actualizarPorcentaje(i, v)}
          placeholder="%"
          keyboardType="numeric"
        />

        <TouchableOpacity
          onPress={() => quitarCategoria(i)}
          style={[estilos.boton, estilos.secundario, { marginLeft: 8 }]}
        >
          <Text style={estilos.textoBtn}>Quitar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const lineasResumen = [];
  for (let i = 0; i < categorias.length; i++) {
    const cat = categorias[i];
    const porcentaje = Number(cat.porcentaje) || 0;
    const monto = Math.round(((topeGeneralNum * salarioNum) /100) * porcentaje / 100 )|| 0;
    lineasResumen.push(
      <Text key={`resumen-${i}`} style={estilos.resumenLinea}>
        • {cat.nombre}: {porcentaje}% → ${monto}
      </Text>
    );
  }

  return (
    <View style={estilos.pantalla}>
      <View style={estilos.tarjeta}>
        <Text style={estilos.titulo}>Configuración inicial</Text>

        {/* Salario */}
        <Text style={estilos.label}>Ingrese su salario</Text>
        <TextInput
          style={estilos.campo}
          value={salario}
          onChangeText={setSalario}
          placeholder="Ej: 2500000"
          keyboardType="numeric"
        />

        {/* Categorías */}
        <Text style={[estilos.label, { marginTop: 12 }]}>Categorías</Text>
        <View style={estilos.fila}>
          <TextInput
            style={[estilos.campo, { flex: 1 }]}
            value={nuevaCategoria}
            onChangeText={setNuevaCategoria}
            placeholder="Nueva categoría (ej: Salud)"
          />
          <TouchableOpacity
            style={[estilos.boton, estilos.primario, { marginLeft: 8 }]}
            onPress={agregarCategoria}
          >
            <Text style={estilos.textoBtn}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {filasCategorias}

        {/* Tope general */}
        <Text style={[estilos.label, { marginTop: 12 }]}>Tope general (%)</Text>
        <TextInput
          style={estilos.campo}
          value={topeGeneral}
          onChangeText={setTopeGeneral}
          placeholder="Ej: 80"
          keyboardType="numeric"
        />

        {/* Resumen */}
        <View style={estilos.resumen}>
          <Text style={estilos.resumenTitulo}>
            Tope general en $: {Math.round((salarioNum * topeGeneralNum) / 100) || 0}
          </Text>
          {lineasResumen}
        </View>

        {/* Acciones */}
        <View style={estilos.fila}>
          <TouchableOpacity style={[estilos.boton, estilos.primario, { flex: 1 }]} onPress={guardar}>
            <Text style={estilos.textoBtn}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.boton, estilos.secundario, { flex: 1, marginLeft: 8 }]}
            onPress={cancelar}
          >
            <Text style={estilos.textoBtn}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: BG,
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
    color: COLOR_PRIMARIO,
  },
  label: { fontSize: 14, color: "#374151", marginBottom: 6 },
  campo: {
    borderWidth: 1,
    borderColor: BORDE,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  fila: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  catNombre: { fontSize: 15, fontWeight: "600", color: "#111827" },
  resumen: {
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: BORDE,
    padding: 12,
    borderRadius: 12,
  },
  resumenTitulo: { fontWeight: "bold", marginBottom: 6, color: "#111827" },
  resumenLinea: { color: "#374151", marginTop: 2 },
  boton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  primario: { backgroundColor: COLOR_PRIMARIO },
  secundario: { backgroundColor: COLOR_SECUNDARIO },
  textoBtn: { color: "#fff", fontWeight: "bold" },
});
