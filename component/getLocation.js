import { useNavigation } from "@react-navigation/native";

const getLocation = () => {
    const navigation = useNavigation();
    const handleGoogleMapPress = (address) => {
        navigation.navigate('Googlemap', { address });
    };

    return { handleGoogleMapPress };
};

export default getLocation;
