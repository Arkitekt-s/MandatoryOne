import { firebase } from "../Config/FirebaseConfig";

const UploadImageComponent = async (image) => {
    try {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const imageName = `Sell-Item-${Date.now()}`;
        const ref = firebase.storage().ref().child(`image/${imageName}`);

        const uploadTask = ref.put(blob);
        await uploadTask;

        return uploadTask;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default UploadImageComponent;
