import React, { useState } from 'react';
import { Alert } from 'react-native';
import { firestore, auth, firebase } from '../Config/FirebaseConfig';

const addNote = async (selectedNote, originalPrice, priceSuggestions, setSelectedNote) => {
    if (!selectedNote) {
        Alert.alert('Please select a price suggestion to add your price.');
        console.error('selectedNote is null or undefined.');
        return;
    }
    const sellItemsRef = firestore.collection('sellitems').doc(selectedNote.id);

    if (priceSuggestions < originalPrice) {
        alert('Price suggestion cannot be less than the original price');
        return;
    }
    if (priceSuggestions < selectedNote.priceSuggestions) {
        alert('Price suggestion cannot be less than other price suggestions');
        return;
    }
    if (priceSuggestions === '') {
        alert('Please enter a price suggestion');
        return;
    }

    try {
        const updatedPriceSuggestion = {
            priceSuggestions: priceSuggestions,
            userId: auth.currentUser.uid,
            suggestedAt: firebase.firestore.FieldValue.serverTimestamp(),
            suggestedBy: auth.currentUser.uid.slice(0, 3),
        };

        await sellItemsRef.update(updatedPriceSuggestion);
        console.log('Price suggestion added successfully!');
        alert('Price suggestion added successfully to your shopping card!');

        // Set up a real-time listener to receive updates
        sellItemsRef.onSnapshot((snapshot) => {
            const updatedData = snapshot.data();

            // Update the selectedNote state with the updated data
            setSelectedNote({
                ...selectedNote,
                priceSuggestions: updatedData.priceSuggestions,
            });
        });
    } catch (error) {
        console.error('Error adding price suggestion:', error);
        alert('Error adding price suggestion. Please try again.');
    }
};

export default addNote;

