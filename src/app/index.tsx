import React, { useState } from 'react';
import { supabase } from '@/database/supabase';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function NuevoEstudiante() {
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [carrera, setCarrera] = useState('');

  const guardarEstudiante = async () => {
    if (!nombre.trim() || !carnet.trim() || !carrera.trim()) {
      Alert.alert(
        'Datos incompletos',
        'Por favor, completa todos los campos.'
      );
      return;
    }

    const { error } = await supabase
      .from('estudiantes')
      .insert({
        nombre: nombre.trim(),
        carnet: carnet.trim(),
        carrera: carrera.trim(),
      });

    if (error) {
      console.log(error);

      Alert.alert(
        'Error',
        'No se pudo guardar el estudiante.'
      );

      return;
    }

    Alert.alert(
      'Éxito',
      'El estudiante se guardó correctamente.'
    );

    setNombre('');
    setCarnet('');
    setCarrera('');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Nuevo estudiante</Text>

      <Text style={styles.descripcion}>
        Ingresa los datos del estudiante
      </Text>

      <View style={styles.formulario}>

        <Text style={styles.label}>Nombre completo</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej. Eleazar Ramos"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Carné</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej. 20250001"
          value={carnet}
          onChangeText={setCarnet}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Carrera</Text>

        <TextInput
          style={styles.input}
          placeholder="Ej. Ingeniería en Sistemas"
          value={carrera}
          onChangeText={setCarrera}
        />

        <Pressable
          style={styles.botonGuardar}
          onPress={guardarEstudiante}
        >
          <Text style={styles.textoBoton}>
            Guardar estudiante
          </Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 25,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },

  descripcion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },

  formulario: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },

  botonGuardar: {
    height: 50,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});