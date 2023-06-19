import {auth, firestore} from "../Config/FirebaseConfig";
import {useNavigation} from "@react-navigation/native";

const deleteNote = async (item) => {

    const sellItemsRef = firestore.collection('sellitems').doc(item.id);

    try {
        //if the user is not the owner of the note, do not allow to delete
        if (item.userId !== auth.currentUser.uid) {
            alert('You are not the highest bidder, so you cannot delete this price suggestion');
            return;
        }
        if (item.priceSuggestions === '') {
            alert('There is no price suggestion to delete');
            return;
        }

        await sellItemsRef.update({
            priceSuggestions: "",
            userId: ""
        });
        console.log('Suggestion price deleted!');
        alert('Suggestion price deleted successfully');


    } catch (error) {
        console.error('Error deleting suggestion price:', error);
    }
};
export default deleteNote;