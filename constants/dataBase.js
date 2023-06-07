import assets from "./assets";

//export to firebase
// import {  firestore } from "../Config/FirebaseConfig";




const ItemData = [
  {
    id: "Item-01",
    brand: "ZARA",
    category: "JACKET",
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.",
    image: assets.nft01,
    price: "2500 ",
    dkk: require('../assets/icons/dkk.png'),
    address: ("standlodsvej25,Copenhagen,Denmark"),
  },
  {
    id: "Item-02",
    brand: "MM2",
    category: "BIKE",
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft02,
    price: "1500 ",
    dkk: require('../assets/icons/dkk.png'),
    address: "standlodsvej25,Copenhagen,Denmark",
  },
  {
    id: "Item-03",
    brand: "ROLEX",
    category: "WATCH",
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft03,
    price: "100000 ",
    dkk: require('../assets/icons/dkk.png'),
    address: "strøget,Copenhagen,Denmark",
  },
  {
    id: "Item-04",
    brand: "NIKE MZ3",
    category: "SHOES",
    price: "250 ",
    dkk: require('../assets/icons/dkk.png'),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur.",
    image: assets.nft04,
    address: "strøget,Copenhagen,Denmark",
  },
  {
    id: "Item-05",
    brand: "Colorful circles",
    category: "PAINTING",
    price: "2000 ",
    dkk: require('../assets/icons/dkk.png'),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural.",
    image: assets.nft05,
    address: "strøget,Copenhagen,Denmark",
  },
  {
    id: "Item-06",
    brand: "DA VINCI",
    category: "PAINTING",
    price: "3000 ",
    dkk: require('../assets/icons/dkk.png'),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis.",
    image: assets.nft06,
    address: "strøget,Copenhagen,Denmark",
  },
  {
    id: "Item-07",
    brand: "LG",
    category: "49 inch TV",
    price: "1000 ",
    dkk: require('../assets/icons/dkk.png'),
    description:
      "The action painter abstract expressionists were directly influenced by automatism. Pollock channelled this into producing gestural. Lorem ipsum dolor sit amet consectetur adipiscing elit consequat accumsan sapien, lectus convallis malesuada odio curae habitasse dignissim nascetur. Nulla sed velit erat vitae leo sem inceptos diam fames arcu hendrerit, quis ultrices in eleifend posuere ipsum conubia porttitor felis. Ullamcorper platea penatibus ornare egestas nulla ligula hendrerit nisl suscipit sociosqu maximus, tincidunt aptent habitant purus pharetra ultrices dapibus laoreet nisi lacinia. Porta malesuada netus vel sapien conubia porttitor aliquam ut pretium ante litora molestie senectus magna egestas sociosqu, eget aliquet fames pharetra felis posuere varius fringilla quisque in arcu montes eu ullamcorper.",
    image: assets.nft07,
    address: "strøget,Copenhagen,Denmark",
  },
];
// const exportItemsToFirestore = async () => {
//   try {
//     for (const item of ItemData) {
//       await firestore.collection('items').doc(item.id).set(item);
//       console.log(`Item with ID ${item.id} successfully exported to Firestore.`);
//     }
//   } catch (error) {
//     console.error("Error exporting item data to Firestore:", error);
//   }
// };
//
// exportItemsToFirestore();

export { ItemData };
