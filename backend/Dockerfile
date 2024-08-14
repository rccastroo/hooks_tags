# Escolhe a imagem base do Node.js
FROM node:22

# Cria e define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instala as dependências usando Yarn
RUN yarn install

# Copia o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Expõe a porta que o aplicativo usará
EXPOSE 3001

# Comando para iniciar o aplicativo
CMD ["yarn", "start"]