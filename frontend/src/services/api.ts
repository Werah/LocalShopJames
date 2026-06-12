// import { LOJAS } from "../data/mockData";
// import { Loja } from "../@types/loja";

// export const LojaServices={
//     getLojas: async(): Promise<Loja[]> => {
//         return new Promise((resolve) => {
//             setTimeout(()=> resolve(LOJAS), 1000);
//         });
//     }
// };
import axios from "axios";

export const api=axios.create({
    baseURL:"http://192.168.102.31:3000",
    timeout:5000,
});