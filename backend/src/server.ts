import express from "express";
import admin from "firebase-admin";
import {readFileSync} from "fs";


const app = express();
const PORT = 3000;

app.use (express.json());

// Carrega as credenciais do arquivos json de forma segura
 const serviceAccount = JSON.parse(
    readFileSync(new URL ("../firebase-key.json", import.meta.url), "utf-8")
 );

 //Inicializa o firebase admin json
 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
 });

 // Atalho para a instancia do banco de dados firebase
 const db = admin.firestore();

app.post("/lojas", async (request, response) => {
    try{
        const {nome, categoria, imagem, distancia, descricao} = request.body;
        if(!nome || !categoria || !imagem || !distancia){
                return response.status(400).json({error: "Campos obrigatorios ausentes"});
        }
        const novaLoja={
            nome,
            categoria,
            imagem: imagem || "https://marketing4ecommerce.cl/wp-content/uploads/2019/09/imagen-vectorial-compressor.jpg",
            distancia,
            descricao: descricao || "",
            
        };
        //Salva no firestore dentro da coleção "lojas"
        const docRef = await db.collection("lojas").add(novaLoja);
        //Retorna o objeto criado junto com o ID gerado
        return response.status(201).json({
            id: docRef.id,
            ...novaLoja,
        });
        }catch(error){
            return response.status(500).json({
                error:"Erro ao salvar a loja no banco."
            });
        }
});

app.get("/lojas", async (request, response) => {
    try{
        const snapshot = await db.collection("lojas").get();
        const lojas: any[] = [];
        snapshot.forEach(doc => {
            lojas.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return response.status(200).json(lojas);
    }catch(error){
        return response.status(500).json({
            error:"Erro ao buscar as lojas do banco."
        });
    }
});

app.put('/Lojas/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { nome, categoria, imagem, distancia, descricao } = request.body;

        const docRef = db.collection('lojas').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return response.status(404).json({ error: 'Loja não encontrada para atualização' });
        }

        const dadosAtualizados: any = {};
        if (nome) dadosAtualizados.nome = nome;
        if (categoria) dadosAtualizados.categoria = categoria;
        if (imagem) dadosAtualizados.imagem = imagem;
        if (distancia !== undefined) dadosAtualizados.distancia = distancia;
        if (descricao !== undefined) dadosAtualizados.descricao = descricao;

        await docRef.update(dadosAtualizados);

        return response.json({
            id,
            message: 'A loja "${nome || doc.data()?.nome}" foi atualizada com sucesso',
            ...dadosAtualizados
        });
    } catch (error) {
        return response.status(500).json({ error: 'Erro ao atualizar a loja' });
    }
});

app.delete('/lojas/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const docRef = db.collection('lojas').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return response.status(404).json({ error: 'Loja não encontrada para exclusão' });
        }

        await docRef.delete();
        return response.json({ message: 'A loja "${nomeDaLoja}" foi deletada com sucesso!' });
    }catch (error) {
        return response.status(500).json({ error: 'Erro ao deletar a loja' });
    }
});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})