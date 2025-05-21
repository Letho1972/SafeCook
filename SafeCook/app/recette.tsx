import { useLocalSearchParams } from 'expo-router';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';

// Define a type for your recipe for better type safety
interface Recipe {
  _id: { toString: () => string }; // Or simply string if _id is already a string
  title: string;
  prep_time: string;
  servings: string;
  photo: string;
  ingredients: string[];
  steps: string[];
  // Add other optional fields from your JSON if needed
  rating?: number;
  review_count?: number;
  difficulty?: string;
  cost?: string;
}

const Recette = () => {
  const { recette: recetteParam } = useLocalSearchParams();

  const [parsedRecettes, setParsedRecettes] = useState<Recipe[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [selectedInstruction, setSelectedInstruction] = useState<string>("");

  useEffect(() => {
    let recipesData: Recipe[] = [];
    if (typeof recetteParam === 'string') {
      try {
        const parsed = JSON.parse(recetteParam);
        // Ensure parsed data is treated as an array
        recipesData = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        console.error("Failed to parse recetteParam string:", e);
      }
    } else if (Array.isArray(recetteParam)) {
      recipesData = recetteParam.map(rString => {
        try {
          return JSON.parse(rString);
        } catch (e) {
          console.error("Failed to parse an item in recetteParam array:", e);
          return null; // Handle individual parsing errors
        }
      }).filter(Boolean) as Recipe[]; // Filter out nulls from failed parsing
    }
    setParsedRecettes(recipesData);

    if (recipesData.length > 0) {
      const firstRecipe = recipesData[0];
      if (firstRecipe.ingredients && firstRecipe.ingredients.length > 0) {
        setSelectedIngredient(firstRecipe.ingredients[0]);
      } else {
        setSelectedIngredient(""); // Fallback if no ingredients
      }
      if (firstRecipe.steps && firstRecipe.steps.length > 0) {
        setSelectedInstruction(firstRecipe.steps[0]);
      } else {
        setSelectedInstruction(""); // Fallback if no steps
      }
    } else {
      setSelectedIngredient("");
      setSelectedInstruction("");
    }
  }, [recetteParam]);

  if (parsedRecettes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Chargement des données de la recette ou recette non trouvée...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Détails de la Recette</Text>
      <FlatList
        data={parsedRecettes}
        keyExtractor={(recipe) => recipe._id.toString()}
        renderItem={({ item: recipeItem }) => (
          <View style={styles.card} key={recipeItem._id.toString()}>
            <Text style={styles.title}>{recipeItem.title}</Text>

            {/* <Text style={styles.text}>Note : {recipeItem.rating} ⭐</Text> */}
            {/* <Text style={styles.text}>
              Avis : {recipeItem.review_count !== undefined && recipeItem.review_count >= 0 ? recipeItem.review_count : 'Aucun avis'}
            </Text> */}
            <Text style={styles.text}>Temps de préparation : {recipeItem.prep_time}</Text>
            {/* <Text style={styles.text}>Difficulté : {recipeItem.difficulty}</Text> */}
            {/* <Text style={styles.text}>Coût : {recipeItem.cost}</Text> */}
            <Text style={styles.text}>Portions : {recipeItem.servings}</Text>

            <Image
              style={styles.photo}
              source={{ uri: recipeItem.photo }}
              resizeMode='cover'
              onError={(error) => console.log("Erreur lors du chargement de l'image", error)}
            />

            <Text style={styles.subtitle}>Ingrédients:</Text>
            <Picker
              selectedValue={selectedIngredient}
              onValueChange={(itemValue: string) => setSelectedIngredient(itemValue)}
              // style={styles.picker} // Optional: if you add picker styles
            >
              {recipeItem.ingredients.map((ingredient: string, index: number) => (
                <Picker.Item key={index} label={ingredient} value={ingredient} />
              ))}
            </Picker>

            <Text style={styles.subtitle}>Instructions:</Text>
            <Picker
              selectedValue={selectedInstruction}
              onValueChange={(itemValue: string) => setSelectedInstruction(itemValue)}
              // style={styles.picker} // Optional: if you add picker styles
            >
              {recipeItem.steps.map((step: string, index: number) => (
                <Picker.Item key={index} label={step} value={step} />
              ))}
            </Picker>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginTop: 4,
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 8, // Optional: if you want rounded corners for the image
    marginTop: 8,
    marginBottom: 16,
  },
  // Optional: Add styles for Picker if needed
  // picker: {
  //   height: 50,
  //   width: '100%',
  // },
});

export default Recette;
