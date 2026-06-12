import React from "react";

import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  Alert,
} from "react-native";

import { useCadastroLoja } from "../../hooks/useCadastroLoja";
import styles from "./CadastroLojaStyles";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";
import {Loja} from "../../@types/loja";

export default function CadastroLoja({ route }: any) {
  const lojaParaEditar = route?.params?.loja;
  const { formData, updateField} = useCadastroLoja(lojaParaEditar);
  const navigation = useNavigation();
  
  async function handleSalvar() {
    if(!formData.nome || !formData.categoria || !formData.distancia){
      Alert.alert("Aviso", "Preencha os campos obrigatorios");
      return;
    }
    try {
      if (lojaParaEditar) {
        // Editar loja existente (PUT)
        await api.put(`/lojas/${lojaParaEditar.id}`,{
          nome: formData.nome,
          categoria: formData.categoria,
          distancia: formData.distancia,
          imagem: formData.imagem,
          descricao: formData.descricao,
        });
        Alert.alert("Sucesso", "Loja atualizada com sucesso!");
      } else {
        // Criar nova loja (POST)
        await api.post("/lojas",{
          nome: formData.nome,
          categoria: formData.categoria,
          distancia: formData.distancia,
          imagem: formData.imagem,
          descricao: formData.descricao,
        });
        Alert.alert("Sucesso", "Loja cadastrada com sucesso!");
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar a loja");
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {lojaParaEditar ? "Editar Local" : "Cadastrar Local"}
        </Text>
        <Text style={styles.label}>
          Nome do local *
        </Text>
        <TextInput style={styles.input}
          placeholder="Ex: Café Central"
          value={formData.nome}
          onChangeText={(v) =>
            updateField("nome", v)
          }
          autoCapitalize="sentences"
        />
        <Text style={styles.label}>
          Categoria *
        </Text>
        <TextInput style={styles.input}
          placeholder="Ex: Restaurante"
          value={formData.categoria}
          onChangeText={(v) =>
            updateField("categoria", v)
          }
          autoCapitalize="sentences"
        />
        <Text style={styles.label}>
          Link da imagem *
        </Text>
        <TextInput style={styles.input}
          placeholder="https://..."
          keyboardType="url"
          autoCapitalize="none"
          value={formData.imagem}
          onChangeText={(v) =>
            updateField("imagem", v)
          }
        />
        <Text style={styles.label}>
          Distância *
        </Text>
        <TextInput style={styles.input}
          placeholder="200"
          keyboardType="numeric"
          value={formData.distancia}
          onChangeText={(v) =>
            updateField("distancia", v)
          }
        />
        <Text style={styles.label}>
          Descrição
        </Text>
        <TextInput style={[styles.input, {height: 100}]}
          placeholder="Descrição do local..."
          value={formData.descricao}
          onChangeText={(v) =>
            updateField("descricao", v)
          }
          multiline={true}
          autoCapitalize="sentences"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSalvar}
        >
          <Text style={styles.buttonText}>
            {lojaParaEditar ? "Atualizar Local" : "Salvar Local"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}